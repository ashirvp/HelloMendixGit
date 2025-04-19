import { asProperty, fromConstant$, ensureAttributeId, registerAttributeType, getEntityMeta, registerFilterAttribute, LogManager, getAttribute$, fromComputation$, flatMapL, Access, toFriendlyId, unavailable, available, getOrElseL, asReloadable$, getObjectsByPath$, getObjectByPath$ } from './index-C0bqjiJG.js';
import { createUniverse, createFormatter } from './Bgp-XL0v-DfT4wqbR.js';
import { registerSortingAttribute, listItemProperty } from './BH5qNKCa-B8rdn7Fj.js';
import './ActionButton-CJv0U8vt.js';
import './BrzhM9fk-CigoUw5u.js';

const AttributeMetaDataProperty = asProperty((config) => {
  const metadata = listAttributeMetaData(config);
  return fromConstant$(metadata);
}), listAttributeMetaData = (config) => {
  const attributePath = config.path ? `${config.path}/${config.attribute}` : config.attribute, sortable = config.sortable && !(mx.isOffline() && config.path), filterable = config.filterable && !(mx.isOffline() && config.path), id = ensureAttributeId(attributePath, config.dataSourceId), type = config.attributeType, universe = createUniverse(config.entity, config.attribute), enumUniverse = "Enum" === type ? universe : void 0;
  return registerAttributeType(id, type, function(config2) {
    const entity = config2.path ? config2.path.split("/").reverse()[0] : config2.entity, isDateLocalized = getEntityMeta(entity)?.attributes[config2.attribute]?.isDateLocalized;
    return void 0 !== isDateLocalized && !isDateLocalized;
  }(config), enumUniverse), registerSortingAttribute(id, sortable), registerFilterAttribute(id, filterable), { id, sortable, filterable, type, universe, isList: config.isList };
};

const logger = LogManager.get().getLogger(), ListAttributeProperty = asProperty((config, store, widgetId, propertyPath) => {
  const metadata = listAttributeMetaData(config), defaultFormatter = createFormatter(config.entity, config.attribute, config.formatting ?? {}), description = `List attribute "${widgetId}/${propertyPath}"`;
  function attributeValue$(refObjects$, valueDescription) {
    const currentReferencedObjects$ = getAttribute$(refObjects$, config.attribute, store), value$ = fromComputation$(valueDescription, () => {
      const valueL = flatMapL(currentReferencedObjects$.dependOn(), (attribute) => attribute.access === Access.None ? (function(config2, widgetId2) {
        logger.debug(`No access to attribute "${config2.attribute}" of entity "${config2.entity}" in widget ${toFriendlyId(widgetId2)}.`);
      }(config, widgetId), unavailable()) : available(attribute.value)), value = getOrElseL(valueL, void 0), displayValue = value instanceof Array && config.isList ? value.map((v) => defaultFormatter.format(v)).join(", ") : defaultFormatter.format(value);
      return { status: valueL.status, value, displayValue, formatter: defaultFormatter, readOnly: true, setFormatter: () => unsupportedOperationError("setFormatter", widgetId), setValue: () => unsupportedOperationError("setValue", widgetId), setTextValue: () => unsupportedOperationError("setTextValue", widgetId), validation: void 0, setValidator: () => unsupportedOperationError("setValidator", widgetId), isList: config.isList };
    });
    return asReloadable$(value$, ({ value, displayValue }) => ({ value, displayValue }));
  }
  return listItemProperty(function(object) {
    const rootObject$ = fromConstant$(available(object)), valueDescription = `${description} for object ${object.getGuid()}`;
    return config.isList ? attributeValue$(getObjectsByPath$(rootObject$, config.path, store), valueDescription) : attributeValue$(config.path ? getObjectByPath$(rootObject$, config.path, store) : rootObject$, valueDescription);
  }, description, config.dataSourceId, { ...metadata, formatter: defaultFormatter });
});
function unsupportedOperationError(functionName, widgetId) {
  throw new Error(`Widget ${toFriendlyId(widgetId)} is attempting to call "${functionName}". This operation is not yet supported on attributes linked to a datasource.`);
}

export { ListAttributeProperty };
