import { METADATA_TABLE, SYNC_ID_COLUMN, GUID_COLUMN, getSession, createUpdateCounterValue, createGetDbMetaValue, DB_COUNTER_KEY, ensure, DB_VALUE_COLUMN, DB_META_TABLE, getUserScopedNamePrefix, toUserScopedName, createCheckTableExistSqlQuery, createMemoizedCache, isFileDocument, indexByKey, partition, isDirtyGuid, isImage, getRemoteDynamicResourceUrl, Stopwatch, upload, wait, AssertionError, ConnectionError, isRuntimeGuid, OfflineToRuntimeGuidMapping, createGuids, indexMxObjectsByGuid, isFileDocumentWithContents, syncedObjsRuntimeToOfflineMap, isFileDocumentWithContentNonMetaCheck, createChange, createChangeFromIncompatibleObjectsJson, synchronizeObjects as synchronizeObjects$1, uniqueBy, offlineData, DescribedError, getEntityAssociationsPairs, handleError, unique, clone, unmarkAsDirty, publish, LogManager, LogNode, indexMxObjectJsonsByGuid, RuntimeToOfflineGuidMapping, gatherUpdates, deriveEntity, getRequestDataForMicroflow, getGuidsFromRuntimeArguments, getImplicitMicroflowParameters, executeAsync, runtimeOperation, ValidationError, executeNoImpactInstructions, handleValidations, handleRuntimeSuccessResponse, runtimeValueToExpressionVariable, getEntityMeta, retrieveByXPath, retrieveByIds, SystemAttribute, SynchronizationError, runInSynchronizationLock, actionMatcher, registerMiddleware, createRetryMiddlewarePredicate, markAsDirty, createOfflineGuid, createMendixGuid, createMxObjectJSON, MxObject, clearDirtyGuids, _DataBackend, getAssociationStep, getCachedObjectsByPath, getRuntimeGuid, getRefsObjects, objectFromArray, mapObject, memoizeConcurrent, isReferenceType } from './index-C0bqjiJG.js';

