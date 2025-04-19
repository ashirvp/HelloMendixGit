import { getUI, getData, methodToPromise, AssertionError, getByGuid, evaluateActionExpression, toNumber, mapValues, LogManager, ensure, getSession, crash, ValidationError, handleError, onlineData, offlineData, getByGuids, translate, cancelChanges, nanoflowEngine, toNanoflowArguments, toRuntimeArguments, DescribedError, asProperty, useValue, fromComputation$, pageScope, partitionValues, getActionArguments$, attributeValueToActionArgument, action, readUntracked, runSideEffect, runInAction, subtract, assertIsNonEnumValue, getOrCrashL, filterValues, HandledError, toFriendlyId, mapL, loading, withFormSuspension$, fromRequest$, getSubscribedObject$, asDynamicValue$, toObjectItem, fromConstant$, withSideEffect$, asResult, dynAvailable, jsxRuntimeExports, reactExports, classNames, ActionContext } from './index-C0bqjiJG.js';

async function synchronize() {
  const ui = getUI(), progressId = ui.showProgress(void 0, true);
  try {
    await getData().synchronizeOffline();
  } finally {
    ui.hideProgress(progressId);
  }
}
async function getUnsavedObjects(currentForm) {
  return await methodToPromise(currentForm, "publish", "submit"), await methodToPromise(currentForm, "publish", "commit"), currentForm.getSubmitObjects();
}
async function openPage(modelerConfig, clientConfig, actionArguments) {
  const [pageParameters, parameters] = function(actionArguments2) {
    const pageParameters2 = {}, otherArguments = {};
    return Object.keys(actionArguments2).forEach((k) => {
      k.startsWith(PARAMETER_ARGUMENT_PREFIX) ? pageParameters2["$" + k.substring(PARAMETER_ARGUMENT_PREFIX.length)] = actionArguments2[k] : otherArguments[k] = actionArguments2[k];
    }), [pageParameters2, otherArguments];
  }(actionArguments);
  let pageArguments = [{}];
  for (const [name, value] of Object.entries(pageParameters))
    if (value) {
      if ("object" in value)
        pageArguments.forEach((p) => p[name] = value.object);
      else if ("objects" in value) {
        if (1 !== pageArguments.length)
          throw new AssertionError("Multiple parameters with multiple objects are not supported");
        const args = pageArguments[0];
        pageArguments = value.objects.map((o) => ({ ...args, [name]: o }));
      } else if ("id" in value) {
        const object = await getByGuid(value.id);
        pageArguments.forEach((p) => p[name] = object);
      } else if ("ids" in value)
        throw new AssertionError("Parameters with multi-selection are not supported");
    } else
      pageArguments.forEach((p) => p[name] = void 0);
  clientConfig.abortOnClientValidations && await clientConfig.currentForm.triggerValidation(), clientConfig.abortOnServerValidations && await methodToPromise(getData(), "validate", clientConfig.currentForm.getSubmitObjects());
  const formsOpened = await Promise.all(pageArguments.map(async function(args) {
    let specializedSettings;
    if (modelerConfig.specializations) {
      const object = args[modelerConfig.specializations.argument];
      specializedSettings = object ? modelerConfig.specializations.pageSettings[object.getEntity()] : void 0;
    }
    const settings = specializedSettings ?? modelerConfig, title = settings.title ? await evaluateActionExpression(settings.title, parameters) ?? "" : void 0, numberOfPagesToClose = modelerConfig.numberOfPagesToClose ? toNumber(await evaluateActionExpression(modelerConfig.numberOfPagesToClose, parameters)) : void 0, formParameters = settings.params ? mapValues(settings.params, (p) => args[p]?.getGuid()) : mapValues(args, (o) => o?.getGuid());
    return getUI().openForm2(settings.name, formParameters, title, clientConfig.currentForm, { ...settings, formParams: clientConfig.formParams }, numberOfPagesToClose);
  }));
  return pageArguments.length > 1 ? formsOpened : formsOpened[0];
}
const PARAMETER_ARGUMENT_PREFIX = "param$";
const logger$1 = LogManager.get().getLogger();
async function openLink(config, parameter) {
  const url = "addressAttribute" in config ? await methodToPromise(ensure(parameter), "fetch", config.addressAttribute) : config.address, validUrl = function(schema, url2) {
    if (null == url2)
      return void logger$1.error("Attempted to open missing link URL");
    switch (schema) {
      case "email":
        return `mailto:${escape(url2)}`;
      case "call":
        return `tel:${escape(url2)}`;
      case "text":
        return `sms:${escape(url2)}`;
      default:
        const normalizedUrl = url2.trim().toLowerCase();
        return normalizedUrl.startsWith("javascript:") || normalizedUrl.startsWith("vbscript:") || normalizedUrl.startsWith("data:") ? void logger$1.error("Attempted to open invalid link URL", url2) : url2;
    }
  }(config.schema, url);
  void 0 !== validUrl && ("web" === config.schema ? window.open(validUrl, "_blank", "noopener") : window.open(validUrl, "_self"));
}
function executeAction(action, clientConfig, actionArguments, callback, errorHandler) {
  const session = getSession();
  function getObject(args) {
    return "$object" in args && args.$object ? "object" in args.$object ? args.$object.object : crash() : void 0;
  }
  function handleError$1(e) {
    errorHandler ? errorHandler(e) : e instanceof ValidationError || handleError(e);
  }
  session.hasSomeRole(action.config.allowedRoles) ? async function() {
    switch (action.type) {
      case "callMicroflow":
        return async function(modelerConfig, clientConfig2, actionArguments2) {
          const ui = getUI(), confirmation = modelerConfig.confirmation;
          if (confirmation && !await new Promise((resolve) => ui.confirmation({ cancel: confirmation.cancel, proceed: confirmation.proceed, content: confirmation.question, handler: () => resolve(true), onCancel: () => resolve(false) })))
            return;
          if (clientConfig2.beforeExecuteAction && clientConfig2.beforeExecuteAction(), clientConfig2.abortOnClientValidations)
            switch (modelerConfig.validate) {
              case "node":
                if (!clientConfig2.widgetIsValid)
                  throw new ValidationError();
                break;
              case "view":
                await clientConfig2.currentForm.triggerValidation();
            }
          const progressId = modelerConfig.progress ? ui.showProgress(modelerConfig.progress.message, modelerConfig.progress.modal) : void 0;
          try {
            await methodToPromise(clientConfig2.currentForm, "publish", "submit");
            const validationGuids = clientConfig2.abortOnServerValidations ? clientConfig2.currentForm.getSubmitObjects().map((mxobj) => mxobj.getGuid()) : [];
            mx.isOffline() ? await offlineData().executeMicroflow(modelerConfig.operationId, toRuntimeArguments(actionArguments2), clientConfig2.currentForm, validationGuids, Boolean(modelerConfig.async)) : await onlineData().executeMicroflow(modelerConfig.operationId, toRuntimeArguments(actionArguments2), clientConfig2.currentForm, validationGuids, Boolean(modelerConfig.async));
          } finally {
            void 0 !== progressId && ui.hideProgress(progressId);
          }
        }(action.config, clientConfig, actionArguments);
      case "callNanoflow":
        return async function(modelerConfig, clientConfig2, actionArguments2) {
          clientConfig2.beforeExecuteAction && clientConfig2.beforeExecuteAction(), clientConfig2.abortOnClientValidations && await clientConfig2.currentForm.triggerValidation(), await methodToPromise(clientConfig2.currentForm, "publish", "submit"), await nanoflowEngine.execute(modelerConfig.nanoflow, await toNanoflowArguments(actionArguments2), clientConfig2.currentForm);
        }(action.config, clientConfig, actionArguments);
      case "cancelChanges":
        return cancelChanges(action.config, clientConfig);
      case "closePage":
        return async function(modelerConfig, { currentForm }, parameters) {
          const numberOfPagesToClose = modelerConfig.numberOfPagesToClose ? toNumber(await evaluateActionExpression(modelerConfig.numberOfPagesToClose, parameters)) : 1;
          if (numberOfPagesToClose < 1)
            throw new AssertionError(`The number of pages to close evaluated to ${numberOfPagesToClose}. It must be at least 1.`);
          return currentForm.closePage(numberOfPagesToClose);
        }(action.config, clientConfig, actionArguments);
      case "doNothing":
        return;
      case "openLink":
        return openLink(action.config, getObject(actionArguments));
      case "openPage":
        return openPage(action.config, clientConfig, actionArguments).then(() => {
        });
      case "saveChanges":
        return async function(config, { currentForm }) {
          await currentForm.triggerValidation(), currentForm.setSuspend(true);
          try {
            const objectsToCommit = await getUnsavedObjects(currentForm);
            mx.isOffline() ? await new Promise((resolve, reject) => {
              getData().commit({ mxobjs: objectsToCommit, callback: resolve, error: reject });
            }) : await onlineData().executeObjectAction(config.operationId, "commit", objectsToCommit);
            try {
              config.syncAutomatically && await synchronize();
            } finally {
              config.closePage && await methodToPromise(currentForm, "close");
            }
          } finally {
            currentForm.setSuspend(false);
          }
        }(action.config, clientConfig);
      case "signOut":
        return async function() {
          getSession().isGuest() || (getUI().showProgress(void 0, true), mx.logout());
        }();
      case "synchronize":
        return synchronize();
      case "deleteObject":
        return async function(config, { currentForm }, parameter) {
          let objects;
          if (parameter)
            if ("object" in parameter)
              objects = [parameter.object];
            else if ("objects" in parameter)
              objects = parameter.objects;
            else if ("id" in parameter)
              objects = await getByGuids([parameter.id]);
            else {
              if (!("ids" in parameter))
                throw new AssertionError();
              objects = await getByGuids(parameter.ids);
            }
          else
            objects = [];
          const confirmation = translate(objects.length > 1 ? "mxui.widget.DataGrid" : "mxui.sys.UI", "confirm_delete", objects.length.toString()), ui = getUI();
          if (await new Promise((resolve) => ui.confirmation({ content: confirmation, handler: () => {
            resolve(true);
          }, onCancel: () => {
            resolve(false);
          } }))) {
            currentForm.setSuspend(true);
            try {
              mx.isOffline() ? await offlineData().delete(objects) : config.operationId && await onlineData().executeObjectAction(config.operationId, "delete", objects), config.closePage && await methodToPromise(currentForm, "close");
            } finally {
              currentForm.setSuspend(false);
            }
          }
        }(action.config, clientConfig, actionArguments.$object);
      case "createObject":
        return async function(modelerConfig, clientConfig2, { $object, ...parameters }) {
          const parameter = $object ? "object" in $object ? $object.object : crash() : void 0;
          if ("association" in modelerConfig && void 0 === parameter)
            throw new AssertionError();
          const ui = getUI(), pid = ui.showProgress("", false);
          try {
            let mxObject;
            mxObject = mx.isOffline(modelerConfig.entity) ? await offlineData().create(modelerConfig.entity) : await onlineData().createObject(modelerConfig.entity, modelerConfig.operationId), modelerConfig.association && mxObject.addReference(modelerConfig.association, parameter.getGuid()), await openPage({ ...modelerConfig.pageSettings, numberOfPagesToClose: modelerConfig.numberOfPagesToClose }, clientConfig2, { [modelerConfig.objectParameter]: { object: mxObject }, ...parameters });
          } finally {
            ui.hideProgress(pid);
          }
        }(action.config, clientConfig, actionArguments);
      case "callExternalAction":
        return async function(config, { currentForm }, actionObject) {
          config.commit && await currentForm.triggerValidation(), config.closePage && currentForm.setSuspend(true);
          try {
            const confirmation = config.confirmation;
            if (confirmation && !await new Promise((resolve) => getUI().confirmation({ cancel: confirmation.cancel, proceed: confirmation.proceed, content: confirmation.question, handler: () => resolve(true), onCancel: () => resolve(false) })))
              return;
            const objectsToCommit = config.commit ? await getUnsavedObjects(currentForm) : [];
            await onlineData().executeExternalAction(config.operationId, actionObject, objectsToCommit), config.closePage && await methodToPromise(currentForm, "close");
          } finally {
            currentForm.setSuspend(false);
          }
        }(action.config, clientConfig, ensure(getObject(actionArguments)));
      default:
        throw new AssertionError();
    }
  }().then(callback, handleError$1) : session.isGuest() ? getUI().showLogin() : handleError$1(new DescribedError("Unable to execute action because you do not have sufficient permissions."));
}

