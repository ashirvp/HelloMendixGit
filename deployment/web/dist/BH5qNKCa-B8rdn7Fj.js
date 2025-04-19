import { getAttributeInfoById, AssertionError, ensureAttributeId, ensure, getAttributeTypeById, crash, Big, deepEqual, toXpathConstraint, getAssociationInfoById, startOfDay, lessThan, literal, addDays, greaterThanOrEqual, or, and, getAssociationTypeById, isAttributeExpression, delocalizeDate, isUnlocalizedDateAttribute, fromMxSubscription$, fromTimer$, fromConstant$, useValue, action, fromComputation$, getPreviousValue$, mapL, loading, withFormSuspension$, fromMutableComputation$, scheduleSideEffect, runInAction, assertIsPositiveInteger, assertIsBoolean, readUntracked, assertValidFilterCondition, equalFilterCondition, withSideEffect$, asReloadable$, fromRequest$, available, withObjectKeeping$, toObjectItem, LogManager, asProperty, tuple, getSubscribedObjectState$, mapValues, unavailable, toQueryFilter, getOrElseL, toFriendlyId, offlineData, flatMapL, dependOnSubscription, expressionVariableToRuntimeArgument, toRuntimeArgument, onlineData, useDependency, fromObjectItem, reaction } from './index-C0bqjiJG.js';
import { scheduleAction } from './BrzhM9fk-CigoUw5u.js';
import { getParentIsReady$ } from './ActionButton-CJv0U8vt.js';

function conditionalExpression(condition, then, elseExpr) {
  return { type: "conditional", condition, then, else: elseExpr };
}
function functionExpression(name, arg1, arg2) {
  return { type: "function", name, parameters: void 0 === arg2 ? [arg1] : [arg1, arg2] };
}
function literalExpression(value) {
  return { type: "literal", value };
}
function literalNumericExpression(value) {
  return { type: "literalNumeric", value };
}
function variableExpression(variableName, attribute) {
  return void 0 !== attribute ? { type: "variable", variable: variableName, path: attribute } : { type: "variable", variable: variableName };
}
const attributeIdToSortingFlag = {};
function registerSortingAttribute(attributeId, sortable) {
  attributeIdToSortingFlag[attributeId] = sortable;
}
function ensureValidAttribute(attributeId) {
  const attributeInfo = getAttributeInfoById(attributeId), sortable = attributeIdToSortingFlag[attributeId];
  if (void 0 === attributeInfo || void 0 === sortable)
    throw new AssertionError(`Sort order item: invalid attribute id '${attributeId}'`);
  return { attributePath: attributeInfo.attributePath, sortable };
}
function convertToSortSpecs(sortInstructions) {
  return sortInstructions.map((s) => [ensureValidAttribute(s[0]).attributePath, s[1]]);
}
function convertToSortInstructions(sortSpecs, dataSourceId) {
  return sortSpecs.map((s) => {
    const attributeId = ensureAttributeId(s[0], dataSourceId);
    return registerSortingAttribute(attributeId, true), [attributeId, s[1]];
  });
}
function convertSortInstructionToExpression(sortInstruction) {
  const attributePath = ensure(getAttributeInfoById(sortInstruction[0])).attributePath, attributeType = ensure(getAttributeTypeById(sortInstruction[0])), attributePathExpression = variableExpression("currentObject", attributePath);
  return "String" === attributeType ? functionExpression("toLowerCase", attributePathExpression) : attributePathExpression;
}
function getCompareFunction(sortOrder) {
  return function(item1, item2) {
    let compareResult = 0;
    for (let i = 0; i < sortOrder.length && 0 === compareResult; i++) {
      const sortValue1 = item1.sortValues[i], sortValue2 = item2.sortValues[i], sortInstruction = ensure(sortOrder[i]), factor = "asc" === sortInstruction[1] ? 1 : -1;
      if (sortValue1 === sortValue2)
        continue;
      if (void 0 === sortValue1 || "" === sortValue1) {
        compareResult = factor;
        break;
      }
      if (void 0 === sortValue2 || "" === sortValue2) {
        compareResult = -factor;
        break;
      }
      switch (ensure(getAttributeTypeById(sortInstruction[0]))) {
        case "AutoNumber":
          compareResult = Big(sortValue1).cmp(Big(sortValue2));
          break;
        case "String":
        case "Enum":
        case "HashString":
          compareResult = sortValue1 > sortValue2 ? 1 : -1;
          break;
        case "Long":
        case "Integer":
        case "Decimal":
          sortValue1 instanceof Big && sortValue2 instanceof Big || crash(), compareResult = sortValue1.cmp(sortValue2);
          break;
        case "DateTime":
          sortValue1 instanceof Date && sortValue2 instanceof Date || crash(), compareResult = sortValue1.getTime() > sortValue2.getTime() ? 1 : -1;
          break;
        case "Boolean":
          compareResult = sortValue1 ? 1 : -1;
          break;
        default:
          crash();
      }
      compareResult *= factor;
    }
    if (0 === compareResult) {
      const factor = "asc" === ensure(sortOrder[0])[1] ? 1 : -1;
      compareResult = item1.mxObject.getGuid() > item2.mxObject.getGuid() ? factor : -factor;
    }
    return compareResult;
  };
}
function equalSortInstructions(a, b) {
  return deepEqual(a, b);
}
function assertIsValidSortOrder(options, dataSourceId) {
  if (void 0 === options)
    return true;
  if (!Array.isArray(options))
    throw new AssertionError("Sort order: must be array");
  return options.forEach((o) => function(sortItem) {
    if (!Array.isArray(sortItem) || 2 !== sortItem.length)
      throw new AssertionError("Sort order item: must be an array with 2 elements");
    const [id, dir] = sortItem;
    if (!function(id2) {
      return ensureValidAttribute(id2).sortable;
    }(id))
      throw new AssertionError(`Sort order item: attribute with id '${id}' is not sortable`);
    if (getAttributeInfoById(id).dataSourceId !== dataSourceId)
      throw new AssertionError(`Sort order item: attribute with id '${id}' is linked to a different data source`);
    if ("asc" !== dir && "desc" !== dir)
      throw new AssertionError(`Sort order item: sort direction must be 'asc' or 'desc'. Got: '${dir}'`);
  }(o)), true;
}