const Migrations = [(lowLevelDatabaseAPI) => {
  const [addColumnQuery, addColumnParams] = [`ALTER TABLE "${METADATA_TABLE}" ADD ${(columnDescription = { name: SYNC_ID_COLUMN, type: "text" }).name} ${columnDescription.type} ${"text" === columnDescription.type ? "COLLATE NOCASE" : ""}`, []];
  var columnDescription;
  return lowLevelDatabaseAPI.inTransaction(async (tx) => {
    await tx.exec(addColumnQuery, addColumnParams);
    const dirtyGuids = (await tx.selectObjects(`SELECT "${GUID_COLUMN}" FROM "${METADATA_TABLE}" WHERE "dirty" = ?`, [1])).map((row) => row[GUID_COLUMN]), session = getSession(), syncIds = await async function(tx2, sessionId, count) {
      const [updateCounterQuery, updateCounterParams] = createUpdateCounterValue(count), [readCounterQuery, readCounterParams] = createGetDbMetaValue(DB_COUNTER_KEY);
      await tx2.exec(updateCounterQuery, updateCounterParams);
      const results = await tx2.selectObjects(readCounterQuery, readCounterParams), lastCounter = parseInt(ensure(results[0])[DB_VALUE_COLUMN], 10);
      return Array.from({ length: count }, (_item, idx) => {
        const rnd = Math.round(1e4 * Math.random());
        return `${sessionId}:${lastCounter - idx}:${rnd}`;
      });
    }(tx, session.getSessionObjectId(), dirtyGuids.length);
    await Promise.all(dirtyGuids.map(async (guid, idx) => tx.exec(`UPDATE ${METADATA_TABLE} SET ${SYNC_ID_COLUMN} = ? WHERE ${GUID_COLUMN} = ?`, [ensure(syncIds[idx]), guid])));
  });
}, (lowLevelDatabaseAPI) => lowLevelDatabaseAPI.inTransaction(async (tx) => {
  const tablesToMigrate = (await lowLevelDatabaseAPI.selectObjects("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name != 'android_metadata' AND name != ?", [DB_META_TABLE])).map((r) => r.name.toString()).filter((n) => !n.startsWith(getUserScopedNamePrefix()));
  await Promise.all(tablesToMigrate.map((table) => [tx.exec(`DROP TABLE IF EXISTS ${toUserScopedName(table)}`, []).then(() => tx.exec(`ALTER TABLE ${table} RENAME TO ${toUserScopedName(table)}`, []))]));
})].map((m, index) => ({ version: index + 1, apply: m }));
function executeSql([sql, parameters]) {
  return Transaction.inside((tx, resolve, reject) => {
    tx.executeSql(sql, parameters, (_, r) => {
      const rows = [];
      for (let i = 0; i < r.rows.length; i++)
        rows.push(r.rows.item(i));
      resolve(rows);
    }, (_, e) => (reject(e), true));
  });
}
class Transaction {
  constructor() {
    this.work = [];
  }
  chain(onFulfilled) {
    const result = new Transaction();
    return result.work.push(...this.work, { action: false, item: onFulfilled }), result;
  }
  async read(database) {
    return this.execute((resolve, reject) => database.readTransaction(resolve, reject));
  }
  async write(database) {
    return this.execute((resolve, reject) => database.transaction(resolve, reject));
  }
  async execute(executeInTx) {
    return new Promise((resolve, reject) => executeInTx((tx) => {
      const works = Array.from(this.work);
      !function process(previousResult) {
        previousResult instanceof Transaction && (works.unshift(...previousResult.work), previousResult = void 0);
        const work = works.shift();
        if (!work)
          return void resolve(previousResult);
        try {
          if (work.action)
            work.item(tx, process, reject);
          else {
            const newResult = work.item(previousResult);
            process(newResult);
          }
        } catch (e) {
          reject(e);
        }
      }(tx);
    }, reject));
  }
  static inside(action) {
    const result = new Transaction();
    return result.work.push({ action: true, item: action }), result;
  }
}
class ImportDataFromWebSqlMigration {
  constructor(database, webSqlDatabase) {
    this.database = database, this.webSqlDatabase = webSqlDatabase;
  }
  async apply() {
    0 !== (await executeSql(createCheckTableExistSqlQuery(METADATA_TABLE)).chain((rows) => executeSql(createCheckTableExistSqlQuery(toUserScopedName(METADATA_TABLE))).chain((moreRows) => [...rows, ...moreRows])).read(this.webSqlDatabase)).reduce((sum, row) => sum + Object.values(row)[0], 0) && await this.migrateSchemaAndDataFromWebSql();
  }
  async migrateSchemaAndDataFromWebSql() {
    const lowLevelWaSQLite = this.database.getLowLevelAPI(), rows = await executeSql(["SELECT tbl_name, sql FROM sqlite_master WHERE type='table' AND tbl_name NOT LIKE '__WebKit%'", []]).read(this.webSqlDatabase);
    await Promise.all(rows.map(async (row) => async function(wasqlite, webSqlDatabase, table, createTableStmt) {
      await wasqlite.inTransaction(async (tx) => {
        await tx.exec(createTableStmt, []);
        const dataRows = await executeSql([`SELECT * FROM "${table}"`, []]).read(webSqlDatabase);
        await Promise.all(dataRows.map((dataRow) => tx.exec(`INSERT OR IGNORE INTO "${table}" VALUES(${Object.keys(dataRow).map(() => "?").join(", ")})`, Object.values(dataRow)))), await executeSql([`DROP TABLE "${table}"`, []]).write(webSqlDatabase);
      });
    }(lowLevelWaSQLite, this.webSqlDatabase, row.tbl_name, row.sql)));
  }
}
const DOCUMENT_DIR = "documents", THUMBNAIL_DIR = "thumbnails";
function getChangedDate(obj) {
  return ensure(obj?.attributes.changedDate).value ?? null;
}
function getFsFileName(guid, changeDate) {
  return guid.replace(/:/g, "_") + "@" + (null != changeDate && "" !== changeDate ? changeDate.toString() : "local");
}
function createFilePath(obj, offlineToRuntimeMap, rootDir) {
  return rootDir + getFsFileName(offlineToRuntimeMap.map(obj.guid), (getChangedDate(obj) ?? "").toString());
}
function toAbsolutePath(rootDirectory, path) {
  return rootDirectory + "/" + path;
}
async function gatherFileInstructions(requestFileObjectsJSON, responseObjects, areRequestObjectsUploaded, allRuntimeToOfflineMap, fileBackend) {
  const allOfflineToRuntimeMap = allRuntimeToOfflineMap.reverse(), fileDocumentCache = createMemoizedCache((entity) => isFileDocument(entity)), responseFileObjs = responseObjects.filter((obj) => fileDocumentCache(obj.objectType)), responseFileObjsMap = indexByKey((obj) => allRuntimeToOfflineMap.map(obj.guid))(responseFileObjs), instructions = { downloads: [], moves: [], deletes: [] }, [availableFileObjs, unavailableFileObjs] = partition((obj) => obj.guid in responseFileObjsMap, requestFileObjectsJSON);
  if (unavailableFileObjs.filter((obj) => hasContents(obj)).forEach((obj) => deleteFile(obj)), !areRequestObjectsUploaded) {
    const fileObjMap = indexByKey((obj) => allOfflineToRuntimeMap.map(obj.guid))(requestFileObjectsJSON);
    responseFileObjs.filter((obj) => !(obj.guid in fileObjMap)).filter(hasContents).forEach(downloadFile);
  }
  const [dirtyFileObjects, nonDirtyFileObjects] = partition((obj) => isDirtyGuid(obj.guid), availableFileObjs);
  return nonDirtyFileObjects.filter((obj) => getChangedDate(obj) !== getChangedDate(responseFileObjsMap[obj.guid])).forEach((obj) => {
    hasContents(obj) && deleteFile(obj), downloadFile(responseFileObjsMap[obj.guid]);
  }), dirtyFileObjects.filter((obj) => {
    const runtimeObj = responseFileObjsMap[obj.guid];
    return hasContents(obj) && hasContents(runtimeObj) && getChangedDate(obj) !== getChangedDate(runtimeObj);
  }).forEach((obj) => {
    if (areRequestObjectsUploaded) {
      const runtimeObj = responseFileObjsMap[obj.guid];
      !function(objBefore, objAfter, moveThumbnail = true) {
        const oldFilePath = getFilePath(objBefore, false), newFilePath = getFilePath(objAfter, false);
        if (instructions.moves.push([oldFilePath, newFilePath, objBefore.guid]), moveThumbnail && isImage(objBefore.objectType)) {
          const oldThumbPath = getFilePath(objBefore, true), newThumbPath = getFilePath(objAfter, true);
          instructions.moves.push([oldThumbPath, newThumbPath, objBefore.guid]);
        }
      }(obj, runtimeObj, false), isImage(obj.objectType) && downloadThumbnail(runtimeObj);
    } else
      deleteFile(obj), downloadFile(responseFileObjsMap[obj.guid]);
  }), dirtyFileObjects.filter((o) => hasContents(o) && !hasContents(responseFileObjsMap[o.guid])).forEach((o) => deleteFile(o)), dirtyFileObjects.filter((o) => !hasContents(o) && hasContents(responseFileObjsMap[o.guid])).forEach((o) => downloadFile(responseFileObjsMap[o.guid])), instructions;
  function downloadFile(obj) {
    const tempFilePath = getTemporaryDownloadPath(obj, false);
    instructions.downloads.push([getDownloadURL(obj, false), tempFilePath, obj.guid]), instructions.moves.push([tempFilePath, getFilePath(obj, false), obj.guid]), isImage(obj.objectType) && downloadThumbnail(obj);
  }
  function downloadThumbnail(imageObj) {
    const tempThumbPath = getTemporaryDownloadPath(imageObj, true);
    instructions.downloads.push([getDownloadURL(imageObj, true), tempThumbPath, imageObj.guid]), instructions.moves.push([tempThumbPath, getFilePath(imageObj, true), imageObj.guid]);
  }
  function deleteFile(obj) {
    const filePath = getFilePath(obj, false);
    instructions.deletes.push(filePath), isImage(obj.objectType) && instructions.deletes.push(getFilePath(obj, true));
  }
  function getDownloadURL(obj, isThumb) {
    return getRemoteDynamicResourceUrl(obj.guid, getChangedDate(obj), isThumb);
  }
  function getFilePath(objJson, isThumb) {
    return createFilePath(objJson, allOfflineToRuntimeMap, fileBackend.toAbsolutePath((isThumb ? "thumbnails" : "documents") + "/"));
  }
  function getTemporaryDownloadPath(obj, isThumb) {
    return getFilePath(obj, isThumb) + "_tmp";
  }
  function hasContents(obj) {
    return true === ensure(obj.attributes.HasContents).value;
  }
}
async function executeFileInstructions({ downloads, moves, deletes }, fileBackend, logger) {
  const stopwatch = new Stopwatch();
  if (void 0 !== downloads && (logger?.trace(`Downloading ${downloads.length} file documents.`), stopwatch.reset(), await Promise.all(downloads.map(([source, destination]) => fileBackend.downloadFile(source, destination))), logger?.trace(`Downloaded ${downloads.length} file documents in ${stopwatch.measure()} milliseconds.`)), void 0 !== moves && (logger?.trace(`Moving ${moves.length} file objects.`), stopwatch.reset(), await Promise.all(moves.map(([source, destination]) => fileBackend.moveFile(source, destination))), logger?.trace(`Moved ${moves.length} file objects in ${stopwatch.measure()} milliseconds.`)), void 0 !== deletes) {
    let fileCountUnableToDelete = 0;
    logger?.trace(`Attempting to delete ${deletes.length} file objects.`), stopwatch.reset(), await Promise.all(deletes.map(async (path) => {
      try {
        await fileBackend.removeFile(path);
      } catch (e) {
        if (e instanceof DOMException && "NotFoundError" === e.name)
          return ++fileCountUnableToDelete, void logger?.trace(e.message);
        throw e;
      }
    })), logger?.trace(`Deleted ${deletes.length - fileCountUnableToDelete} file objects in ${stopwatch.measure()} milliseconds.`);
  }
}
async function tempUploadFile(fileBackend, fileObjJson) {
  const filePath = "documents/" + getFsFileName(fileObjJson.guid, ensure(fileObjJson.attributes.changedDate).value), blob = await fileBackend.readFile(fileBackend.toAbsolutePath(filePath)), result = await async function(fileObjGuid, fileName, blob2, numberOfRetries) {
    for (let i = 0; i <= numberOfRetries; i++)
      try {
        return await upload(fileObjGuid, fileName, {}, blob2, {}, []);
      } catch (e) {
        if (!(i < numberOfRetries))
          throw e;
        {
          const timeout = Math.pow(2, i);
          await wait(timeout);
        }
      }
    throw new AssertionError();
  }("__sync__", "", blob, 2);
  return { tempGuid: result.commits[0], fileObjGuid: fileObjJson.guid };
}
async function downloadFiles(downloadFileInstructions, fileBackend, logger) {
  const rejectedGUIDs = [];
  for (let i = 0; i < downloadFileInstructions.length; i += 4) {
    const fileInstructions = downloadFileInstructions.slice(i, i + 4);
    await Promise.all(fileInstructions.map(async ([sourceUrl, downloadPath, guid]) => {
      try {
        await fileBackend.downloadFile(sourceUrl, downloadPath);
      } catch (e) {
        if (e instanceof ConnectionError)
          throw logger.trace(`Could not download file content for object ${guid} due to a connection errorSynchronization will be aborted`), e;
        logger.trace(`Could not download the file content for the object with guid ${guid} due to an error.This may be due to broken file content on the server. Synchronization will continue and ignore this object`, e), rejectedGUIDs.push(guid);
      }
    }));
  }
  return new Set(rejectedGUIDs);
}
class GuidMappingWithEntity {
  constructor(mapping, getEntityFun) {
    this.map = {}, mapping.forEach(([from, to]) => {
      const entity = getEntityFun(from) ?? getEntityFun(to);
      void 0 !== entity && (this.map[from] = [to, entity]);
    });
  }
  has(guid) {
    return void 0 !== this.map[guid];
  }
  get(guid) {
    return this.map[guid];
  }
  getGuid(guid) {
    const result = this.get(guid);
    if (void 0 === result)
      return;
    const [to] = result;
    return to;
  }
  getEntity(guid) {
    const result = this.get(guid);
    if (void 0 === result)
      return;
    const [, entity] = result;
    return entity;
  }
  entries() {
    return Object.entries(this.map).map(([from, [to, entity]]) => [from, to, entity]);
  }
}
async function synchronizeObjects({ dirtyMxObjects, syncedObjsOfflineToRuntimeMap, returnObjects, deletes = {}, extraGuidsToRetrieve = [], incompatibleObjectsJson = [], logger, database, fileBackend, offlineEntities }) {
  logger.trace(`Syncing of ${dirtyMxObjects.length} objects.`);
  const objectsJsons = dirtyMxObjects.map((object) => syncedObjsOfflineToRuntimeMap.mapMxObjectJSON(object.jsonData)), offlineObjects = dirtyMxObjects.filter((obj) => !isRuntimeGuid(syncedObjsOfflineToRuntimeMap.map(obj.getGuid())));
  logger.trace(`Creating guids for ${offlineObjects.length} offline objects.`);
  const stopwatch = new Stopwatch(), createdGuidsMapping = await async function(offlineMxObjects, requestGuids) {
    const numberOfGuidsPerEntity = offlineMxObjects.reduce((guidsPerEntity, o) => {
      const entity = o.getEntity();
      return guidsPerEntity[entity] = (guidsPerEntity[entity] ?? 0) + 1, guidsPerEntity;
    }, {}), createdGuids = {}, unavailableEntities = [];
    let requestData = buildCreateGuidsRequest();
    for (; Object.entries(requestData).length > 0; ) {
      const response2 = await requestGuids(requestData);
      if (0 === Object.keys(response2.success).length && 0 === response2.failure.length)
        throw new AssertionError("create_guids API did not return a valid response");
      Object.entries(response2.success).forEach(([entity, guids]) => {
        createdGuids[entity] = (createdGuids[entity] ?? []).concat(guids);
      }), unavailableEntities.push(...response2.failure), requestData = buildCreateGuidsRequest();
    }
    const offlineToRuntimeGuids = new OfflineToRuntimeGuidMapping();
    return offlineMxObjects.filter((o) => !unavailableEntities.includes(o.getEntity())).forEach((o) => {
      const runtimeGuid = createdGuids[o.getEntity()].shift();
      offlineToRuntimeGuids.add(o.getGuid(), runtimeGuid);
    }), offlineToRuntimeGuids;
    function buildCreateGuidsRequest() {
      return Object.entries(numberOfGuidsPerEntity).reduce((requestObj, [entity, totalNumberOfGuidsToCreate]) => {
        const numberOfGuidsCreated = createdGuids[entity]?.length ?? 0;
        return !unavailableEntities.includes(entity) && totalNumberOfGuidsToCreate > numberOfGuidsCreated && (requestObj[entity] = totalNumberOfGuidsToCreate - (createdGuids[entity]?.length ?? 0)), requestObj;
      }, {});
    }
  }(offlineObjects, createGuids);
  logger.trace(`Created guids for ${offlineObjects.length} offline objects in ${stopwatch.measure()} milliseconds.`), stopwatch.reset(), await async function(schema, offlineMxobjs, offlineToRuntimeGuids, fileBackend2, database2) {
    if (offlineMxobjs.some((obj) => isRuntimeGuid(obj.getGuid())))
      throw new AssertionError("Runtime objects are not expected here");
    const objsMap = indexMxObjectsByGuid(offlineMxobjs);
    await database2.usingWriteTransaction(async (tx) => {
      await tx.updateEntityGuids(offlineMxobjs.map((obj) => obj.getGuid()), new GuidMappingWithEntity(offlineToRuntimeGuids.entries(), (guid) => objsMap[guid]?.getEntity()), schema);
    });
    const documentsDir = fileBackend2.toAbsolutePath("documents"), moves = offlineMxobjs.filter((obj) => isFileDocumentWithContents(obj.jsonData)).map((obj) => {
      const newGuid = offlineToRuntimeGuids.map(obj.getGuid());
      return [documentsDir + "/" + getFsFileName(obj.getGuid(), ""), documentsDir + "/" + getFsFileName(newGuid, ""), newGuid];
    });
    await executeFileInstructions({ moves }, fileBackend2), syncedObjsRuntimeToOfflineMap.import(offlineToRuntimeGuids.reverse());
  }(offlineEntities, offlineObjects, createdGuidsMapping, fileBackend, database), logger.trace(`Updated offline guids with runtime guids in ${stopwatch.measure()} milliseconds.`);
  const objectJsonsWithRuntimeGuids = objectsJsons.map((objJson) => createdGuidsMapping.mapMxObjectJSON(objJson)), guidToSyncIdRecord = await retrieveSyncIds(objectJsonsWithRuntimeGuids.map((obj) => obj.guid), database);
  logger.trace("Uploading file documents."), stopwatch.reset();
  const tempUploadPairs = await Promise.all(objectJsonsWithRuntimeGuids.filter((obj) => isFileDocumentWithContents(obj)).concat(incompatibleObjectsJson.filter((objectJson) => isFileDocumentWithContentNonMetaCheck(objectJson))).map(async (fileObj) => {
    logger.trace(`Uploading file content of ${fileObj.objectType} with guid ${fileObj.guid}.`);
    const uploadStopwatch = new Stopwatch(), file = await tempUploadFile(fileBackend, fileObj);
    return logger.trace(`Uploaded file content of ${fileObj.objectType} with guid ${fileObj.guid} in ${uploadStopwatch.measure()} milliseconds.`), file;
  }));
  logger.trace(`Uploaded file documents in ${stopwatch.measure()} milliseconds.`);
  const changes = objectJsonsWithRuntimeGuids.map((objJson) => ({ guid: objJson.guid, syncId: guidToSyncIdRecord[objJson.guid], changes: createChange(objJson), ...isRuntimeGuid(objJson.guid) ? {} : { objectType: objJson.objectType } })), guidToSyncIdRecordObjectsWithUnknownSchema = await retrieveSyncIds(incompatibleObjectsJson.map((obj) => obj.guid), database), incompatibleChanges = incompatibleObjectsJson.map((objJson) => ({ guid: objJson.guid, objectType: objJson.objectType, syncId: guidToSyncIdRecordObjectsWithUnknownSchema[objJson.guid], changes: createChangeFromIncompatibleObjectsJson(objJson) })), fileGuidMapping = tempUploadPairs.reduce((tempUploadPairsAcc, pair) => pair.tempGuid ? { ...tempUploadPairsAcc, [pair.tempGuid]: pair.fileObjGuid } : tempUploadPairsAcc, {});
  logger.trace("Syncing objects with runtime."), stopwatch.reset();
  const response = returnObjects ? await synchronizeObjects$1(changes, fileGuidMapping, true, deletes, syncedObjsOfflineToRuntimeMap.map(extraGuidsToRetrieve)) : await synchronizeObjects$1(changes, fileGuidMapping, false, deletes, [], incompatibleChanges);
  return logger.trace(`Synced objects with runtime in ${stopwatch.measure()} milliseconds.`), { response, createdGuidsMapping };
}
async function retrieveSyncIds(guids, database) {
  const guidWithSyncIds = await database.usingReadTransaction((tx) => tx.retrieveSyncIds(guids));
  return Object.assign({}, ...guidWithSyncIds.map(([guid, syncId]) => ({ [guid]: syncId })));
}
async function generateSyncIds(transaction, sessionId, amount) {
  const lastNumber = await transaction.increaseAndGetUniqueId(amount);
  return Array.from({ length: amount }, (_item, idx) => {
    const rnd = Math.round(1e4 * Math.random());
    return `${sessionId}:${lastNumber - idx}:${rnd}`;
  });
}
async function deleteObjects(objectsToDelete, objectCache, fileBackend, schema, excludeEntitiesFromSync, database) {
  if (0 === objectsToDelete.length)
    return;
  const objects = uniqueBy(objectsToDelete, (obj) => obj.getGuid()), allOfflineToRuntimeGuidsMap = syncedObjsRuntimeToOfflineMap.reverse(), [runtimeObjects, peObjectsToDelete, committedPEObjects, onlineObjectsMap] = objects.reduce(([runtimeObjectsArr, peObjectsToDeleteArr, committedPEObjectsArr, onlineObjMap], obj) => {
    const isCommitted = !objectCache.isNew(obj.getGuid());
    isCommitted && isRuntimeGuid(allOfflineToRuntimeGuidsMap.map(obj.getGuid())) && runtimeObjectsArr.push(obj), obj.isPersistable() && (peObjectsToDeleteArr.push(obj), isCommitted && committedPEObjectsArr.push(obj));
    const entity = obj.getEntity();
    return offlineData().hasOnlineSyncMode(obj.getEntity()) && (onlineObjMap.has(entity) ? onlineObjMap.get(entity).push(obj.getGuid()) : onlineObjMap.set(entity, [obj.getGuid()])), [runtimeObjectsArr, peObjectsToDeleteArr, committedPEObjectsArr, onlineObjMap];
  }, [[], [], [], /* @__PURE__ */ new Map()]);
  if (onlineObjectsMap.size > 0) {
    const msg = ["An attempt to delete object(s) configured with 'online' synchronization mode in an offline context.", "Objects list:"];
    for (const [onlineEntity, guidsArray] of onlineObjectsMap)
      msg.push(`'${onlineEntity}': ${guidsArray.join(", ")}`);
    throw new DescribedError(msg.join("\n"));
  }
  const runtimePESyncableGuids = allOfflineToRuntimeGuidsMap.map(runtimeObjects.flatMap((obj) => obj.isPersistable() && !excludeEntitiesFromSync.has(obj.getEntity()) ? obj.getGuid() : [])), session = getSession();
  await database.usingWriteTransaction(async (tx) => {
    await tx.deleteEntitiesByGuid(committedPEObjects.map((obj) => allOfflineToRuntimeGuidsMap.map(obj.getGuid())));
    const syncIds = await generateSyncIds(tx, session.getSessionObjectId(), runtimePESyncableGuids.length);
    await tx.insertTombstones(runtimePESyncableGuids.map((guid, idx) => ({ guid, syncId: syncIds[idx] })));
    const deletedEntitiesObjectReferenceAssociationsPairsCache = createMemoizedCache((entity) => getEntityAssociationsPairs(entity, schema, false));
    return Promise.all(peObjectsToDelete.flatMap((obj) => Object.entries(deletedEntitiesObjectReferenceAssociationsPairsCache(obj.getEntity()) ?? {}).map(([entityName, attrs]) => Promise.all(attrs.map((attr) => tx.updateEntityDataReferringTo(entityName, allOfflineToRuntimeGuidsMap.map(obj.getGuid()), attr, null))))));
  });
  const getFilePath = (objJson, isThumb) => createFilePath(objJson, allOfflineToRuntimeGuidsMap, fileBackend.toAbsolutePath((isThumb ? "thumbnails" : "documents") + "/"));
  executeFileInstructions({ deletes: committedPEObjects.filter(({ jsonData }) => isFileDocumentWithContents(jsonData)).flatMap(({ jsonData }) => isImage(jsonData.objectType) ? [getFilePath(jsonData, false), getFilePath(jsonData, true)] : getFilePath(jsonData, false)) }, fileBackend).catch(handleError);
  const guidsToDelete = objects.map((obj) => obj.getGuid()), allOtherCachedObjects = objectCache.getAllObjects().filter((obj) => !allOfflineToRuntimeGuidsMap.has(obj.getGuid()) && !guidsToDelete.includes(obj.getGuid())), cachedNPEEntities = unique(allOtherCachedObjects.flatMap((obj) => obj.isPersistable() ? [] : obj.getEntity())), deletedEntitiesAllAssociationsPairsCache = createMemoizedCache((entity) => getEntityAssociationsPairs(entity, [...schema, ...cachedNPEEntities], true)), deletedEntities = unique(objects.map((obj) => obj.getEntity())), allAssociations = deletedEntities.flatMap((e) => Object.values(deletedEntitiesAllAssociationsPairsCache(e) ?? {})).flat(), objectRefsToDeletedObjectsPairs = allOtherCachedObjects.flatMap((obj) => {
    const refGuidsPairs = allAssociations.flatMap((assoc) => {
      if (obj.has(assoc)) {
        const refToDelete = obj.getReferences(assoc).filter((guid) => guidsToDelete.includes(guid));
        return !obj.isReadonlyAttr(assoc) && refToDelete.length > 0 ? [[assoc, refToDelete]] : [];
      }
      return [];
    });
    return refGuidsPairs.length > 0 ? [[obj, new Map(refGuidsPairs)]] : [];
  }), referencingObjectsJsonsResets = objectRefsToDeletedObjectsPairs.map(([obj, refGuidsMap]) => {
    const newObjJson = clone(obj.jsonData);
    return refGuidsMap.forEach((guidsToRemoveFromRefs, ref) => {
      const currentVal = newObjJson.attributes[ref].value;
      obj.isObjectReferenceSet(ref) && Array.isArray(currentVal) ? newObjJson.attributes[ref].value = currentVal.filter((guid) => !guidsToRemoveFromRefs.includes(guid)) : newObjJson.attributes[ref].value = null;
    }), newObjJson;
  }), [resetsMap, changesMap] = allOtherCachedObjects.reduce(([resets, changes], obj) => {
    const objectGuid = obj.getGuid();
    return Object.entries(objectCache.getChanges(objectGuid)).filter(([maybeRefAttr, _attrValue]) => allAssociations.includes(maybeRefAttr)).forEach(([refAttr, refValue]) => {
      const currentRefValue = refValue.value;
      obj.isObjectReferenceSet(refAttr) || !guidsToDelete.includes(currentRefValue) ? Array.isArray(currentRefValue) && currentRefValue.some((guid) => guidsToDelete.includes(guid)) && (1 === currentRefValue.length || currentRefValue.every((guid) => guidsToDelete.includes(guid)) ? addResetToMap(resets, objectGuid, refAttr) : refValue.hash || function(map, guid, attr, value) {
        map.has(guid) || map.set(guid, {});
        ensure(map.get(guid))[attr] = { value };
      }(changes, objectGuid, refAttr, currentRefValue.filter((guid) => !guidsToDelete.includes(guid)))) : addResetToMap(resets, objectGuid, refAttr);
    }), [resets, changes];
  }, [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  objectCache.onDelete(guidsToDelete), objectCache.setMxObjects(referencingObjectsJsonsResets), objectCache.removeChanges(Object.fromEntries(resetsMap)), objectCache.addChanges(Object.fromEntries(changesMap)), unmarkAsDirty(guidsToDelete.filter(isDirtyGuid)), runtimeObjects.forEach((obj) => {
    const maybeOfflineGuid = obj.getGuid();
    allOfflineToRuntimeGuidsMap.has(maybeOfflineGuid) && syncedObjsRuntimeToOfflineMap.remove(allOfflineToRuntimeGuidsMap.map(maybeOfflineGuid));
  });
  const attributeUpdates = objectRefsToDeletedObjectsPairs.flatMap(([obj, refs]) => Array.from(refs.keys()).map((ref) => ({ guid: obj.getGuid(), attr: ref })));
  function addResetToMap(map, guid, attr) {
    map.has(guid) || map.set(guid, []), ensure(map.get(guid)).push(attr);
  }
  await publish(...deletedEntities.map((entity) => ({ entity })), ...attributeUpdates, ...guidsToDelete.map((guid) => ({ guid })));
}
function isPushToClientInstruction(inst) {
  return "push_to_client" === inst.type;
}
function getGuidsPushedToClient(instructions) {
  return instructions.filter(isPushToClientInstruction).flatMap((instruction) => instruction.args.guids);
}
async function handleOfflineResponseObjects(runtimeGuidsToHandle, database, responseObjects, objectCache, offlineEntities, syncedObjsRuntimeToOfflineMap2, instantiatedObjectsRuntimeToOfflineMap = new RuntimeToOfflineGuidMapping(), tombstoneTableAction = "nothing") {
  const isOfflineEntity = function(offlineEntities2) {
    const entitySet = new Set(offlineEntities2), alreadyLoggedEntityWarnings = [];
    return (entity) => void 0 !== entity && (!!entitySet.has(entity) || (alreadyLoggedEntityWarnings.includes(entity) || (alreadyLoggedEntityWarnings.push(entity), LogManager.get().getLogger(LogNode.Synchronization).warn(`Object of type ${entity} cannot be pushed to client, skipping it.`)), false));
  }(offlineEntities), responseObjectsMap = indexMxObjectJsonsByGuid(responseObjects);
  await database.usingWriteTransaction(async (tx) => {
    if (runtimeGuidsToHandle.length > 0) {
      const objectMetas = await tx.retrieveMxObjectMetasByGuids(runtimeGuidsToHandle), guidToEntityMap = Object.assign({}, ...objectMetas.map((obj) => ({ [obj.guid]: obj.objectType }))), toInsert = [], toDelete = [];
      if (runtimeGuidsToHandle.forEach((runtimeGuid) => {
        const objectToPush = responseObjectsMap[runtimeGuid], entity = objectToPush?.objectType ?? guidToEntityMap[runtimeGuid];
        entity && isOfflineEntity(entity) && toDelete.push(runtimeGuid), entity && isOfflineEntity(objectToPush?.objectType) && toInsert.push(objectToPush);
      }), await tx.deleteEntitiesByGuid(toDelete), await tx.insertMxObjects(toInsert), "clean" === tombstoneTableAction && toInsert.length > 0) {
        const guidsToClear = Object.values(toInsert).map((objJson) => objJson.guid);
        await tx.deleteTombstones(guidsToClear);
      }
    }
    "reset" === tombstoneTableAction && await tx.truncateTombstones();
  }), runtimeGuidsToHandle.filter((runtimeGuid) => !Object.prototype.hasOwnProperty.call(responseObjectsMap, runtimeGuid)).forEach((runtimeGuid) => {
    let cachedGuid = runtimeGuid;
    instantiatedObjectsRuntimeToOfflineMap.has(runtimeGuid) ? cachedGuid = instantiatedObjectsRuntimeToOfflineMap.map(runtimeGuid) : syncedObjsRuntimeToOfflineMap2.has(runtimeGuid) && (cachedGuid = syncedObjsRuntimeToOfflineMap2.map(runtimeGuid));
    const cachedObj = objectCache.getObject(cachedGuid);
    null !== cachedObj && cachedObj.markAsUnavailable();
  }), runtimeGuidsToHandle.filter((runtimeGuid) => instantiatedObjectsRuntimeToOfflineMap.has(runtimeGuid)).forEach((runtimeGuid) => syncedObjsRuntimeToOfflineMap2.add(runtimeGuid, instantiatedObjectsRuntimeToOfflineMap.map(runtimeGuid))), unmarkAsDirty(runtimeGuidsToHandle.map((guid) => syncedObjsRuntimeToOfflineMap2.map(guid)));
}
async function gatherOfflineUpdates(offlineResponse, objectCache, database) {
  const updates = gatherUpdates(objectCache, offlineResponse), guidsToPush = unique(getGuidsPushedToClient(offlineResponse.instructions ?? [])), responseObjectMap = indexMxObjectJsonsByGuid(offlineResponse.objects ?? []), [availableGuids, unavailableGuids] = partition((guid) => void 0 !== responseObjectMap[guid], guidsToPush), [runtimeGuids, offlineGuids] = partition((guid) => isRuntimeGuid(guid), unavailableGuids), guidToEntityMap = Object.assign({}, ...availableGuids.map((guid) => ({ [guid]: responseObjectMap[guid].objectType })), ...runtimeGuids.map((guid) => ({ [guid]: deriveEntity(guid) })), ...await async function(database2, offlineGuids2) {
    if (0 === offlineGuids2.length)
      return [];
    const runtimeGuids2 = syncedObjsRuntimeToOfflineMap.reverse().map(offlineGuids2), results = await database2.usingReadTransaction((tx) => tx.retrieveMxObjectMetasByGuids(runtimeGuids2));
    return results.map((row) => ({ [syncedObjsRuntimeToOfflineMap.map(row.guid)]: row.objectType }));
  }(database, offlineGuids)), entityUpdates = unique(updates.filter(isEntityUpdate).map((entityUpdate) => entityUpdate.entity).concat(Object.values(guidToEntityMap))).map((entity) => ({ entity })), objectUpdates = unique(updates.filter(isObjectUpdate).map((update) => update.guid).concat(guidsToPush)).filter((guid) => objectCache.has(guid)).map((guid) => ({ guid }));
  return [...updates.filter((u) => "attr" in u && !guidsToPush.includes(u.guid)), ...objectUpdates, ...entityUpdates];
}
function isEntityUpdate(update) {
  return "entity" in update;
}
function isObjectUpdate(update) {
  return "guid" in update && !("attr" in update);
}
async function executeOfflineMicroflow(operationId, mfArgs, schema, objectCache, lockManager, database, fileBackend, targetForm, validationGuids = [], runAsync = false) {
  let runtimeResponse;
  try {
    const [changes, objects] = function([changes2, objects2]) {
      const filteredChanges = Object.fromEntries(Object.entries(changes2).filter(([guid, _]) => isGuidOnlineOrNpe(guid))), filteredObjects = objects2.filter((object) => isGuidOnlineOrNpe(object.guid, object.objectType));
      return [filteredChanges, filteredObjects];
    }(getRequestDataForMicroflow(objectCache, operationId, getGuidsFromRuntimeArguments(mfArgs).concat(getImplicitMicroflowParameters()))), objectsWithoutReadonlyAttrs = function(objects2) {
      return objects2.map((jsonData) => jsonData.hash ? jsonData : { ...jsonData, attributes: Object.fromEntries(Object.entries(jsonData.attributes).filter(([_, value]) => !value.readonly)) });
    }(objects);
    runtimeResponse = runAsync ? await executeAsync((asyncId) => runtimeOperation(operationId, mfArgs, changes, objectsWithoutReadonlyAttrs, validationGuids, asyncId), 10) : await runtimeOperation(operationId, mfArgs, changes, objectsWithoutReadonlyAttrs, validationGuids);
  } catch (e) {
    throw await async function(e2, objectCache2, database2) {
      if (e2 instanceof ValidationError) {
        const json = cleanupRuntimeResponse(mapMicroflowResponseToOfflineGuids(e2.original, syncedObjsRuntimeToOfflineMap, objectCache2)), updates2 = (await gatherOfflineUpdates(json, objectCache2, database2)).filter((u) => !("attr" in u));
        await publish(...updates2), await executeNoImpactInstructions(json.instructions), await handleValidations(json.datavalidation);
      }
    }(e, objectCache, database), e;
  }
  const offlineResponse = cleanupRuntimeResponse(mapMicroflowResponseToOfflineGuids(runtimeResponse, syncedObjsRuntimeToOfflineMap, objectCache)), updates = await gatherOfflineUpdates(offlineResponse, objectCache, database);
  await async function(runtimeResponse2, fileBackend2, database2, objectCache2, schema2) {
    const runtimeGuidsToPushSet = new Set(getGuidsPushedToClient(runtimeResponse2.instructions ?? [])), runtimeGuidsToPush = Array.from(runtimeGuidsToPushSet), objectsToPush = runtimeResponse2.objects?.filter((o) => runtimeGuidsToPushSet.has(o.guid)) ?? [], runtimeFileGuidsToPush = runtimeGuidsToPush.filter((guid) => isFileDocument(deriveEntity(guid))), allFileObjects = 0 === runtimeFileGuidsToPush.length ? [] : await offlineData().retrieveByGuids(runtimeFileGuidsToPush), { downloads, moves, deletes } = await gatherFileInstructions(allFileObjects, objectsToPush, false, syncedObjsRuntimeToOfflineMap, fileBackend2);
    0 !== runtimeGuidsToPush.length && (await executeFileInstructions({ downloads }, fileBackend2), await handleOfflineResponseObjects(runtimeGuidsToPush, database2, runtimeResponse2.objects ?? [], objectCache2, schema2, syncedObjsRuntimeToOfflineMap, new RuntimeToOfflineGuidMapping(), 0 !== objectsToPush.length ? "clean" : "nothing"), await executeFileInstructions({ moves }, fileBackend2), executeFileInstructions({ deletes }, fileBackend2).catch(handleError));
  }(runtimeResponse, fileBackend, database, objectCache, schema);
  const releaseResponseObjects = await handleRuntimeSuccessResponse(objectCache, lockManager, offlineResponse, updates, { targetForm });
  try {
    const result = offlineResponse.actionResult;
    return null == result ? void 0 : runtimeValueToExpressionVariable(result.value, result.type, (guid) => ensure(objectCache.getObject(guid)));
  } finally {
    releaseResponseObjects();
  }
}
function cleanupRuntimeResponse({ objects = [], changes = {}, resets = {}, deletes = [], newpersistable = [], commits = [], instructions = [], datavalidation = [], ...remaining }) {
  const guidsPushedToClient = new Set(getGuidsPushedToClient(instructions));
  function isAllowed(guid, objectType) {
    return guidsPushedToClient.has(guid) || isGuidOnlineOrNpe(guid, objectType);
  }
  return { ...remaining, deletes: filterGuids(deletes, isAllowed), newpersistable: filterGuids(newpersistable, isAllowed), commits: filterGuids(commits, isAllowed), changes: filterKeys(changes, isAllowed), resets: filterKeys(resets, isAllowed), instructions: filterInstructions(instructions), objects: objects.filter((obj) => isAllowed(obj.guid, obj.objectType)), datavalidation: filterDatavalidation(datavalidation, isAllowed) };
}
function isGuidOnlineOrNpe(guid, objectType) {
  return isRuntimeGuid(guid) && isEntityOnlineOrNpe(ensure(objectType ?? deriveEntity(guid)));
}
function isEntityOnlineOrNpe(entity) {
  return false === getEntityMeta(entity)?.isPersistable || offlineData().hasOnlineSyncMode(entity);
}
function filterGuids(guids, predicate) {
  return guids.filter((guid) => predicate(guid));
}
function filterKeys(responsePart, predicate) {
  return Object.assign({}, ...Object.keys(responsePart).filter((guid) => predicate(guid)).map((guid) => ({ [guid]: responsePart[guid] })));
}
function filterInstructions(instructions) {
  return instructions.flatMap((instruction) => {
    switch (instruction.type) {
      case "refresh_class":
        const classnames = instruction.args.classnames.filter(isEntityOnlineOrNpe);
        return classnames.length > 0 ? [{ ...instruction, args: { classnames } }] : [];
      case "refresh_object_list":
        const allowedGuids = instruction.args.ObjectIds.filter((guid) => isGuidOnlineOrNpe(guid));
        return allowedGuids.length > 0 ? [{ ...instruction, args: { ObjectIds: allowedGuids } }] : [];
      default:
        return instruction;
    }
  });
}
function filterDatavalidation(datavalidation, predicate) {
  return datavalidation.filter(({ guid }) => predicate(guid));
}
function mapMicroflowResponseToOfflineGuids({ actionResult, newpersistable = [], objects = [], changes = {}, commits = [], committedObjectsOmitted = false, resets = {}, deletes = [], instructions = [], datavalidation = [] }, runtimeToOfflineMapping, objectCache) {
  return { actionResult, committedObjectsOmitted, newpersistable, commits, datavalidation, deletes: runtimeToOfflineMapping.map(deletes), instructions: remapInstructions(instructions, runtimeToOfflineMapping), objects: objects.map((objJson) => runtimeToOfflineMapping.mapMxObjectJSON(objJson)), changes: remapResponseChanges(changes, objects, objectCache, runtimeToOfflineMapping), resets: remapResets(resets, runtimeToOfflineMapping) };
}
function remapResponseChanges(responseChanges, responseObjects, cache, runtimeToOfflineMapping) {
  return Object.assign({}, ...Object.entries(responseChanges).map(([guid, responseChange]) => {
    const entity = (responseObjects.find((o) => o.guid === guid) ?? ensure(cache.getObject(runtimeToOfflineMapping.map(guid))).jsonData).objectType, entityMeta = getEntityMeta(entity);
    return entityMeta ? { [runtimeToOfflineMapping.map(guid)]: runtimeToOfflineMapping.mapChange(responseChange, entityMeta) } : { [guid]: responseChange };
  }));
}
function remapResets(resetsToRemap, runtimeToOfflineMapping) {
  return Object.assign({}, ...Object.keys(resetsToRemap).map((guid) => ({ [runtimeToOfflineMapping.map(guid)]: resetsToRemap[guid] })));
}
function remapInstructions(responseInstructions, runtimeToOfflineMapping) {
  return responseInstructions.map((instruction) => "push_to_client" === instruction.type ? { ...instruction, args: { guids: runtimeToOfflineMapping.map(instruction.args.guids) } } : instruction);
}
async function downloadObjects(database, fileBackend, cache, syncConfig, uploadedObjsEntityToGuidsMap, resetPreservedEntities, logger, incompatibleEntities = /* @__PURE__ */ new Set()) {
  try {
    return await async function(database2, fileBackend2, cache2, { schema, preserveData, fetch, never, online }, uploadedObjsEntityToGuidsMap2, resetPreservedEntities2, incompatibleEntities2, logger2) {
      const preservedEntityToUploadedGuidsMap = resetPreservedEntities2 ? {} : Object.fromEntries(Object.entries(uploadedObjsEntityToGuidsMap2).filter(([entity]) => preserveData.includes(entity)).map(([entity, guids]) => [entity, guids])), stopwatch = new Stopwatch();
      logger2.trace("Fetching objects.");
      const fetchedObjs = await async function(fetch2, preservedEntityToUploadedGuidsMap2, logger3) {
        return (await Promise.all([...fetch2.map(({ xpath }) => fetchObjectsByXPath(xpath)), fetchUploadedPreservedObjects()])).flat();
        async function fetchObjectsByXPath(xpath) {
          logger3.trace(`Fetching objects by XPath: ${xpath}`);
          const stopwatch2 = new Stopwatch(), json = await retrieveByXPath(xpath);
          return logger3.trace(`Fetched ${json.objects?.length ?? 0} objects by XPath ${xpath} in ${stopwatch2.measure()} milliseconds.`), extractObjectsFromJSON(ensure(json.objects), ensure(json.resultGuids));
        }
        async function fetchUploadedPreservedObjects() {
          const guidsToRetrieve = Object.values(preservedEntityToUploadedGuidsMap2).flat();
          if (0 === guidsToRetrieve.length)
            return [];
          logger3.trace(`Fetching ${guidsToRetrieve.length} preserved objects.`);
          const stopwatch2 = new Stopwatch(), json = await retrieveByIds(guidsToRetrieve, {});
          return logger3.trace(`Fetched  ${guidsToRetrieve.length === json.objects?.length ? guidsToRetrieve.length : `${json.objects?.length ?? 0} of ${guidsToRetrieve.length}`} preserved objects in ${stopwatch2.measure()} milliseconds.`), Object.entries(preservedEntityToUploadedGuidsMap2).flatMap(([, guids]) => extractObjectsFromJSON(ensure(json.objects), guids.filter((guid) => json.resultGuids.includes(guid))));
        }
        function extractObjectsFromJSON(responseObjects, guids) {
          const jsonObjMap = responseObjects.reduce((map, val) => (map[val.guid] = val, map), {});
          return guids.map((guid) => jsonObjMap[guid]);
        }
      }(fetch, preservedEntityToUploadedGuidsMap, logger2);
      logger2.trace(`Fetched ${fetchedObjs.length} objects and completed in ${stopwatch.measure()}ms.`), logger2.trace("Calculating file operations.");
      const [downloadFileInstructions, filesToRemove] = await async function(fetchedObjs2, database3, fileBackend3, preserveData2, resetPreservedEntities3) {
        const preservedGuidsWithChangeDates = resetPreservedEntities3 ? [] : await async function(database4, preservedEntities) {
          if (preservedEntities.some((entity) => !isFileDocument(entity)))
            throw new AssertionError("Non-file document entity passed.");
          return database4.usingReadTransaction(async (tx) => (await Promise.all(preservedEntities.map((entity) => tx.retrieveMxObjects(entity, void 0, { attributes: [SystemAttribute.ChangedDate] })))).flat().map((obj) => [obj.guid, obj.attributes[SystemAttribute.ChangedDate]?.value]));
        }(database3, preserveData2.filter((entity) => isFileDocument(entity))), documentsDir = fileBackend3.toAbsolutePath("documents") + "/", filesToPreserve = preservedGuidsWithChangeDates.map(([guid, changedDate]) => documentsDir + getFsFileName(guid, changedDate ?? null)), thumbnailsDir = fileBackend3.toAbsolutePath("thumbnails") + "/", thumbnailsToPreserve = preservedGuidsWithChangeDates.map(([guid, changedDate]) => thumbnailsDir + getFsFileName(guid, changedDate ?? null)), [downloadFileInstructions2, filesToRemove2] = await computeFilesToDownloadAndDelete(fileBackend3, fetchedObjs2, filesToPreserve, false), [downloadThumbInstructions, thumbsToRemove] = await computeFilesToDownloadAndDelete(fileBackend3, fetchedObjs2, thumbnailsToPreserve, true);
        return [downloadFileInstructions2.concat(downloadThumbInstructions), filesToRemove2.concat(thumbsToRemove)];
      }(fetchedObjs, database2, fileBackend2, preserveData, resetPreservedEntities2);
      logger2.trace(`${downloadFileInstructions.length} files to be downloaded, ${filesToRemove.length} files to be removed`), logger2.trace("Downloading files."), stopwatch.reset();
      const failedDownloadGuids = await downloadFiles(downloadFileInstructions, fileBackend2, logger2), fetchedObjsExcludingFailedDownloads = failedDownloadGuids.size > 0 ? fetchedObjs.filter((obj) => !failedDownloadGuids.has(obj.guid)) : fetchedObjs;
      logger2.trace(`Downloaded ${downloadFileInstructions.length - failedDownloadGuids.size} files in ${stopwatch.measure()} milliseconds.`), logger2.trace("Compute cached objects to update or delete."), stopwatch.reset();
      const [updatedObjs, guidsToDelete] = function(cache3, fetchedObjs2, entitiesToPreserve, uploadedObjsEntityToGuidsMap3, resetPreservedEntities3) {
        const syncedObjsOfflineToRuntimeMap = syncedObjsRuntimeToOfflineMap.reverse(), fetchedObjsWithCached = cache3.getAllObjects().filter((mxobj) => {
          if (!mxobj.isPersistable() || cache3.isNew(mxobj.getGuid()))
            return false;
          if (resetPreservedEntities3 || !entitiesToPreserve.includes(mxobj.getEntity()))
            return true;
          const uploadedRuntimeGuids = uploadedObjsEntityToGuidsMap3[mxobj.getEntity()] ?? [];
          return syncedObjsRuntimeToOfflineMap.map(uploadedRuntimeGuids).includes(mxobj.getGuid());
        }).map((mxobj) => {
          const runtimeGuid = syncedObjsOfflineToRuntimeMap.map(mxobj.getGuid()), fetchedObj = fetchedObjs2.find((obj) => obj.guid === runtimeGuid);
          return [fetchedObj ? syncedObjsRuntimeToOfflineMap.mapMxObjectJSON(fetchedObj) : void 0, mxobj];
        }), [updates, deletes] = partition(([obj]) => void 0 !== obj, fetchedObjsWithCached);
        return [updates.map(([obj]) => obj), deletes.map(([_, mxobj]) => mxobj.getGuid())];
      }(cache2, fetchedObjsExcludingFailedDownloads, preserveData, uploadedObjsEntityToGuidsMap2, resetPreservedEntities2);
      logger2.trace(`Compute cached objects to update or delete completed in ${stopwatch.measure()} milliseconds. ${updatedObjs.length} objects will be updated, ${guidsToDelete.length} will be deleted.`), logger2.trace("Computing subscription updates."), stopwatch.measure();
      const messages = function(schema2, preservedEntities, excludedEntities, fetchedObjs2, preservedEntityToUploadedGuidsMap2, updatedGuidsInCache, removedGuidsFromCache, resetPreservedEntities3) {
        const ignoredEntities = /* @__PURE__ */ new Set([...preservedEntities, ...excludedEntities]), entityUpdates = schema2.filter((entity) => !(!resetPreservedEntities3 && ignoredEntities.has(entity)) || void 0 !== preservedEntityToUploadedGuidsMap2[entity] && !preservedEntityToUploadedGuidsMap2[entity].every((guid) => void 0 !== fetchedObjs2.find((f) => f.guid === guid))).map((entity) => ({ entity }));
        return [...entityUpdates, ...updatedGuidsInCache.map((guid) => ({ guid })), ...removedGuidsFromCache.map((guid) => ({ guid }))];
      }(schema, [...preserveData, ...never], online ?? [], fetchedObjsExcludingFailedDownloads, preservedEntityToUploadedGuidsMap, updatedObjs.map((obj) => obj.guid), guidsToDelete, resetPreservedEntities2);
      return logger2.trace(`Computing subscription updates completed in ${stopwatch.measure()} milliseconds.`), logger2.trace("Rebuilding the database."), stopwatch.reset(), await async function(database3, schema2, objs, entityToGuidsMapToDelete, entitiesToPreserve, excludedEntities, incompatibleEntities3 = /* @__PURE__ */ new Set()) {
        const ignoredEntities = /* @__PURE__ */ new Set([...entitiesToPreserve, ...excludedEntities]), entitiesToReset = schema2.filter((entity) => !ignoredEntities.has(entity)), fullReset = 0 === entitiesToPreserve.length;
        await database3.usingWriteTransaction(async (tx) => {
          const entitiesToDrop = [...entitiesToReset, ...incompatibleEntities3];
          await tx.dropEntityTables(entitiesToDrop), fullReset ? (await tx.reset(), await tx.updateEntityMetadatas(getSession().getOfflineMetadata())) : await tx.deleteEntitiesByGuid(Object.values(entityToGuidsMapToDelete).flat()), await tx.ensureSchema(entitiesToReset, 0), await tx.insertMxObjects(objs);
        });
      }(database2, schema, fetchedObjsExcludingFailedDownloads, Object.fromEntries(Object.entries(preservedEntityToUploadedGuidsMap).map(([objectType, guids]) => [objectType, syncedObjsRuntimeToOfflineMap.map(guids)])), resetPreservedEntities2 ? [] : [...preserveData, ...never], online ?? [], incompatibleEntities2), logger2.trace(`Rebuilding the database completed in ${stopwatch.measure()} milliseconds.`), logger2.trace(`Updating cache. ${updatedObjs.length} to be updated, ${guidsToDelete.length} to be deleted.`), stopwatch.reset(), cache2.setMxObjects(updatedObjs), cache2.onDelete(guidsToDelete), logger2.trace(`Updating cache completed in ${stopwatch.measure()} milliseconds.`), logger2.trace(`Removing ${filesToRemove.length} files.`), stopwatch.reset(), Promise.all(filesToRemove.map((file) => fileBackend2.removeFile(file))).catch(handleError), logger2.trace(`Removing ${filesToRemove.length} files completed in ${stopwatch.measure()} milliseconds.`), messages;
    }(database, fileBackend, cache, syncConfig, uploadedObjsEntityToGuidsMap, resetPreservedEntities, incompatibleEntities, logger);
  } catch (e) {
    throw logger.warn(e), new SynchronizationError();
  }
}
async function computeFilesToDownloadAndDelete(fileBackend, fetchedObjs, filesToPreserve, isThumb) {
  const root = fileBackend.toAbsolutePath(isThumb ? "thumbnails" : "documents") + "/", objsToHaveFiles = fetchedObjs.filter((obj) => isFileDocumentWithContents(obj, isThumb)).map((obj) => {
    const changedDate = obj.attributes.changedDate?.value;
    return { sourceUrl: getRemoteDynamicResourceUrl(obj.guid, changedDate ?? null, isThumb), downloadPath: root + getFsFileName(obj.guid, changedDate ?? null), guid: obj.guid };
  }), existingFiles = (await fileBackend.listDir(root)).map((name) => root + name);
  return [objsToHaveFiles.filter((x) => !existingFiles.includes(x.downloadPath)).map(({ sourceUrl, downloadPath, guid }) => [sourceUrl, downloadPath, guid]), existingFiles.filter((path) => !objsToHaveFiles.find((x) => x.downloadPath === path) && !filesToPreserve.includes(path))];
}
async function selectiveSync(objects, deletesToSync, offlineEntities, objectCache, database, fileBackend, logger) {
  !function() {
    if (uniqueBy(objects, (obj) => obj.getGuid()).length !== objects.length)
      throw new AssertionError("Duplicate objects aren't allowed");
  }(), logger.trace("Selective sync started.");
  const stopwatch = new Stopwatch(), updates = await runInSynchronizationLock(async () => {
    const objectsToSynchronize = objects.filter((object) => !objectCache.isNew(object.getGuid())), foundObjectsToSynchronize = 0 !== objectsToSynchronize.length, foundDeletesToSynchronize = 0 !== Object.keys(deletesToSync).length;
    if (!foundObjectsToSynchronize && !foundDeletesToSynchronize)
      return logger.trace("Nothing to sync."), [];
    logger.trace(`Selective sync to sync ${objects.length} objects and ${Object.keys(deletesToSync).length} deletes.`);
    const guidsToSynchronize = objectsToSynchronize.map((object) => object.getGuid()), syncedObjsOfflineToRuntimeMap = syncedObjsRuntimeToOfflineMap.reverse(), dirtyObjects = objectsToSynchronize.filter((object) => isDirtyGuid(object.getGuid())), alreadySynchronizedMaybeOfflineGuids = guidsToSynchronize.filter((guid) => !isDirtyGuid(guid));
    stopwatch.reset();
    const { createdGuidsMapping, response } = await synchronizeObjects({ dirtyMxObjects: dirtyObjects, syncedObjsOfflineToRuntimeMap, returnObjects: true, deletes: deletesToSync, extraGuidsToRetrieve: alreadySynchronizedMaybeOfflineGuids, logger, database, fileBackend, offlineEntities });
    logger.trace(`Selective sync synced changes with runtime in ${stopwatch.measure()} milliseconds.`);
    const allOfflineToRuntimeMap = syncedObjsRuntimeToOfflineMap.reverse(), syncUpdates = function(objectsToSynchronize2) {
      const entities = new Set(objectsToSynchronize2.map((obj) => obj.getEntity()));
      return objectsToSynchronize2.map((obj) => ({ guid: obj.getGuid() })).concat(Array.from(entities).map((entity) => ({ entity })));
    }(objectsToSynchronize), fileDocumentCache = createMemoizedCache((entity) => isFileDocument(entity)), fileObjsToSynchronize = objectsToSynchronize.filter((mxobj) => fileDocumentCache(mxobj.getEntity())).map((mxobj) => mxobj.jsonData), { downloads, moves, deletes } = await gatherFileInstructions(fileObjsToSynchronize, response.objects, true, syncedObjsRuntimeToOfflineMap, fileBackend), guidsFailedToDownload = await downloadFiles(downloads, fileBackend, logger), objectsWithoutDownloadErrors = 0 === guidsFailedToDownload.size ? response.objects : response.objects.filter((obj) => !guidsFailedToDownload.has(obj.guid));
    logger.trace("Selective sync to update the local database."), stopwatch.reset(), await handleOfflineResponseObjects(allOfflineToRuntimeMap.map(guidsToSynchronize), database, objectsWithoutDownloadErrors, objectCache, offlineEntities, syncedObjsRuntimeToOfflineMap, createdGuidsMapping.reverse(), foundDeletesToSynchronize ? "reset" : "nothing"), logger.trace(`Selective sync updated the local database in ${stopwatch.measure()} milliseconds.`);
    const filesToMove = guidsFailedToDownload.size > 0 ? moves.filter(([_source, _dest, guid]) => !guidsFailedToDownload.has(guid)) : moves;
    await executeFileInstructions({ moves: filesToMove }, fileBackend, logger), executeFileInstructions({ deletes }, fileBackend, logger).catch((e) => handleError(e));
    const cachedObjectsToUpdate = objectsWithoutDownloadErrors.flatMap((mxObjJSON) => objectCache.has(syncedObjsRuntimeToOfflineMap.map(mxObjJSON.guid)) ? syncedObjsRuntimeToOfflineMap.mapMxObjectJSON(mxObjJSON) : []);
    return objectCache.setMxObjects(cachedObjectsToUpdate), syncUpdates;
  });
  updates.length > 0 && (logger.trace("Selective sync to update UI with the latest state of the synchronized objects."), stopwatch.reset(), await publish(...updates), logger.trace(`Selective sync updated the UI with the latest state of the synchronized objects in ${stopwatch.measure()} milliseconds.`)), logger.trace("Selective sync completed.");
}
class OfflineData {
  constructor(syncConfig, objectCache, lockManager, fileBackend, database, logManager = LogManager.get()) {
    this.syncConfig = syncConfig, this.objectCache = objectCache, this.lockManager = lockManager, this.fileBackend = fileBackend, this.database = database, this.startupLogger = logManager.getLogger(LogNode.Startup), this.syncLogger = logManager.getLogger(LogNode.Synchronization), this.selectiveSyncLogger = logManager.getLogger(LogNode.SelectiveSync), this.onlineEntities = new Set(syncConfig.online), function() {
      const isSupportedAction = actionMatcher("login", "logout", "create_guids", "synchronize_objects", "retrieve_by_xpath", "get_client_log_levels");
      function isDownload(request) {
        return "get" === request.init.method && request.url.startsWith(`${mx.remoteUrl}file?`);
      }
      registerMiddleware(createRetryMiddlewarePredicate(2, (request) => isSupportedAction(request) || isDownload(request)));
    }();
  }
  async initialize(migrations, webSqlConnection) {
    if (void 0 !== webSqlConnection) {
      const websqlToSqliteMigration = new ImportDataFromWebSqlMigration(this.database, webSqlConnection);
      await websqlToSqliteMigration.apply();
    }
    const tablesToInitialize = this.syncConfig.schema.filter((entity) => !this.hasOnlineSyncMode(entity)), latestVersion = function(migrations2) {
      return migrations2[migrations2.length - 1]?.version ?? 0;
    }(migrations), dbVersion = await this.database.usingWriteTransaction(async (tx) => (await tx.ensureSchema(tablesToInitialize, latestVersion), tx.getDatabaseVersion()));
    if (latestVersion <= dbVersion)
      this.startupLogger.debug("The database schema is up-to-date.");
    else {
      const stopwatch = new Stopwatch();
      await this.database.runMigrations(migrations), this.startupLogger.debug(`The app has upgraded the local database version from ${dbVersion} to ${latestVersion} in ${stopwatch.measure()} milliseconds.`);
    }
    const { dirtyObjects } = await this.retrieveDirtyObjects();
    markAsDirty(dirtyObjects.map((obj) => obj.getGuid()));
  }
  async downloadObjects(uploadedObjsEntityToGuidsMap, fullReset, incompatibleEntities) {
    this.syncLogger.trace("Downloading objects");
    const stopwatch = new Stopwatch(), objects = downloadObjects(this.database, this.fileBackend, this.objectCache, this.syncConfig, uploadedObjsEntityToGuidsMap, fullReset, this.syncLogger, incompatibleEntities);
    return this.syncLogger.info(`Downloading objects completed in ${stopwatch.measure()} milliseconds.`), objects;
  }
  async cleanDatabase() {
    await this.database.delete(this.syncConfig.schema);
  }
  async create(entity) {
    const meta = ensure(getEntityMeta(entity)), guid = meta.isPersistable ? createOfflineGuid() : createMendixGuid(meta);
    return this.objectCache.onCreate([guid]), this.objectCache.setMxObjects([createMxObjectJSON(guid, meta)]), this.objectCache.getObject(guid);
  }
  async retrieve(entity, filter, options) {
    const { jsons, count } = await this._retrieveJson(entity, filter, options);
    this.objectCache.setMxObjects(jsons);
    return { mxObjects: jsons.map((json) => ensure(this.objectCache.getObject(json.guid))), count };
  }
  async retrieveByGuids(guids) {
    return (await this.database.usingReadTransaction((tx) => tx.retrieveMxObjectByGuids(guids))).map((json) => syncedObjsRuntimeToOfflineMap.mapMxObjectJSON(json));
  }
  async retrieveUncached(entity, filter, options) {
    const { jsons, count } = await this._retrieveJson(entity, filter, options);
    return { mxObjects: jsons.map(MxObject.fromJson), count };
  }
  async retrieveDirtyObjects(withOfflineGuids = false, incompatibleEntities = /* @__PURE__ */ new Set()) {
    const excludedEntities = new Set(this.syncConfig.never), objects = await this.database.usingReadTransaction((tx) => tx.retrieveDirtyObjects(excludedEntities)), countEntities = (entityCountGroup, entity) => {
      const entitiesCount = entityCountGroup.has(entity) ? entityCountGroup.get(entity) + 1 : 1;
      entityCountGroup.set(entity, entitiesCount);
    }, { dirtyObjects, incompatibleObjectsJson, incompatibleObjectsCount } = objects.flat().reduce((result, obj) => {
      const entityTableName = obj.objectType;
      if (incompatibleEntities.has(entityTableName) || null == getEntityMeta(entityTableName))
        return result.incompatibleObjectsJson.push(obj), countEntities(result.incompatibleObjectsCount, entityTableName), result;
      try {
        const objectJson = withOfflineGuids ? syncedObjsRuntimeToOfflineMap.mapMxObjectJSON(obj) : obj;
        result.dirtyObjects.push(MxObject.fromJson(objectJson));
      } catch {
        result.incompatibleObjectsJson.push(obj), countEntities(result.incompatibleObjectsCount, entityTableName);
      }
      return result;
    }, { dirtyObjects: [], incompatibleObjectsJson: [], incompatibleObjectsCount: /* @__PURE__ */ new Map() });
    return incompatibleObjectsCount.forEach((count, entity) => {
      this.syncLogger.warn(`Failed to parse ${count} object${1 === count ? "" : "s"} of type '${entity}'and to prevent data loss new 'System.SynchronizationError' corresponding to these failed objects will be created.`);
    }), { dirtyObjects, incompatibleObjectsJson };
  }
  async retrieveDeletes() {
    const result = await this.database.usingReadTransaction((tx) => tx.retrieveAllTombstones());
    return Object.fromEntries(result.map((row) => [row.guid, row.syncId]));
  }
  async insertOrReplace(objs) {
    const sessionId = getSession().getSessionObjectId();
    await this.database.usingWriteTransaction(async (tx) => {
      const syncIds = await generateSyncIds(tx, sessionId, objs.length);
      return tx.insertMxObjectsWithSyncId(objs.map((obj, idx) => ({ ...obj, syncId: syncIds[idx] })));
    });
  }
  async executeMicroflow(operationId, args, targetForm, validationGuids = [], runAsync = false) {
    return executeOfflineMicroflow(operationId, args, this.syncConfig.schema, this.objectCache, this.lockManager, this.database, this.fileBackend, targetForm, validationGuids, runAsync);
  }
  async upload(incompatibleEntities = /* @__PURE__ */ new Set()) {
    const { dirtyObjects, incompatibleObjectsJson } = await this.retrieveDirtyObjects(false, incompatibleEntities), deletesToSync = await this.retrieveDeletes(), foundDirtyObjectsToSync = 0 !== dirtyObjects.length, foundDeletesToSync = 0 !== Object.keys(deletesToSync).length, foundUnparsedObjectsJsonToSync = 0 !== incompatibleObjectsJson.length;
    if (!(foundDirtyObjectsToSync || foundDeletesToSync || foundUnparsedObjectsJsonToSync))
      return {};
    this.syncLogger.trace(`Uploading ${dirtyObjects.length} changes, ${Object.keys(deletesToSync).length} deletes.`), dirtyObjects.length + deleteObjects.length > 1e3 && this.syncLogger.warn("Uploading excessive amount of data will slow down synchronization.");
    const stopwatch = new Stopwatch(), { createdGuidsMapping, response } = await synchronizeObjects({ returnObjects: false, dirtyMxObjects: dirtyObjects, syncedObjsOfflineToRuntimeMap: syncedObjsRuntimeToOfflineMap.reverse(), deletes: deletesToSync, incompatibleObjectsJson, logger: this.syncLogger, database: this.database, fileBackend: this.fileBackend, offlineEntities: this.syncConfig.schema }), reversedCreatedGuidsMapping = createdGuidsMapping.reverse();
    if (this.syncLogger.trace(`Synchronizing objects took ${stopwatch.measure()} milliseconds.`), !foundDirtyObjectsToSync)
      return await this.database.usingWriteTransaction((tx) => tx.truncateTombstones()), {};
    this.syncLogger.trace("Updating local database with uploaded changes."), stopwatch.reset();
    const dirtyObjectsMap = indexMxObjectsByGuid(dirtyObjects);
    await this.database.usingWriteTransaction(async (tx) => [...await Promise.all(Object.entries(response.fileChangedDates).map(async ([runtimeGuid, changedDate]) => {
      const maybeOfflineGuid = reversedCreatedGuidsMapping.map(runtimeGuid), mxobj = ensure(dirtyObjectsMap[maybeOfflineGuid]);
      return tx.updateEntityData(mxobj.getEntity(), runtimeGuid, "changedDate", changedDate);
    })), await tx.clearDirtyFlags(dirtyObjects.map((obj) => createdGuidsMapping.map(obj.getGuid()))), await (foundDeletesToSync ? tx.truncateTombstones() : Promise.resolve())]), this.syncLogger.trace(`Updating local database took ${stopwatch.measure()} milliseconds.`), clearDirtyGuids();
    const moves = Object.entries(response.fileChangedDates).map(([guid, changedDate]) => {
      const newGuid = guid, oldGuid = reversedCreatedGuidsMapping.map(newGuid), oldObject = dirtyObjects.find((obj) => obj.getGuid() === oldGuid).jsonData, documentsPath = this.fileBackend.toAbsolutePath("documents/");
      return [documentsPath + getFsFileName(newGuid, ensure(oldObject.attributes.changedDate).value), documentsPath + getFsFileName(newGuid, changedDate), newGuid];
    });
    this.syncLogger.trace("Executing file instructions for uploaded file documents."), stopwatch.reset(), await executeFileInstructions({ moves }, this.fileBackend), this.syncLogger.trace(`Executing file instructions for uploaded file documents took ${stopwatch.measure()} milliseconds.`);
    const allOfflineToRuntimeMap = syncedObjsRuntimeToOfflineMap.reverse();
    return dirtyObjects.reduce((result, object) => {
      const entity = object.getEntity();
      return result[entity] = (result[entity] ?? []).concat(allOfflineToRuntimeMap.map(object.getGuid())), result;
    }, {});
  }
  async selectiveSync(objects, deletesToSync = {}) {
    return selectiveSync(objects, deletesToSync, this.syncConfig.schema, this.objectCache, this.database, this.fileBackend, this.selectiveSyncLogger);
  }
  async delete(objectsToDelete) {
    return deleteObjects(objectsToDelete, this.objectCache, this.fileBackend, this.syncConfig.schema, new Set(this.syncConfig.never), this.database);
  }
  async clearFromClient(entity) {
    await async function(entity2, objectCache, fileBackend, database) {
      if (!ensure(getEntityMeta(entity2)).isPersistable)
        throw Error("Entity must be persistable");
      const mxObjectJsons = await database.usingReadTransaction((tx) => tx.retrieveMxObjects(entity2)), allOfflineToRuntimeGuidsMap = syncedObjsRuntimeToOfflineMap.reverse(), getFilePath = (objJson, isThumb) => createFilePath(objJson, allOfflineToRuntimeGuidsMap, fileBackend.toAbsolutePath((isThumb ? "thumbnails" : "documents") + "/")), { deleteFilesInstructions, dbGuidsToClear } = mxObjectJsons.reduce((acc, mxObjectJson) => {
        const { guid } = mxObjectJson;
        return acc.dbGuidsToClear.push(guid), isFileDocumentWithContents(mxObjectJson) && (acc.deleteFilesInstructions.push(getFilePath(mxObjectJson, false)), isImage(entity2) && acc.deleteFilesInstructions.push(getFilePath(mxObjectJson, true))), acc;
      }, { deleteFilesInstructions: [], dbGuidsToClear: [] });
      executeFileInstructions({ deletes: deleteFilesInstructions }, fileBackend).catch(handleError), await database.usingWriteTransaction((tx) => tx.deleteEntitiesByEntity(entity2));
      const cachedObjectsGuids = objectCache.getAllObjects().filter((object) => object.getEntity() === entity2).map((object) => object.getGuid()), uniqueGuidsToClear = Array.from(/* @__PURE__ */ new Set([...dbGuidsToClear, ...cachedObjectsGuids]));
      objectCache.onDelete(uniqueGuidsToClear), unmarkAsDirty(uniqueGuidsToClear);
      const guidsUpdatesMessages = uniqueGuidsToClear.map((guid) => ({ guid }));
      await publish({ entity: entity2 }, ...guidsUpdatesMessages);
    }(entity, this.objectCache, this.fileBackend, this.database);
  }
  async executeDBModelSyncInstructions(dbModelSyncInstructions, newOfflineMetadata) {
    if (0 === dbModelSyncInstructions.length)
      return;
    const moreThanOneInstruction = dbModelSyncInstructions.length > 1;
    this.startupLogger.debug(`Found ${dbModelSyncInstructions.length} instruction${moreThanOneInstruction ? "s" : ""} to update the local database to the new schema.
${dbModelSyncInstructions.map((i) => `- ${i.getDescription()}`).join("\n")}`), await this.database.usingWriteTransaction(async (tx) => {
      await Promise.all(dbModelSyncInstructions.map((i) => i.runTransaction(tx))), await tx.updateEntityMetadatas(newOfflineMetadata);
    }), await Promise.all(dbModelSyncInstructions.map((i) => i.postMigrate()));
  }
  deleteFiles(filesToDelete) {
    if (0 === filesToDelete.length)
      return;
    const documentsDir = this.fileBackend.toAbsolutePath("documents") + "/", thumbnailsDir = this.fileBackend.toAbsolutePath("thumbnails") + "/";
    executeFileInstructions({ deletes: filesToDelete.map(({ guid, changedDate, isThumb }) => `${isThumb ? thumbnailsDir : documentsDir}${getFsFileName(guid, changedDate)}`) }, this.fileBackend).catch((e) => handleError(e));
  }
  async _retrieveJson(entity, filter, options) {
    if (this.syncConfig.online?.includes(entity))
      throw new AssertionError("Can not retrieve objects with online sync mode from offline database");
    const [rows, count] = await this.database.usingReadTransaction(async (tx) => [await tx.retrieveMxObjects(entity, filter, options), await tx.retrieveMxObjectsCount(entity, filter)]);
    return { jsons: rows.map((r) => syncedObjsRuntimeToOfflineMap.mapMxObjectJSON(r)), count };
  }
  async retrieveOfflineMetadata() {
    return this.database.usingReadTransaction((tx) => tx.retrieveEntityMetadatas());
  }
  async runFullSynchronization(fullReset = false, incompatibleEntities = /* @__PURE__ */ new Set()) {
    const updates = await runInSynchronizationLock(async () => {
      const uploadedObjsEntityToGuidsMap = await this.upload(incompatibleEntities);
      return this.downloadObjects(uploadedObjsEntityToGuidsMap, fullReset, incompatibleEntities);
    });
    await publish(...updates);
  }
  hasOnlineSyncMode(entity) {
    return this.onlineEntities.has(entity);
  }
}
class OfflineDataBackend extends _DataBackend {
  constructor(objectCache, store, fileBackend, getDocumentUrlFn) {
    super(), this._store = store, this._getDocumentUrl = getDocumentUrlFn || getDefaultDocumentUrl, this._objectCache = objectCache, this._fileBackend = fileBackend;
  }
  async getByGuid(externalGuids, filter) {
    const mxobjs = (await Promise.all(externalGuids.map((guid) => this._getByGuid(guid)))).filter((obj) => null != obj);
    return this._objectCache.setMxObjects(mxobjs), { mxobjs: mxobjs.map(({ guid }) => this._objectCache.getObject(guid)), count: mxobjs.length };
  }
  async getByPath(guid, path, entity, direction, getByGuid) {
    const association = getAssociationStep(path);
    if ("reverse" === direction) {
      const { cachedObjects } = getCachedObjectsByPath(guid, direction, path, this._objectCache), uncachedJsonsReferencingRoot = (getEntityMeta(entity)?.isPersistable ? await this._store.getByAttribute(entity, association, getRuntimeGuid(guid)) : []).map((json) => syncedObjsRuntimeToOfflineMap.mapMxObjectJSON(json)).filter((json) => MxObject.fromJson(json).getReferences(association).includes(guid)).filter((storedJson) => !cachedObjects.some((cachedObj) => cachedObj.getGuid() === storedJson.guid));
      this._objectCache.setMxObjects(uncachedJsonsReferencingRoot);
      const resultMxobjs = cachedObjects.concat(uncachedJsonsReferencingRoot.map((json) => this._objectCache.getObject(json.guid)));
      return { mxobjs: resultMxobjs, count: resultMxobjs.length };
    }
    {
      let rootMxObj = this._objectCache.getObject(guid);
      if (!rootMxObj) {
        const { mxobjs: [storedRootObj] } = await this.getByGuid([guid]);
        storedRootObj && (rootMxObj = storedRootObj);
      }
      if (!rootMxObj)
        return { mxobjs: [], count: 0 };
      const doGetByGuid = void 0 === getByGuid ? (guids) => this.getByGuid(guids) : getByGuid, { cachedObjects, uncachedGuids } = getRefsObjects(rootMxObj, this._objectCache, association), { mxobjs: storedRefMxobjs } = await doGetByGuid(uncachedGuids), refMxobjs = storedRefMxobjs.concat(cachedObjects);
      return this._objectCache.setMxObjects(storedRefMxobjs.map((mxobj) => mxobj.jsonData)), { mxobjs: refMxobjs, count: refMxobjs.length };
    }
  }
  async commit(commitGuids, context) {
    const commitChanges = objectFromArray(commitGuids.map((guid) => [guid, clone(this._objectCache.getChanges(guid))])), [cachedCommitGuids, uncachedCommitGuids] = partition((guid) => this._objectCache.has(guid), commitGuids), cachedCommitObjs = cachedCommitGuids.map((guid) => this._objectCache.getObject(guid)), [peObjsFromCache, npeObjsFromCache] = partition((obj) => obj.isPersistable(), cachedCommitObjs), originalCachedCommitObjs = peObjsFromCache.map(mxObjectToObj), persistableCommitObjs = (await Promise.all(uncachedCommitGuids.map((guid) => this._getByGuid(guid)))).concat(originalCachedCommitObjs).map(applyChanges);
    if (persistableCommitObjs.length > 0) {
      const offlineToRuntimeGuidMapping = syncedObjsRuntimeToOfflineMap.reverse(), { mappedObjectsJsons, objectsJsons, guids } = persistableCommitObjs.reduce((res, obj) => (res.mappedObjectsJsons.push(offlineToRuntimeGuidMapping.mapMxObjectJSON(obj)), res.objectsJsons.push(obj), res.guids.push(obj.guid), res), { mappedObjectsJsons: [], objectsJsons: [], guids: [] });
      await offlineData().insertOrReplace(mappedObjectsJsons), markAsDirty(guids), this._objectCache.setMxObjects(objectsJsons);
    }
    const nonPersistableCommitObjs = npeObjsFromCache.map(mxObjectToObj).map(applyChanges);
    return this._objectCache.setMxObjects(nonPersistableCommitObjs), this._objectCache.onCommit(commitGuids), this._objectCache.removeChanges(function(changes) {
      const resets = {};
      return Object.keys(changes).forEach((guid) => {
        resets[guid] = Object.keys(changes[guid]);
      }), resets;
    }(commitChanges)), { commits: commitGuids };
    function applyChanges(obj) {
      const changes = commitChanges[obj.guid];
      return { guid: obj.guid, objectType: obj.objectType, attributes: mapObject(Object.assign({}, changes, obj.attributes), (val, attr) => Object.assign({}, val, { value: changes.hasOwnProperty(attr) ? changes[attr].value : val.value })) };
    }
  }
  rollback(rollbackGuids) {
    this._objectCache.removeAllChanges(rollbackGuids);
    const newRollbackGuids = rollbackGuids.filter((guid) => this._objectCache.isNew(guid));
    return this._objectCache.onDelete(newRollbackGuids), Promise.resolve({ deletes: newRollbackGuids });
  }
  validate(validateGuids) {
    return Promise.resolve({});
  }
  async saveDocument(documentGuid, name, params, blob) {
    if (blob.size / 1048576 > params.maxFileSize)
      throw new DescribedError("File too large");
    const obj = await this._getByGuid(documentGuid), fileName = getFsFileName(getRuntimeGuid(documentGuid), obj ? obj.attributes.changedDate?.value : void 0);
    await this._fileBackend.storeFile(blob, this._fileBackend.toAbsolutePath("documents/" + fileName)), this._objectCache.makeChange(documentGuid, "HasContents", true), await this.commit([documentGuid], null);
  }
  getDocumentUrl(offlineGuid, changedDate, isThumb, _fileName) {
    return this._getDocumentUrl(getFsFileName(getRuntimeGuid(offlineGuid), changedDate), changedDate, isThumb);
  }
  getImageUrl(url) {
    return Promise.resolve(url);
  }
  async cleanup() {
    await offlineData().cleanDatabase(), await this._fileBackend.removeDir(this._fileBackend.toAbsolutePath("documents")), await this._fileBackend.removeDir(this._fileBackend.toAbsolutePath("thumbnails")), clearDirtyGuids();
  }
  async remove(guids) {
    const { mxobjs } = await this.getByGuid(guids);
    await offlineData().delete(mxobjs);
  }
  _getByGuid(offlineGuid) {
    return memoizeConcurrent(offlineGuid, async () => {
      const object = await this._store.getByGuid(getRuntimeGuid(offlineGuid));
      return null === object ? null : syncedObjsRuntimeToOfflineMap.mapMxObjectJSON(object);
    });
  }
}
function mxObjectToObj(mxobj) {
  return mxobj.jsonData;
}
function getDefaultDocumentUrl(fileName, changedDate, isThumb) {
  var dir = "files/" + (isThumb ? "thumbnails" : "documents");
  return `filesystem:${window.mx.appUrl}temporary/${dir}/${fileName}?${Date.now()}`;
}
class SqlStore {
  constructor(database) {
    this._database = database;
  }
  async getByGuid(guid) {
    const result = await this._database.usingReadTransaction((tx) => tx.retrieveMxObjectByGuids([guid]));
    return result.length > 0 ? result[0] : null;
  }
  getByAttribute(entity, attribute, value) {
    return this._database.usingReadTransaction((tx) => {
      if ("guid" === attribute)
        return tx.retrieveMxObjectByGuids([value]);
      const attributeType = getEntityMeta(entity)?.attributes[attribute]?.type ?? "String";
      return tx.retrieveMxObjects(entity, { type: "function", name: "=", parameters: [{ type: "attribute", attribute, attributeType }, { type: "value", value, isGuid: isReferenceType(attributeType) }] });
    });
  }
}
async function buildOfflineDataBackend(objectCache, lockManager, database, syncConfig, fileBackend, logManager, getDocumentUrlFn, websqlConnection) {
  const offlineData2 = new OfflineData(syncConfig, objectCache, lockManager, fileBackend, database, logManager);
  await offlineData2.initialize(Migrations, websqlConnection);
  const store = new SqlStore(database);
  return { dataBackend: new OfflineDataBackend(objectCache, store, fileBackend, getDocumentUrlFn), offlineData: offlineData2 };
}

export { buildOfflineDataBackend };
