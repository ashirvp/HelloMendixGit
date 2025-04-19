import { asProperty, fromComputation$, mapL, getObjectsByPath$, isObjectItemArray, getObjectByPath$, isObjectItem, useValue, pageScope, fromComputationWithDeepEquality$, loading, available, readUntracked, deepEqual, action, getActionArguments$, asReloadable$, AssertionError, isDataSourceValid, toObjectItem } from './index-C0bqjiJG.js';
import { withFirstLoadDoneSharing$ } from './BH5qNKCa-B8rdn7Fj.js';
import { getSubmittedValue$, useValidationMessage, getServerValidation$, getValidation$, noDataAvailableError, noWriteAccessError, raiseOnChange } from './Bgp-XL0v-DfT4wqbR.js';
import './BrzhM9fk-CigoUw5u.js';
import './ActionButton-CJv0U8vt.js';

const AssociationProperty = asProperty((config, store, widgetId, propertyPath) => {
  const description = `${widgetId}/${propertyPath}`, submittedValue$ = getSubmittedValue$(config, store, widgetId, propertyPath, description), object$ = fromComputation$("Parent object of association", () => mapL(submittedValue$.dependOn(), (submittedValue) => submittedValue.object)), endPointPath = `${config.attribute}/${config.endpointEntity}`;
  switch (config.type) {
    case "Reference":
      return associationValue$(getObjectByPath$(object$, endPointPath, store), (v) => v?.id, (v) => v ? [v] : [], isObjectItem, (attrValue, availableItems) => {
        const item = availableItems.find((it) => it.id === attrValue);
        return { match: item, isFullMatch: item?.id === attrValue };
      });
    case "ReferenceSet":
      return associationValue$(getObjectsByPath$(object$, endPointPath, store), (v) => v?.map((o) => o.id) ?? [], (v) => v ?? [], isObjectItemArray, (attrValue, availableItems) => {
        const items = attrValue?.map((id) => availableItems.find((it) => it.id === id)).filter((i) => void 0 !== i);
        return { match: items ?? [], isFullMatch: items?.length === attrValue?.length };
      });
  }
  function associationValue$(refObjects$, toAttributeValue, toItemsArray, isValidType, findItems) {
    let customValidator;
    const [valueSet$, setValueSet] = useValue("Object from setValue", void 0), getValidationMessage = useValidationMessage(store, config, toAttributeValue), [dataSourceObjects$] = store.useSlot(widgetId, `${config.selectableObjectsId}/items`), [limit$] = store.useSlot(widgetId, `${config.selectableObjectsId}/limit`), [formSuspended$] = store.useSlot(pageScope, "formSuspended"), currentRefObjectItem$ = getCurrentRefObjectItem$(description, refObjects$, config);
    let availableItems = [], firstLoadDone = false;
    const currentReferencedObjects$ = fromComputationWithDeepEquality$(`Referenced object of ${description}`, () => {
      const dsObjects = dataSourceObjects$.dependOn() ?? loading(), isDataSourceLoading = "loading" === dsObjects.status;
      availableItems = "available" === dsObjects.status ? dsObjects.value : "unavailable" === dsObjects.status ? [] : availableItems, firstLoadDone || (firstLoadDone = !isDataSourceLoading);
      const value = valueSet$.dependOn(), invalidValue = invalidValue$.dependOn(), rootAssociationAttr = mapL(submittedValue$.dependOn(), (submittedValue) => submittedValue.attribute);
      if (invalidValue)
        return available(invalidValue);
      if (isDataSourceLoading && !firstLoadDone)
        return loading();
      if ("available" === rootAssociationAttr.status) {
        const attrValue = rootAssociationAttr.value, { match, isFullMatch } = findItems(attrValue, availableItems);
        if (isFullMatch)
          return available(match);
        const formSuspended = formSuspended$.dependOn();
        return !config.restrictToDataSource || isDataSourceLoading || 0 === readUntracked(limit$) || formSuspended ? value && deepEqual(toAttributeValue(value), rootAssociationAttr.value) ? available(value) : currentRefObjectItem$.dependOn() : (function(value2) {
          setTimeout(action(() => {
            "loading" === readUntracked(dataSourceObjects$).status || readUntracked(formSuspended$) || setValue(value2);
          }));
        }(match), loading());
      }
      return rootAssociationAttr;
    }), serverValidation$ = getServerValidation$(submittedValue$, config, store, description), { validation$, setValidation, invalidValue$ } = getValidation$(submittedValue$, serverValidation$, (_) => {
      const referencedObjects = readUntracked(currentReferencedObjects$);
      return "available" !== referencedObjects.status ? void 0 : referencedObjects.value;
    }, (parsed, submitted, validator) => getValidationMessage(parsed, submitted.object, validator), () => customValidator, store, widgetId, description), onChangeArguments$ = getActionArguments$(config.onChange.argMap, store, widgetId), [form$] = store.useSlot(pageScope, "form"), submittedValueWithReference$ = fromComputation$(`Readonly & Status value of ${description}`, () => "loading" === currentReferencedObjects$.dependOn().status ? loading() : submittedValue$.dependOn()), value$ = withFirstLoadDoneSharing$(fromComputation$(`Modifiable value of ${description}`, () => {
      const currentReferencedObjects = currentReferencedObjects$.dependOn(), validation = validation$.dependOn(), submittedValueWithReference = submittedValueWithReference$.dependOn(), readOnly = "available" !== submittedValueWithReference.status || submittedValueWithReference.value.readOnly, status = submittedValueWithReference.status, value = "available" !== currentReferencedObjects.status ? void 0 : currentReferencedObjects.value;
      return { status, value: Object.freeze(value), type: config.type, validation, setValue: action((newValue) => "available" !== status ? noDataAvailableError(config, widgetId) : readOnly ? noWriteAccessError(config, widgetId) : setValue(newValue)), readOnly, setValidator: (newCustomValidator) => {
        customValidator = newCustomValidator;
      } };
    }), store, widgetId, propertyPath);
    return asReloadable$(value$, (v) => ({ value: v.value }));
    function setValue(newValue) {
      const submittedValue = readUntracked(submittedValue$);
      if ("available" !== submittedValue.status)
        return void noDataAvailableError(config, widgetId);
      if (void 0 !== newValue && !isValidType(newValue))
        throw new AssertionError(`Value ${newValue} is not assignable to association of type ${config.type}.`);
      const parentObject = submittedValue.value;
      if (toItemsArray(newValue).some((o) => !isDataSourceValid(o, config.selectableObjectsId)))
        throw new AssertionError(`An ObjectItem can only be passed to an association property that belongs to the same selectable objects source. ${description}`);
      const object = parentObject.object, newValidation = getValidationMessage(newValue, object, customValidator);
      if (void 0 !== newValidation)
        setValidation(newValidation, newValue);
      else {
        const oldValue = object.get2(config.attribute), newAttrValue = toAttributeValue(newValue);
        !function(v1, v2) {
          const convert = (v) => Array.isArray(v) ? v.sort((a, b) => a.localeCompare(b)) : v;
          return deepEqual(convert(v1), convert(v2));
        }(oldValue, newAttrValue) ? (parentObject.object.set2(config.attribute, newAttrValue ?? ""), setValueSet(newValue), raiseOnChange(onChangeArguments$, form$, config.onChange, widgetId)) : setValidation(void 0, void 0);
      }
    }
  }
});
function getCurrentRefObjectItem$(description, refObjects$, config) {
  return fromComputation$(`Referenced objects of ${description}`, () => mapL(refObjects$.dependOn(), (refObjects) => Array.isArray(refObjects) ? refObjects.map((o) => toObjectItem(o, config.selectableObjectsId)) : toObjectItem(refObjects, config.selectableObjectsId)));
}

export { AssociationProperty, getCurrentRefObjectItem$ };