const logger = LogManager.get().getLogger(), ActionProperty = asProperty((config, store, widgetId) => computeAction(config, store, widgetId));
function computeAction(config, store, widgetId, predefinedArguments, allowExecuteOnLoadingParameters) {
  const [actionsInProgress$, setActionsInProgress] = useValue(`Actions in progress for ${widgetId}`, 0), isExecuting$ = fromComputation$(`Action is executing for ${widgetId}`, () => actionsInProgress$.dependOn() > 0), [isInvalid$] = store.useSlot(widgetId, "isInvalid"), [currentForm$] = store.useSlot(pageScope, "form"), [externalArgs, setExternalArgs] = useValue(`External action parameters for ${widgetId}`, void 0), session = getSession(), hasAnyAllowedRole = session.hasSomeRole(config.action.config.allowedRoles), requiresNamedUser = config.action.config.namedUser ?? false, isAuthorized = hasAnyAllowedRole && !(requiresNamedUser && session.isGuest()), showsLoginDialog = session.isGuest() && !hasAnyAllowedRole, [pageContextArguments, deferredArguments] = partitionValues(config.action.argMap, (value) => !("expression" in value) || !Object.values(value.expression.args).some((v) => "actionvariable" === v.source)), [waitingForParameters$, setWaitingForParameters] = useValue("Waiting for action arguments", false), actionParameters$ = getActionArguments$(pageContextArguments, store, widgetId, predefinedArguments, "deleteObject" !== config.action.type), parametersStatus$ = fromComputation$(`Loadable status for parameters of action for ${widgetId}`, () => {
    const params = Object.values(actionParameters$.dependOn());
    let result = "available";
    for (const param of params) {
      if ("unavailable" === param.status)
        return "unavailable";
      "loading" === param.status && (result = "loading");
    }
    return result;
  }), canExecuteLater$ = fromComputation$(`Action for ${widgetId} can execute`, () => (isAuthorized || showsLoginDialog) && "unavailable" !== parametersStatus$.dependOn()), canExecuteNow$ = fromComputation$(`Action for ${widgetId} can execute`, () => (isAuthorized || showsLoginDialog) && "available" === parametersStatus$.dependOn()), allExternalArgs = fromComputation$("Arguments which are predefined or supplied by widget ", () => ({ ...predefinedArguments?.dependOn(), ...mapValues(externalArgs.dependOn() ?? {}, (value) => ({ actionvariable: attributeValueToActionArgument(value, "primitive") })) })), deferredActionParameters = getActionArguments$(deferredArguments, store, widgetId, allExternalArgs, "deleteObject" !== config.action.type, true), disabledDuringExecution = config.action.disabledDuringExecution;
  return fromComputation$(`Action value for ${widgetId}`, () => {
    const canExecute = allowExecuteOnLoadingParameters ? canExecuteLater$.dependOn() : canExecuteNow$.dependOn(), isExecuting = isExecuting$.dependOn() || waitingForParameters$.dependOn();
    return { isAuthorized, canExecute, isExecuting, disabledDuringExecution, execute: action((actionVariableArgs) => (allowExecuteOnLoadingParameters ? executeList : execute)(actionVariableArgs)) };
  });
  function executeList(actionVariableArgs) {
    readUntracked(waitingForParameters$) ? logger.debug(`Widget is attempting to execute a ${config.action.type} action which is already waiting for parameters.`) : (setWaitingForParameters(true), runSideEffect(parametersStatus$, (status, dispose) => {
      "available" === status ? (setWaitingForParameters(false), runInAction(() => execute(actionVariableArgs)), dispose()) : "unavailable" === status && (setWaitingForParameters(false), logger.debug(`Widget is attempting to execute a ${config.action.type} action with parameters that became unavailable`), dispose());
    }, true));
  }
  function execute(actionVariableArgs) {
    if (!readUntracked(canExecuteNow$) || disabledDuringExecution && readUntracked(isExecuting$))
      return void logger.debug(`Widget is attempting to execute a ${config.action.type} action which is not executable.`);
    !function(actionVariableArgs2, argumentTypes) {
      if (!argumentTypes || 0 === Object.keys(argumentTypes).length)
        return;
      const errorMessages = [], missingArguments = subtract(Object.keys(argumentTypes), Object.keys(actionVariableArgs2 ?? {}));
      missingArguments.length > 0 && errorMessages.push(`The action arguments are missing keys: ${missingArguments.join(", ")}.`);
      if (Object.entries(actionVariableArgs2 ?? {}).forEach(([key, value]) => {
        const type = argumentTypes[key];
        if (type)
          try {
            assertIsNonEnumValue(value, type, true, "Variable");
          } catch (error) {
            if (!(error instanceof AssertionError))
              throw error;
            errorMessages.push(error.message);
          }
        else
          errorMessages.push(`'${key}' is not a valid key for an argument.`);
      }), errorMessages.length > 0)
        throw new AssertionError(`${errorMessages.join("\n")}`);
    }(actionVariableArgs, config.argumentTypes), setExternalArgs(actionVariableArgs);
    const parameters = { ...mapValues({ ...readUntracked(actionParameters$) }, getOrCrashL), ...filterValues(mapValues({ ...readUntracked(deferredActionParameters) }, getOrCrashL), (value) => (value && "primitive" in value && void 0 !== value.primitive) ?? false) }, isInvalid = readUntracked(isInvalid$), currentForm = ensure(readUntracked(currentForm$))[0];
    setActionsInProgress(readUntracked(actionsInProgress$) + 1), executeAction(config.action, { abortOnClientValidations: !config.skipClientValidation, abortOnServerValidations: config.abortOnServerValidation ?? false, widgetIsValid: !isInvalid, currentForm }, parameters, action(() => {
      setActionsInProgress(readUntracked(actionsInProgress$) - 1);
    }), action((e) => {
      setActionsInProgress(readUntracked(actionsInProgress$) - 1), e instanceof HandledError ? handleError(e) : e instanceof ValidationError || handleError(new Error(`An error occurred while executing an action of ${toFriendlyId(widgetId)}: ${e.message}`));
    }));
  }
}

