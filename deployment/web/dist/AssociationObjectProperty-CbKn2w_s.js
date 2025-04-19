import { LogManager, asProperty, getSubscribedObjectState$, ensure, toFriendlyId, getObjectByPath$, available, MxObject, getOrCrashL, readUntracked, onlineData, unavailable } from './index-C0bqjiJG.js';
import { fromObjectProperty$ } from './ActionButton-CJv0U8vt.js';

const logger = LogManager.get().getLogger(), AssociationObjectProperty = asProperty((config, store, widgetId) => {
  const rootObject$ = getSubscribedObjectState$(store, ensure(config.scope)), friendlyId = toFriendlyId(widgetId);
  return !config.path || mx.isOffline() ? fromObjectProperty$(config, store, widgetId, config.path ? getObjectByPath$(rootObject$, config.path, store) : rootObject$, (p) => (logUsingObject(p), available(p))) : fromObjectProperty$(config, store, widgetId, getObjectByPath$(rootObject$, config.path, store, true), (parameters) => {
    if (parameters instanceof MxObject)
      return logUsingObject(parameters), available(parameters);
    const contextGuid = getOrCrashL(readUntracked(rootObject$)).getGuid();
    return function(contextGuid2) {
      logger.debug(`Fetching object with context object '${contextGuid2}' and operationId '${config.operationId}' for widget ${friendlyId}`);
    }(contextGuid), onlineData().retrieveByPath(contextGuid, ensure(config.operationId)).then(({ mxObjects, extra }) => {
      const mxObject = mxObjects.length ? mxObjects[0] : void 0;
      return function(mxObject2, extra2) {
        const guid = mxObject2?.getGuid();
        logger.debug(guid ? `Received object '${guid}' and ${extra2.length} objects over schema for widget ${friendlyId}` : `Received no object for widget ${friendlyId}`, "extra ids:", extra2.map((o) => o.getGuid()));
      }(mxObject, extra), mxObject ? available(mxObject) : unavailable();
    });
  });
  function logUsingObject(mxObject) {
    logger.debug(`Using object '${mxObject.getGuid()}' for widget ${friendlyId}`);
  }
});

export { AssociationObjectProperty };