function convertFilterConditionToXPath(filter) {
  if (void 0 === filter)
    return "";
  const queryFilter = convertFilterExpressionToQueryFilter(filter);
  return `[${toXpathConstraint(queryFilter)}]`;
}
function convertFilterExpressionToExpression(filter) {
  switch (filter.type) {
    case "attribute":
      const attributePath = ensure(getAttributeInfoById(filter.attributeId)).attributePath;
      return variableExpression("currentObject", attributePath);
    case "literal":
      return "Numeric" === filter.valueType ? literalNumericExpression(filter.value) : literalExpression(filter.value ?? null);
    case "function":
      if ("arg" in filter)
        return functionExpression(filter.name, convertFilterExpressionToExpression(filter.arg));
      if ("arg1" in filter) {
        if (!function(filter2) {
          return filter2.name in filterFunctionsToExpressionFunctions;
        }(filter))
          return convertFilterExpressionToExpression(expandDayFilter(filter));
        const isCaseInsensitive = function(filter2) {
          switch (filter2.name) {
            case "starts-with":
            case "ends-with":
              return true;
            case "contains":
            case "=":
            case "!=":
            case ">":
            case ">=":
            case "<":
            case "<=":
              return isStringExpression(filter2.arg1) && isStringExpression(filter2.arg2);
            default:
              return false;
          }
        }(filter), transform = (e) => isCaseInsensitive ? functionExpression("toLowerCase", e) : e, arg1 = transform(convertFilterExpressionToExpression(filter.arg1)), arg2 = transform(convertFilterExpressionToExpression(filter.arg2)), fnExpr = functionExpression(filterFunctionsToExpressionFunctions[filter.name], arg1, arg2);
        return nullUnsafeFilterFunctions.includes(filter.name) ? conditionalExpression(functionExpression("=", arg1, literalExpression(null)), literalExpression(false), conditionalExpression(functionExpression("=", arg2, literalExpression(null)), literalExpression(false), fnExpr)) : fnExpr;
      }
      return filter.args.map(convertFilterExpressionToExpression).reduce((prev, curr) => "and" === filter.name ? conditionalExpression(prev, curr, literalExpression(false)) : conditionalExpression(prev, literalExpression(true), curr));
    case "association":
      const associationPath = ensure(getAssociationInfoById(filter.associationId)).associationPath;
      return variableExpression("currentObject", associationPath);
  }
}
const dayFilterFunctions = ["day:=", "day:!=", "day:>", "day:>=", "day:<", "day:<="];
function expandDayFilter(filter) {
  const filterAttribute = filter.arg1, dayValue = startOfDay(filter.arg2.value);
  switch (filter.name) {
    case "day:=":
      return and(greaterThanOrEqual(filterAttribute, literal(dayValue)), lessThan(filterAttribute, literal(addDays(dayValue, 1))));
    case "day:!=":
      return or(lessThan(filterAttribute, literal(dayValue)), greaterThanOrEqual(filterAttribute, literal(addDays(dayValue, 1))));
    case "day:>":
      return greaterThanOrEqual(filterAttribute, literal(addDays(dayValue, 1)));
    case "day:>=":
      return greaterThanOrEqual(filterAttribute, literal(dayValue));
    case "day:<":
      return lessThan(filterAttribute, literal(dayValue));
    case "day:<=":
      return lessThan(filterAttribute, literal(addDays(dayValue, 1)));
  }
}
function isStringExpression(expression) {
  switch (expression.type) {
    case "literal":
      return "string" === expression.valueType;
    case "attribute":
      return "String" === ensure(getAttributeTypeById(expression.attributeId));
    case "association":
      return false;
  }
}
const filterFunctionsToExpressionFunctions = { "=": "=", "!=": "!=", ">": ">", ">=": ">=", "<": "<", "<=": "<=", contains: "contains", "starts-with": "startsWith", "ends-with": "endsWith" }, nullUnsafeFilterFunctions = [">", ">=", "<", "<="];
function convertFilterExpressionToQueryFilter(filter, isDelocalizedDateExpression = false, expandEqualsEmpty = true) {
  switch (filter.type) {
    case "attribute":
      return { type: "attribute", attribute: ensure(getAttributeInfoById(filter.attributeId)).attributePath, attributeType: ensure(getAttributeTypeById(filter.attributeId)) };
    case "literal":
      return { type: "value", value: "DateTime" === filter.valueType && isDelocalizedDateExpression ? delocalizeDate(filter.value) : filter.value, isGuid: "Reference" === filter.valueType || "ReferenceSet" === filter.valueType };
    case "function":
      if (function(filter2) {
        return dayFilterFunctions.includes(filter2.name);
      }(filter))
        return convertFilterExpressionToQueryFilter(expandDayFilter(filter));
      if (expandEqualsEmpty && ("=" === (expr = filter).name && (isEmptyLiteral(expr.arg1) || isEmptyLiteral(expr.arg2))))
        return function(filter2) {
          const queryFilter = convertFilterExpressionToQueryFilter(filter2, false, false), attribute = [filter2.arg1, filter2.arg2].find(isAttributeExpression);
          if (attribute) {
            const pathElements = ensure(getAttributeInfoById(attribute.attributeId)).attributePath.split("/");
            if (1 === pathElements.length)
              return queryFilter;
            pathElements.pop();
            const expandedFilters = [queryFilter], emptyLiteral = { type: "value", value: void 0, isGuid: true };
            for (; pathElements.length; ) {
              const associationPath = pathElements.join("/");
              pathElements.splice(pathElements.length - 2, 2), expandedFilters.unshift({ type: "function", name: "=", parameters: [{ type: "association", associationPath, associationType: "Reference" }, emptyLiteral] });
            }
            return { type: "function", name: "or", parameters: expandedFilters };
          }
          return queryFilter;
        }(filter);
      const parameters = "arg" in filter ? [filter.arg] : "arg1" in filter ? [filter.arg1, filter.arg2] : filter.args, delocalizeDateLiterals = parameters.some(containsUnlocalizedDateAttribute);
      return { type: "function", name: filter.name, parameters: parameters.map((p) => convertFilterExpressionToQueryFilter(p, delocalizeDateLiterals)) };
    case "association":
      return { type: "association", associationPath: ensure(getAssociationInfoById(filter.associationId)).associationPath, associationType: ensure(getAssociationTypeById(filter.associationId)) };
  }
  var expr;
}
function containsUnlocalizedDateAttribute(expr) {
  return "attribute" === expr.type && isUnlocalizedDateAttribute(expr.attributeId);
}
function isEmptyLiteral(expr) {
  return "literal" === expr.type && void 0 === expr.value;
}