function fromObjectProperty$({ scope, dataSourceId, editable }, store, widgetId, parameters$, fetchData) {
  const shouldLoad$ = getParentIsReady$(scope, store, widgetId);
  let fetchId = -1;
  const rawFetchTrigger$ = fromComputation$(`Load trigger of data source of ${widgetId}`, () => shouldLoad$.dependOn() ? mapL(parameters$.dependOn(), (parameters) => ({ parameters, id: ++fetchId })) : loading()), fetchTrigger$ = withFormSuspension$(store, widgetId, rawFetchTrigger$), fetchResult$ = fromRequest$(`Load data of data source of ${widgetId}`, () => {
    const trigger = fetchTrigger$.dependOn();
    return "available" !== trigger.status ? trigger : fetchData(trigger.value.parameters);
  }), object$ = withObjectSharing$(getSubscribedObject$(widgetId, fetchResult$, store), store, widgetId, editable);
  return asDynamicValue$(fromComputation$(`Returned data of data source of ${widgetId}`, () => mapL(object$.dependOn(), (obj) => toObjectItem(obj, dataSourceId))));
}
function getParentIsReady$(scope, store, widgetId) {
  if (scope) {
    const [parentFirstLoadDone$] = store.useSlot(scope, "firstLoadDone");
    return fromComputation$(`Is parent ${scope} of ${widgetId} ready?`, () => Boolean(parentFirstLoadDone$.dependOn()));
  }
  return fromConstant$(true);
}
function withObjectSharing$(value$, store, widgetId, editable) {
  const [firstLoadDone$, setFirstLoadDone] = store.useSlot(widgetId, "firstLoadDone"), [, setEditableObject] = store.useSlot(widgetId, "editableObject"), [object$, setObject] = store.useSlot(widgetId, "object"), setObjectSlots = (value) => {
    editable && setEditableObject(value), setObject(value);
  };
  return withSideEffect$(`Share object of ${widgetId}`, value$, (value) => {
    if (readUntracked(firstLoadDone$) || setFirstLoadDone("loading" !== value.status), "loading" === value.status) {
      const oldState = readUntracked(object$);
      void 0 !== oldState && "unavailable" !== oldState.status || setObjectSlots(loading());
    } else
      setObjectSlots(value);
  });
}
function withFirstLoadDoneSharing$(value$, store, widgetId) {
  const [firstLoadDone$, setFirstLoadDone] = store.useSlot(widgetId, "firstLoadDone");
  return withSideEffect$(`Share first load done of ${widgetId}`, value$, (value) => {
    readUntracked(firstLoadDone$) || setFirstLoadDone("loading" !== value.status);
  });
}

