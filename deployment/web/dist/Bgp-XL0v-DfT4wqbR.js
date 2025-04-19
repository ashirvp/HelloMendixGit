import { FormatterType, formatDate, parseDate, getDateFormatPlaceholder, translateEnumeration, formatNumber, parseNumber, getAttributeType, getAttributeEnumerationType, ensure, formatValue, translate, mapValues, isStoreVariableSource, crash, readUntracked, attributeToClientValue, validate, validation, evaluateFormExpression, useValue, pageScope, getPreviousValue$, withSideEffect$, fromComputation$, handleError, toFriendlyId, dependOnSubscription, LogManager, asProperty, asReloadable$, getActionArguments$, action, assertIsAttributeValue, comparer, getOrElseL, ValidationError, getSubscribedObjectState$, getObjectsByPath$, getAttribute$, flatMapL, Access, unavailable, available, getFormExpressionResultFromStore$, fromConstant$, getObjectByPath$, mapL, getOrCrashL, getEnumerationOptions } from './index-C0bqjiJG.js';
import { executeAction } from './ActionButton-CJv0U8vt.js';
import { runActionInComputed } from './BrzhM9fk-CigoUw5u.js';

class DefaultDateTimeFormatter {
  constructor(config) {
    this.config = config, this.type = FormatterType.DateTime;
  }
  format(value) {
    return !value || isNaN(value.getTime()) ? "" : formatDate(value, this.config);
  }
  parse(value, fallbackDate) {
    if ("" === value)
      return { valid: true, value: void 0 };
    const result = parseDate(value, this.config, fallbackDate);
    return void 0 === result ? { valid: false } : { valid: true, value: result };
  }
  getFormatPlaceholder() {
    return getDateFormatPlaceholder(this.config);
  }
  withConfig(config) {
    return new DefaultDateTimeFormatter(config);
  }
}

class DefaultEnumFormatter {
  constructor(enumeration) {
    this.enumeration = enumeration;
  }
  format(value) {
    return value ? translateEnumeration(this.enumeration, value) : "";
  }
  parse(_value) {
    throw new Error("Enumeration values cannot be parsed");
  }
}
class DefaultNumberFormatter {
  constructor(config) {
    this.config = config, this.type = FormatterType.Number;
  }
  format(value) {
    return value ? formatNumber(value, this.config.groupDigits, this.config.decimalPrecision) : "";
  }
  parse(inputValue) {
    if ("" === inputValue)
      return { valid: true, value: void 0 };
    const result = parseNumber(inputValue, this.config.decimalPrecision);
    return void 0 === result ? { valid: false } : { valid: true, value: result };
  }
  withConfig(config) {
    return new DefaultNumberFormatter(config);
  }
}
const createFormatter = (entity, attribute, config) => createFormatterByType(getAttributeType(entity, attribute), () => getAttributeEnumerationType(entity, attribute), config);
function createFormatterByType(attributeType, getEnumerationType, config = {}) {
  return void 0 === attributeType ? /* @__PURE__ */ function() {
    const formatter = { format: (value) => void 0 === value ? "" : String(value), parse: (inputValue) => ({ valid: true, value: inputValue }), withConfig: () => formatter, getFormatPlaceholder: () => {
    } };
    return formatter;
  }() : "Enum" === attributeType ? new DefaultEnumFormatter(ensure(getEnumerationType())) : createNonEnumFormatter(attributeType, config);
}
function createNonEnumFormatter(attributeType, config) {
  switch (attributeType) {
    case "DateTime":
      return new DefaultDateTimeFormatter(config.dateFormat ?? { type: "date" });
    case "Integer":
    case "Long":
    case "Decimal":
      return new DefaultNumberFormatter(config.numberFormat ?? { groupDigits: false });
    default:
      return /* @__PURE__ */ function(attributeType2) {
        const formatter = { format: (value) => formatValue(value, attributeType2), parse: (inputValue) => {
          const value = function(value2, type) {
            switch (type) {
              case "Decimal":
              case "Integer":
              case "Long":
                return parseNumber(value2);
              case "DateTime":
                return parseDate(value2);
              case "Boolean":
                return value2 === translate("mxui.common", "true");
              default:
                return value2;
            }
          }(inputValue, attributeType2);
          return void 0 !== value ? { valid: true, value } : { valid: false };
        }, withConfig: () => formatter, getFormatPlaceholder: () => {
        } };
        return formatter;
      }(attributeType);
  }
}