function objectListTrigger(config, initialSortOrder, store, widgetId, parameters$) {
  const [entityUpdate$, loadedCallback] = fromMxSubscription$(`Entity subscription of data source of ${widgetId}`, store, { entity: config.entity }), intervalRefresh$ = config.refreshTime ? fromTimer$(`Refresh of data source of ${widgetId}`, config.refreshTime) : fromConstant$(void 0), parentIsReady$ = getParentIsReady$(config.scope, store, widgetId), loadDelayed$ = function(widgetId2) {
    const [isDelayed$, setIsDelayed] = useValue(`Load delay of data source of ${widgetId2}`, true);
    return setTimeout(action(() => setIsDelayed(false)), 1), isDelayed$;
  }(widgetId), shouldLoad$ = fromComputation$(`Load breaker of ${widgetId}`, () => parentIsReady$.dependOn() && !loadDelayed$.dependOn()), [limit$, setLimit] = store.useSlot(widgetId, `${config.dataSourceId}/limit`), returnEmpty$ = fromComputation$(`Return empty of ${widgetId}`, () => (limit$.dependOn() ?? Number.POSITIVE_INFINITY) <= 0), previousParameters$ = getPreviousValue$(parameters$), [sortOrder$, setSortOrder] = store.useSlot(widgetId, `${config.dataSourceId}/sortOrder`), [filter$, setFilter] = store.useSlot(widgetId, `${config.dataSourceId}/filter`), [reload$, setReload] = useValue(`Reload ${widgetId}`, []);
  let fetchId = -1;
  const rawFetchTrigger$ = fromComputation$(`Load trigger of data source of ${widgetId}`, () => {
    if (entityUpdate$.dependOn(), intervalRefresh$.dependOn(), reload$.dependOn(), shouldLoad$.dependOn()) {
      const p = parameters$.dependOn();
      return "unavailable" === p.status && loadedCallback(), mapL(p, (parameters) => returnEmpty$.dependOn() ? { empty: true } : { empty: false, parameters, id: ++fetchId });
    }
    return loadedCallback(), loading();
  }), fetchTrigger$ = withFormSuspension$(store, widgetId, rawFetchTrigger$, loadedCallback), [offset$, setOffset] = store.useSlot(widgetId, `${config.dataSourceId}/offset`), retrieveParameters$ = fromMutableComputation$(`Retrieve parameters info of data source of ${widgetId}`, () => {
    const limit = limit$.dependOn();
    let offset = offset$.dependOn();
    const sortOrder = sortOrder$.dependOn(), filter = filter$.dependOn();
    if (shouldLoad$.dependOn()) {
      const previousParameter = previousParameters$.dependOn();
      void 0 === previousParameter || deepEqual(parameters$.dependOn(), previousParameter) || (offset = 0, scheduleSideEffect(() => silentlyResetOffset));
    }
    return { offset: offset ?? 0, limit: limit ?? Number.POSITIVE_INFINITY, sortOrder: sortOrder ?? initialSortOrder, filter };
  }), [needTotalCount$, setRequestTotalCount] = useValue(`Request total count of ${widgetId}`, false), silentlyResetOffset = () => retrieveParameters$.muted(() => setOffset(0));
  return { fetchTrigger$, retrieveParameters$, silentlyResetOffset, needTotalCount$, immediateRetrieveParametersSetters: getRetrieveParametersSetters(runInAction), delayedRetrieveParametersSetters: getRetrieveParametersSetters(scheduleAction), loadedCallback };
  function getRetrieveParametersSetters(scheduler) {
    return { setOffset(offset) {
      assertIsPositiveInteger(offset) && Number.isFinite(offset) && scheduler(() => setOffset(offset));
    }, setLimit(limit) {
      (void 0 === limit || assertIsPositiveInteger(limit)) && scheduler(() => setLimit(Number.isFinite(limit) ? limit : void 0));
    }, requestTotalCount(needTotalCount) {
      assertIsBoolean(needTotalCount) && scheduler(() => setRequestTotalCount(needTotalCount));
    }, setSortOrder: (sortOrder) => {
      assertIsValidSortOrder(sortOrder, config.dataSourceId) && scheduler(() => {
        equalSortInstructions(readUntracked(sortOrder$), sortOrder) || setSortOrder(sortOrder);
      });
    }, setFilter: (filter) => {
      assertValidFilterCondition(filter, config.dataSourceId) && scheduler(() => {
        equalFilterCondition(readUntracked(filter$), filter) || setFilter(filter);
      });
    }, reload: () => {
      scheduler(() => {
        setReload([]);
      });
    } };
  }
}
function withFirstLoadDoneSharing$(value$, store, widgetId, propertyPath) {
  const slotId = propertyPath ? `${widgetId}/${propertyPath}` : widgetId, [firstLoadDone$, setFirstLoadDone] = store.useSlot(slotId, "firstLoadDone");
  return withSideEffect$(`Share firstLoadDone state of ${slotId}`, value$, (value) => {
    readUntracked(firstLoadDone$) || setFirstLoadDone("loading" !== value.status);
  });
}
function asReloadableListValue$(value$) {
  return asReloadable$(value$, (oldValue) => {
    const { filter, sortOrder, offset, limit, items, totalCount, hasMoreItems } = oldValue;
    return { filter, sortOrder, offset, limit, items, totalCount, hasMoreItems };
  });
}
function withSetItemsStoreSideEffect$(widgetId, dataSourceId, listValue$, store) {
  const [, setDataSourceObjects] = store.useSlot(widgetId, `${dataSourceId}/items`);
  return withSideEffect$(`Published list value of data source: ${dataSourceId}`, listValue$, ({ status, items }) => setDataSourceObjects("available" === status ? { status, value: items } : { status }));
}