const TextProperty = (config) => asResult(dynAvailable(config.value));

function Icon({ icon, altText }) {
  if (!icon)
    return null;
  switch (icon.type) {
    case "image":
      return jsxRuntimeExports.jsx("img", { src: icon.iconUrl, alt: altText ?? "" });
    case "glyph":
      return jsxRuntimeExports.jsx("span", { className: `glyphicon ${icon.iconClass}`, ...altText ? { "aria-label": altText } : { "aria-hidden": true } });
    case "icon":
      return jsxRuntimeExports.jsx("span", { className: icon.iconClass, ...altText ? { "aria-label": altText } : { "aria-hidden": true } });
  }
}

class ActionButton extends reactExports.Component {
  constructor() {
    super(...arguments), this.state = this.deriveState(this.props, { disabled: true, showDisabled: false }), this.onClickHandler = this.onClick.bind(this), this.onKeyDownHandler = this.onKeyDown.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState((curState) => this.deriveState(nextProps, curState));
  }
  componentDidMount() {
    this.actionButtonRef?.addEventListener("click", this.onClickHandler), this.context?.registerHandler(this.props.buttonId, () => {
      this.props.action && !this.state.disabled && this.props.action.execute();
    });
  }
  componentWillUnmount() {
    this.actionButtonRef?.removeEventListener("click", this.onClickHandler), window.clearTimeout(this.disableTimeout), this.context?.unregisterHandler(this.props.buttonId);
  }
  onClick(e) {
    this.suppressEvent(e), "button" === this.props.renderType && this.actionButtonRef.focus(), this.executeAction();
  }
  executeAction() {
    this.props.action && !this.state.disabled && this.props.action.execute();
  }
  onKeyDown(e) {
    "Enter" !== e.key && " " !== e.key || (this.suppressEvent(e), this.executeAction());
  }
  suppressEvent(e) {
    e.preventDefault(), this.props.action && e.stopPropagation();
  }
  render() {
    return "button" === this.props.renderType ? this.renderButton() : this.renderLink();
  }
  renderButton() {
    const ariaDisabled = this.state.showDisabled ? { "aria-disabled": true } : {};
    return jsxRuntimeExports.jsxs("button", { type: "button", className: classNames("btn", "mx-button", this.props.class, this.props.buttonClass), style: this.props.style, title: this.props.tooltip.value, "aria-label": this.getAriaLabel(), tabIndex: this.props.tabIndex, disabled: !!this.props.action && !this.props.action.canExecute, "data-button-id": this.props.buttonId, "data-disabled": this.state.disabled, ref: (e) => this.actionButtonRef = e ?? void 0, ...ariaDisabled, children: [this.renderIcon(), " ", this.props.caption.value] });
  }
  renderLink() {
    const ariaDisabled = this.state.showDisabled ? { "aria-disabled": true } : {};
    return jsxRuntimeExports.jsxs("a", { className: classNames("mx-link", this.props.class), style: this.props.style, href: "#", role: this.props.role, title: this.props.tooltip.value, "aria-label": this.getAriaLabel(), tabIndex: !this.props.action || this.props.action.canExecute ? this.props.tabIndex : -1, onKeyDown: this.onKeyDownHandler, "data-button-id": this.props.buttonId, "data-disabled": this.state.disabled, ref: (e) => this.actionButtonRef = e ?? void 0, ...ariaDisabled, children: [this.renderIcon(), " ", this.props.caption.value] });
  }
  getAriaLabel() {
    if (!this.props.caption.value && this.props.tooltip.value)
      return this.props.tooltip.value;
  }
  renderIcon() {
    return this.props.icon && jsxRuntimeExports.jsx(Icon, { icon: this.props.icon.value });
  }
  deriveState(props, state) {
    const actionValue = props.action;
    return actionValue && !actionValue.canExecute ? { disabled: true, showDisabled: true } : actionValue?.isExecuting && actionValue.disabledDuringExecution ? (void 0 === this.disableTimeout && (this.disableTimeout = window.setTimeout(() => {
      this.setState({ showDisabled: true }), this.disableTimeout = void 0;
    }, 1e3)), { disabled: true, showDisabled: state.showDisabled }) : (window.clearTimeout(this.disableTimeout), this.disableTimeout = void 0, { disabled: false, showDisabled: false });
  }
}
ActionButton.contextType = ActionContext;

export { ActionButton, ActionProperty, Icon, TextProperty, executeAction, fromObjectProperty$, getParentIsReady$ };