function useParsingValidationMessagePrimitive(store, config) {
  const args = useValidationArguments(store, config.validation);
  return (value, customValidator) => "unparsed" === value.state ? getInvalidInputMessage(value.value, "localvariable", config.type) : validateValue(value.value, value.value, config.type, customValidator, config.validation, args);
}
function useValidationMessage(store, config, transform) {
  const args = useValidationArguments(store, config.validation);
  return (value, object, customValidator) => {
    const attributeType = object.getAttributeType(config.attribute);
    return validateValue(value, transform(value), attributeType, customValidator, config.validation, args);
  };
}
function useValidationArguments(store, validationConfig) {
  return validationConfig ? mapValues(validationConfig.expression.args, (arg) => {
    isStoreVariableSource(arg) || crash();
    const [arg$] = store.useSlot(arg.widget, arg.source);
    return () => {
      const argValue = readUntracked(arg$);
      return argValue && "object" == typeof argValue && "status" in argValue ? "available" === argValue.status ? argValue.value : void 0 : argValue;
    };
  }) : {};
}
function validateValue(value, attributeValue, attributeType, customValidator, validationConfig, args) {
  return function(value2, type) {
    const clientValue = attributeToClientValue(value2), validationResult = validate(clientValue, type);
    if (validationResult === validation.OK)
      return;
    return translate("mendix.lib.Validations", ensure(validationCodeMap[validationResult]));
  }(attributeValue, attributeType) ?? (customValidator ? customValidator(value) : void 0) ?? (validationConfig ? function(value2, type, args2, validationConfig2) {
    const isValid = evaluateFormExpression(validationConfig2.expression, { ...args2, value: () => {
      switch (type) {
        case "ObjectReference":
        default:
          return value2;
        case "ObjectReferenceSet":
          return crash();
      }
    } });
    if (!isValid)
      return validationConfig2.message || translate("mendix.lib.Validations", "required_field");
    return;
  }(attributeValue, attributeType, args, validationConfig) : void 0);
}
const validationCodeMap = { [validation.NOT_INTEGER]: "invalid_number", [validation.RANGE_INTEGER]: "range_integer", [validation.RANGE_LONG]: "range_long", [validation.RANGE_DECIMAL]: "range_decimal" };
function getInvalidInputMessage(value, attribute, type) {
  switch (type) {
    case "Enum":
    case "Boolean":
    case "ObjectReference":
    case "ObjectReferenceSet":
      return translate("mendix.lib.Validations", "invalid_attribute", value, attribute);
    case "DateTime":
      return translate("mendix.lib.Validations", "invalid_date");
    case "Integer":
    case "Long":
    case "Decimal":
      return translate("mendix.lib.Validations", "invalid_number");
    default:
      throw new Error(`Attribute type ${type} is not supported.`);
  }
}
function getValidation$(submittedValue$, serverValidation$, getValidValue, getValidationMessage, getCustomValidator, store, widgetId, description) {
  const [invalidValue$, setInvalidValue] = useValue(`Invalid value of ${description}`, void 0), [validationRequest$] = store.useSlot(pageScope, "validationRequest"), [localValidation$, setLocalValidation] = useValue(`Local value validation of ${description}`, void 0), previousValidationRequest$ = getPreviousValue$(validationRequest$), previousSubmittedValue$ = getPreviousValue$(submittedValue$), previousServerValidation$ = getPreviousValue$(serverValidation$), [, setIsInvalid] = store.useSlot(widgetId, "isInvalid"), validation$ = withSideEffect$(`Published validation of ${description}`, fromComputation$(`Validation of ${description}`, () => {
    const submittedValue = submittedValue$.dependOn(), previousSubmittedValue = previousSubmittedValue$.dependOn(), serverValidation = serverValidation$.dependOn(), previousServerValidation = previousServerValidation$.dependOn(), validationRequest = validationRequest$.dependOn(), previousValidationRequest = previousValidationRequest$.dependOn(), localValidation = localValidation$.dependOn();
    if (submittedValue === previousSubmittedValue)
      return serverValidation !== previousServerValidation ? serverValidation[0] : validationRequest !== previousValidationRequest ? function() {
        const value = readUntracked(submittedValue$);
        if ("available" !== value.status)
          return;
        const currentValue = readUntracked(invalidValue$) ?? getValidValue(value.value);
        try {
          return getValidationMessage(currentValue, value.value, getCustomValidator());
        } catch (e) {
          return void function(widgetId2, e2) {
            handleError(new Error(`An error occurred while validating current value in ${toFriendlyId(widgetId2)}: ${e2 instanceof Error ? e2.message : e2}`));
          }(widgetId, e);
        }
      }() : localValidation;
  }), (validationResult) => setIsInvalid(void 0 !== validationResult));
  return { validation$, invalidValue$, setValidation: function(localValidation, invalidValue) {
    setLocalValidation(localValidation), setInvalidValue(invalidValue);
  } };
}
function getServerValidation$(submittedValue$, config, store, description) {
  return fromComputation$(`Server validation of ${description}`, () => {
    const submittedValue = submittedValue$.dependOn();
    return "available" !== submittedValue.status ? [void 0] : dependOnSubscription({ guid: submittedValue.value.object.getGuid(), attr: config.attribute, val: true, tag: `Validation of ${description}` }, store);
  });
}
const logger = LogManager.get().getLogger(), AttributeProperty = asProperty((config, store, widgetId, propertyPath) => {
  const description = `${widgetId}/${propertyPath}`, defaultFormatter = createFormatter(config.entity, config.attribute, config.formatting ?? {}), universe = createUniverse(config.entity, config.attribute), [formatter$, setFormatter] = useValue(`Formatter for ${description}`, defaultFormatter);
  if (config.isList)
    return asReloadable$(editableListValue$(config, store, widgetId, description, formatter$, setFormatter, defaultFormatter, universe), (v) => ({ value: v.value, displayValue: v.displayValue }));
  let customValidator;
  const submittedValue$ = getSubmittedValue$(config, store, widgetId, propertyPath, description), previousSubmittedValue$ = getPreviousValue$(submittedValue$), serverValidation$ = getServerValidation$(submittedValue$, config, store, description), getValidationMessage = function(store2, config2) {
    const args = useValidationArguments(store2, config2.validation);
    return (value, object, customValidator2) => {
      const attributeType = object.getAttributeType(config2.attribute);
      return "unparsed" === value.state ? getInvalidInputMessage(value.value, config2.attribute, attributeType) : validateValue(value.value, value.value, attributeType, customValidator2, config2.validation, args);
    };
  }(store, config), { validation$, invalidValue$, setValidation } = getValidation$(submittedValue$, serverValidation$, (value) => ({ state: "parsed", value: value.attribute }), (parsed, submitted, validator) => getValidationMessage(parsed, submitted.object, validator), () => customValidator, store, widgetId, description), onChangeArguments$ = getActionArguments$(config.onChange.argMap, store, widgetId), [form$] = store.useSlot(pageScope, "form"), value$ = fromComputation$(`Editable value of ${description}`, () => {
    const submittedValue = submittedValue$.dependOn();
    previousSubmittedValue$.dependOn() !== submittedValue && runActionInComputed(() => {
      setValidation(void 0, void 0);
    });
    const validation2 = validation$.dependOn(), invalidValue = invalidValue$.dependOn(), formatter = formatter$.dependOn(), value = "available" !== submittedValue.status || void 0 !== invalidValue && "unparsed" === invalidValue.state ? void 0 : void 0 !== invalidValue ? invalidValue.value : submittedValue.value.attribute, displayValue = "available" !== submittedValue.status ? "" : void 0 !== invalidValue && "unparsed" === invalidValue.state ? invalidValue.value : formatter.format(void 0 !== invalidValue ? invalidValue.value : submittedValue.value.attribute);
    return { status: submittedValue.status, value, displayValue, readOnly: "available" !== submittedValue.status || submittedValue.value.readOnly, validation: validation2, formatter, universe, isList: false, setValidator: (newCustomValidator) => {
      customValidator = newCustomValidator;
    }, setValue: action((newValue) => "available" !== submittedValue.status ? noDataAvailableError(config, widgetId) : submittedValue.value.readOnly ? noWriteAccessError(config, widgetId) : setValue({ state: "parsed", value: newValue }, submittedValue.value)), setTextValue: action((newValue) => "available" !== submittedValue.status ? noDataAvailableError(config, widgetId) : submittedValue.value.readOnly ? noWriteAccessError(config, widgetId) : setValue({ state: "unparsed", value: newValue }, submittedValue.value)), setFormatter: action((f) => setFormatter(f ?? defaultFormatter)) };
  });
  return asReloadable$(value$, (v) => ({ value: v.value, displayValue: v.displayValue }));
  function setValue(newValue, newSubmittedValue) {
    if ("unparsed" === newValue.state) {
      const currentValue = newSubmittedValue.attribute, formatterInstance = readUntracked(formatter$), parseResult = formatterInstance.type === FormatterType.DateTime && currentValue instanceof Date ? formatterInstance.parse(newValue.value, currentValue) : formatterInstance.parse(newValue.value);
      newValue = parseResult.valid ? { state: "parsed", value: parseResult.value } : newValue;
    } else
      assertIsAttributeValue(newValue.value, config.entity, config.attribute);
    try {
      const object = newSubmittedValue.object, newValidation = getValidationMessage(newValue, object, customValidator);
      if (void 0 !== newValidation)
        setValidation(newValidation, newValue);
      else {
        const oldValue = object.get2(config.attribute);
        comparer.structural(oldValue, newValue.value) ? setValidation(void 0, void 0) : (object.set2(config.attribute, newValue.value), raiseOnChange(onChangeArguments$, form$, config.onChange, widgetId));
      }
    } catch (e) {
      onNewValueValidationError(widgetId, e);
    }
  }
});
function raiseOnChange(onChangeArguments$, form$, onChange, widgetId) {
  const parameters = readUntracked(onChangeArguments$), currentForm = ensure(readUntracked(form$))[0];
  setTimeout(() => {
    executeAction(onChange, { abortOnClientValidations: true, abortOnServerValidations: false, widgetIsValid: true, currentForm }, mapValues(parameters, (v) => getOrElseL(v, void 0)), void 0, (e) => function(widgetId2, e2) {
      e2 instanceof ValidationError || handleError(new Error(`An error occurred while executing On change at ${toFriendlyId(widgetId2)}: ${e2.message}`));
    }(widgetId, e));
  }, 0);
}
function editableListValue$(config, store, widgetId, description, formatter$, setFormatter, defaultFormatter, universe) {
  const rootObject$ = getSubscribedObjectState$(store, config.scope), objects$ = getObjectsByPath$(rootObject$, config.path, store), attributes$ = getAttribute$(objects$, config.attribute, store);
  return fromComputation$(`Editable list value of ${description}`, () => {
    const valueL = flatMapL(attributes$.dependOn(), (attributes) => attributes.access === Access.None ? (noAccessToAttributeError(config, widgetId), unavailable()) : available(attributes.value)), value = getOrElseL(valueL, []), formatter = formatter$.dependOn(), displayValue = value.map((v) => formatter.format(v)).join(", ");
    return { status: valueL.status, value, displayValue, readOnly: true, validation: void 0, formatter, universe, isList: true, setValidator: () => unsupportedRefSetOperationError("setValidator", widgetId), setValue: () => unsupportedRefSetOperationError("setValue", widgetId), setTextValue: () => unsupportedRefSetOperationError("setTextValue", widgetId), setFormatter: action((f) => setFormatter(f ?? defaultFormatter)) };
  });
}
function getSubmittedValue$(config, store, widgetId, propertyPath, description) {
  const [subtreeReadonly$] = store.useSlot(pageScope, "subtreeReadonly"), isEditable$ = config.isEditable ? getFormExpressionResultFromStore$(`Conditional editability of ${toFriendlyId(widgetId)}`, config.isEditable, store) : fromConstant$(available(true)), rootObject$ = getSubscribedObjectState$(store, config.scope), object$ = config.path ? getObjectByPath$(rootObject$, config.path, store) : rootObject$, attribute$ = getAttribute$(object$, config.attribute, store), submittedValue$ = fromComputation$(`Submitted value of ${description}`, () => {
    const readOnlyState = subtreeReadonly$.dependOn() ?? false, mxObject = object$.dependOn();
    return flatMapL(attribute$.dependOn(), (attribute) => attribute.access === Access.None ? (noAccessToAttributeError(config, widgetId), unavailable()) : mapL(isEditable$.dependOn(), (isEditable) => ({ object: getOrCrashL(mxObject), attribute: attribute.value, readOnly: attribute.access === Access.Read || readOnlyState || !isEditable })));
  }), [, setEditedObject] = store.useSlot(`${widgetId}.${propertyPath}`, "editableObject");
  return withSideEffect$(`Published editable object of ${description}`, submittedValue$, (submittedValue) => setEditedObject(flatMapL(submittedValue, (sv) => sv.readOnly ? unavailable() : available(sv.object))));
}
function createUniverse(entity, attribute) {
  switch (getAttributeType(entity, attribute)) {
    case "Enum":
      return getEnumerationOptions(getAttributeEnumerationType(entity, attribute));
    case "Boolean":
      return [true, false];
    default:
      return;
  }
}
function noDataAvailableError(config, widgetId) {
  logger.debug(`Widget ${toFriendlyId(widgetId)} is attempting to change the value of attribute "${config.attribute}" of entity "${config.entity}" which is not available.`);
}
function noWriteAccessError(config, widgetId) {
  logger.debug(`Widget ${toFriendlyId(widgetId)} is attempting to change the value of attribute "${config.attribute}" of entity "${config.entity}" which is not writable.`);
}
function noAccessToAttributeError(config, widgetId) {
  logger.debug(`No access to attribute "${config.attribute}" of entity "${config.entity}" in widget ${toFriendlyId(widgetId)}.`);
}
function onNewValueValidationError(widgetId, e) {
  handleError(new Error(`An error occurred while validating new value set by ${toFriendlyId(widgetId)}: ${e instanceof Error ? e.message : e}`));
}
function unsupportedRefSetOperationError(functionName, widgetId) {
  throw new Error(`Widget ${toFriendlyId(widgetId)} is attempting to call "${functionName}". This operation is not supported on attribute property with reference sets.`);
}

export { AttributeProperty, createFormatter, createUniverse, getServerValidation$, getSubmittedValue$, getValidation$, noDataAvailableError, noWriteAccessError, raiseOnChange, useValidationMessage };