function getServerPagedList$(config, initialSort, store, widgetId, parameters$, fetchData) {
  const { fetchTrigger$, retrieveParameters$, silentlyResetOffset, needTotalCount$, immediateRetrieveParametersSetters, delayedRetrieveParametersSetters, loadedCallback } = objectListTrigger(config, initialSort, store, widgetId, parameters$), listChunk$ = fromRequest$(`Load data of ${widgetId}`, () => {
    const trigger = fetchTrigger$.dependOn();
    if ("available" !== trigger.status)
      return trigger;
    const retrieveParameters = retrieveParameters$.dependOn();
    if (trigger.value.empty)
      return available({ offset: retrieveParameters.offset, limit: 0, sortOrder: retrieveParameters.sortOrder, filter: retrieveParameters.filter, objects: [], hasMoreItems: true, parameters: void 0, triggerId: -1, requestedTotalCount: false });
    const { parameters, id: triggerId } = trigger.value, needTotalCount = needTotalCount$.dependOn(), currentChunk = readUntracked(fixedListChunk$), { sliceToKeep, pageToFetch, loadAtEnd } = function(currentList, nextQuery) {
      if ("available" !== currentList.status)
        return {};
      if (!equalSortInstructions(currentList.value.sortOrder, nextQuery.sortOrder))
        return {};
      if (!equalFilterCondition(currentList.value.filter, nextQuery.filter))
        return {};
      const [currentStart, currentEnd] = [currentList.value.offset, currentList.value.offset + currentList.value.limit], [newStart, newEnd] = [nextQuery.offset, nextQuery.offset + nextQuery.limit], [keepStart, keepEnd] = [Math.max(currentStart, newStart), Math.min(currentEnd, newEnd)];
      if (keepStart >= keepEnd)
        return {};
      if (newStart < keepStart && newEnd > keepEnd)
        return {};
      const loadAtEnd2 = newEnd > currentEnd, pageToFetch2 = { offset: loadAtEnd2 ? keepEnd : newStart, limit: newEnd - newStart - (keepEnd - keepStart) };
      return { sliceToKeep: [keepStart - currentStart, keepEnd - currentStart], loadAtEnd: loadAtEnd2, pageToFetch: pageToFetch2.limit > 0 ? pageToFetch2 : void 0 };
    }(currentChunk, retrieveParameters);
    if ("available" !== currentChunk.status || currentChunk.value.triggerId !== triggerId || needTotalCount && !currentChunk.value.requestedTotalCount || void 0 === sliceToKeep)
      return fetchData(parameters, retrieveParameters, needTotalCount).then(({ mxObjects, totalCount, hasMoreItems }) => available({ ...retrieveParameters, parameters, triggerId, objects: mxObjects, totalCount, hasMoreItems, requestedTotalCount: needTotalCount }));
    if (void 0 === pageToFetch)
      return available({ ...currentChunk.value, ...retrieveParameters, objects: currentChunk.value.objects.slice(...sliceToKeep), hasMoreItems: !!(sliceToKeep[1] && sliceToKeep[1] < currentChunk.value.objects.length) || currentChunk.value.hasMoreItems, totalCount: needTotalCount ? currentChunk.value.totalCount : void 0, requestedTotalCount: needTotalCount });
    {
      const reusedObjects = currentChunk.value.objects.slice(...sliceToKeep);
      return [currentChunk, fetchData(parameters, { ...pageToFetch, sortOrder: retrieveParameters.sortOrder, filter: retrieveParameters.filter }, needTotalCount).then(({ mxObjects, hasMoreItems, totalCount }) => available({ ...currentChunk.value, ...retrieveParameters, objects: loadAtEnd ? reusedObjects.concat(mxObjects) : mxObjects.concat(reusedObjects), hasMoreItems: loadAtEnd ? hasMoreItems : currentChunk.value.hasMoreItems, totalCount, requestedTotalCount: needTotalCount }))];
    }
  }), fixedListChunk$ = fromRequest$(`Retry to load data of ${widgetId}`, () => {
    const loadedChunk = listChunk$.dependOn();
    if ("available" !== loadedChunk.status)
      return loadedChunk;
    if (loadedChunk.value.objects.length > 0 || 0 === loadedChunk.value.offset)
      return loadedChunk;
    if (scheduleSideEffect(silentlyResetOffset), 0 === loadedChunk.value.limit)
      return available({ ...loadedChunk.value, offset: 0 });
    const { limit, sortOrder, filter } = readUntracked(retrieveParameters$), needTotalCount = readUntracked(needTotalCount$);
    return fetchData(loadedChunk.value.parameters, { limit, offset: 0, sortOrder, filter }, needTotalCount).then(({ mxObjects, totalCount, hasMoreItems }) => available({ ...loadedChunk.value, limit, sortOrder, filter, offset: 0, objects: mxObjects, totalCount, hasMoreItems }));
  }), subscribedListChunk$ = withObjectKeeping$(widgetId, store, fixedListChunk$, (listChunk) => listChunk.objects), listValue$ = fromComputation$(`Prepare data of ${widgetId}`, () => {
    const listChunk = subscribedListChunk$.dependOn();
    let result;
    if ("available" === listChunk.status) {
      const { objects, totalCount, offset, limit, hasMoreItems, sortOrder, filter } = listChunk.value;
      result = { status: "available", offset, limit, sortOrder, filter, items: objects.map((obj) => toObjectItem(obj, config.dataSourceId)), hasMoreItems, totalCount, ...delayedRetrieveParametersSetters };
    } else
      result = { status: listChunk.status, ...readUntracked(retrieveParameters$), ...immediateRetrieveParametersSetters };
    return "loading" !== result.status && store.addUpdateCallback(loadedCallback), result;
  }), storedItemsListValue$ = withSetItemsStoreSideEffect$(widgetId, config.dataSourceId, listValue$, store);
  return asReloadableListValue$(withFirstLoadDoneSharing$(storedItemsListValue$, store, widgetId));
}

const logger$2 = LogManager.get().getLogger(), OfflineDatabaseObjectListProperty = asProperty((config, store, widgetId, propertyPath) => {
  const queryArguments$ = Object.fromEntries(Object.entries(config.arguments ?? {}).map(([runtimeName, [source]]) => tuple(ensure(runtimeName.split("$")[0]), getSubscribedObjectState$(store, source)))), constraints = config.constraints, fetchParameters$ = constraints ? fromComputation$(`queryFilter for ${widgetId}/${propertyPath}`, () => {
    const queryArguments = mapValues(queryArguments$, (value$) => value$.dependOn());
    return Object.values(queryArguments).some((value) => "loading" === value.status) ? loading() : Object.values(queryArguments).some((value) => "unavailable" === value.status) && config.fetchOnlyWithAllParams ? unavailable() : available(toQueryFilter(constraints, (name) => getOrElseL(ensure(queryArguments[name]), void 0)));
  }) : fromConstant$(available(void 0));
  return getServerPagedList$(config, config.sort ? convertToSortInstructions(config.sort, config.dataSourceId) : [], store, widgetId, fetchParameters$, async function(parameter, { offset, limit, sortOrder, filter }, needTotalCount) {
    const options = { offset, ...limit !== Number.POSITIVE_INFINITY ? { amount: limit } : {}, sort: convertToSortSpecs(sortOrder) }, combinedFilter = function(filter1, filter2) {
      if (void 0 === filter2)
        return filter1;
      const queryFilter2 = convertFilterExpressionToQueryFilter(filter2);
      if (void 0 === filter1)
        return queryFilter2;
      return { type: "function", name: "and", parameters: [filter1, queryFilter2] };
    }(parameter, filter);
    logger$2.debug(`Fetching data for entity '${config.entity}' for widget ${toFriendlyId(widgetId)}`);
    const { mxObjects, count } = await offlineData().retrieve(config.entity, combinedFilter, options);
    return function(objects) {
      logger$2.debug(`Received ${objects.length} objects for widget ${toFriendlyId(widgetId)}`, "object ids:", objects.map((mxobj) => mxobj.getGuid()));
    }(mxObjects), { mxObjects, totalCount: needTotalCount ? count : void 0, hasMoreItems: offset + limit < count };
  });
});

const logger$1 = LogManager.get().getLogger(), OnlineDatabaseObjectListProperty = asProperty((config, store, widgetId, propertyPath) => getServerPagedList$(config, config.sort ? convertToSortInstructions(config.sort, config.dataSourceId) : [], store, widgetId, function(fetchOnlyWithAllParams = false) {
  const argumentValues$ = Object.entries(config.arguments ?? {}).map(([name, [source, attribute]]) => {
    const [object$] = store.useSlot(source, "object");
    return { name, value$: fromComputation$(`Subexpression ${name} in ${widgetId}/${propertyPath}`, () => mapL(flatMapL(object$.dependOn() ?? loading(), (object) => object.isUnavailable() ? unavailable() : available(object)), (object) => (dependOnSubscription({ guid: object.getGuid(), tag: widgetId }, store), void 0 === attribute ? expressionVariableToRuntimeArgument(object) : (dependOnSubscription({ guid: object.getGuid(), attr: attribute, tag: widgetId }, store), toRuntimeArgument(object, attribute))))) };
  });
  return fromComputation$(`Runtime arguments of ${widgetId}/${propertyPath}`, () => {
    const argumentValues = argumentValues$.map(({ name, value$ }) => ({ name, value: value$.dependOn() }));
    if (argumentValues.some(({ value }) => "loading" === value.status))
      return loading();
    if (argumentValues.some(({ value }) => "unavailable" === value.status) && fetchOnlyWithAllParams)
      return unavailable();
    const runtimeArguments = argumentValues.map(({ name, value }) => ({ name, value: getOrElseL(value, void 0) })).filter(({ value }) => void 0 !== value).map(({ name, value }) => tuple(name, ensure(value)));
    return available(Object.fromEntries(runtimeArguments));
  });
}(config.fetchOnlyWithAllParams), async function(args, { offset, limit, sortOrder, filter }, needTotalCount) {
  !function(runtimeArgs) {
    const friendlyId = toFriendlyId(widgetId);
    logger$1.debug(Object.values(runtimeArgs).length ? `Fetching data using XPath with arguments '${JSON.stringify(runtimeArgs)}' and operationId '${config.operationId}' for widget ${friendlyId}` : `Fetching data using XPath with operationId '${config.operationId}' for widget ${friendlyId}`);
  }(args);
  const result = await onlineData().retrieveByXPath(config.operationId, args, convertFilterConditionToXPath(filter), { offset, amount: limit, sort: convertToSortSpecs(sortOrder) }, needTotalCount);
  return function(objects) {
    logger$1.debug(`Received ${objects.length} objects for widget ${toFriendlyId(widgetId)}`, "object ids:", objects.map((mxobj) => mxobj.getGuid()));
  }(result.mxObjects), { mxObjects: result.mxObjects, hasMoreItems: result.hasMoreItems, totalCount: result.count };
}));

const DatabaseObjectListProperty = (config) => mx.isOffline(config.entity) ? OfflineDatabaseObjectListProperty(config) : OnlineDatabaseObjectListProperty(config);

const logger = LogManager.get().getLogger();
function listItemProperty(getValue$, description, dataSourceId, itemValueTemplate, legacyItems = false) {
  let reactions = {};
  const lastRequestedItems = /* @__PURE__ */ new Set(), [isUpdated, triggerUpdate] = useDependency(`Update ${description}`, () => {
    Object.values(reactions).forEach((r) => r.disposer()), reactions = {};
  });
  return [fromComputation$(`Value for ${description}`, () => {
    isUpdated.dependOn();
    const itemGetter = (item) => function(item2) {
      let returningData = true;
      lastRequestedItems.add(item2.id);
      const mxObject = fromObjectItem(item2, dataSourceId, description), currentReaction = reactions[item2.id];
      if (currentReaction && currentReaction.source !== mxObject && (currentReaction.disposer(), delete reactions[item2.id]), !(item2.id in reactions)) {
        const computedValue$ = getValue$(mxObject), entry = { source: mxObject };
        entry.disposer = reaction(() => (returningData || scheduleAction(triggerUpdate), computedValue$.dependOn()), (value) => entry.value = value, { fireImmediately: true }), reactions[item2.id] = entry;
      }
      return returningData = false, ensure(reactions[item2.id]).value;
    }(item);
    return Object.assign(legacyItems ? (item) => (logger.warn(`DEPRECATED: direct usage of ${description} as a function, use .get() instead -- will be removed in version: 10.0`), itemGetter(item)) : {}, itemValueTemplate, { get: itemGetter });
  }), function() {
    Object.entries(reactions).forEach(([key, value]) => {
      lastRequestedItems.has(key) || (value.disposer(), delete reactions[key]);
    }), lastRequestedItems.clear();
  }];
}

export { DatabaseObjectListProperty, asReloadableListValue$, convertFilterExpressionToExpression, convertSortInstructionToExpression, getCompareFunction, listItemProperty, objectListTrigger, registerSortingAttribute, withFirstLoadDoneSharing$, withSetItemsStoreSideEffect$ };
