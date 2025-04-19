import { reactExports, jsxRuntimeExports, asProperty, pageScope, fromComputation$, ensure, asDynamicValue$, getFormExpressionResultFromStore$, toFriendlyId, classNames, newId } from './index-C0bqjiJG.js';

function PageFragment({ renderKey: key, children }) {
  const [previousKey, setKey] = reactExports.useState(key);
  return reactExports.useEffect(() => setKey(key), [key]), key !== previousKey ? null : jsxRuntimeExports.jsx(reactExports.Fragment, { children });
}

const ExpressionProperty = asProperty((config, store, widgetId) => {
  const [form$] = store.useSlot(pageScope, "form"), pageTitle$ = fromComputation$(`Form page title of ${widgetId}`, () => ensure(form$.dependOn())[0].getTitle());
  return asDynamicValue$(getFormExpressionResultFromStore$(`Value of ${toFriendlyId(widgetId)}`, config.expression, store, { pageTitle: pageTitle$ }));
});

const Placeholder = (props) => jsxRuntimeExports.jsx("div", { className: "mx-placeholder", children: props.content });

const ScrollContainerRegion = reactExports.forwardRef((props, ref) => jsxRuntimeExports.jsx("div", { className: classNames(`mx-scrollcontainer-${props.name}`, props.class, { "mx-scrollcontainer-toggleable": props.canToggle }), style: { ...props.style, ...props.size ? { "--sidebar-size": props.size } : {} }, ref, children: jsxRuntimeExports.jsx("div", { className: classNames("mx-scrollcontainer-wrapper", { "mx-scrollcontainer-nested": props.hasNestedScrollContainer }), children: props.children }) }));

function ScrollContainer(props) {
  const uniqueId = reactExports.useMemo(() => newId("scrollcontainer"), []);
  if (!props.top.enabled && !props.bottom.enabled)
    return jsxRuntimeExports.jsx(HorizontalContainer, { ...props, containerType: ContainerType.Standalone, containerId: uniqueId });
  return !props.left.enabled && !props.right.enabled ? jsxRuntimeExports.jsx(VerticalContainer, { ...props, containerType: ContainerType.Standalone }) : "headline" === props.layoutMode ? jsxRuntimeExports.jsx(VerticalContainer, { ...props, containerType: ContainerType.Outer, containerId: uniqueId, children: jsxRuntimeExports.jsx(HorizontalContainer, { ...props, containerType: ContainerType.Inner, containerId: uniqueId }) }) : jsxRuntimeExports.jsx(HorizontalContainer, { ...props, containerType: ContainerType.Outer, containerId: uniqueId, children: jsxRuntimeExports.jsx(VerticalContainer, { ...props, containerType: ContainerType.Inner }) });
}
function getRegionSize(props) {
  if (!props.enabled)
    throw new Error("Region is not enabled");
  return "auto" === props.sizeMode ? "min-content" : `${props.sizeValue}${"percentage" === props.sizeMode ? "%" : "px"}`;
}
var ContainerType;
function HorizontalContainer(props) {
  const [toggleMode, isSidebarOpenInitially, toggleableSidebarSize] = (left = props.left, right = props.right, left.enabled && "none" !== left.toggleMode ? [left.toggleMode, left.initiallyOpen, getRegionSize(left)] : right.enabled && "none" !== right.toggleMode ? [right.toggleMode, right.initiallyOpen, getRegionSize(right)] : ["none", false, "0px"]);
  var left, right;
  const [isSidebarOpen, setSidebarOpen] = reactExports.useState(isSidebarOpenInitially), sidebarRef = reactExports.useRef(null), onClick = reactExports.useCallback((e) => {
    isSidebarOpen && (sidebarRef.current?.contains(e.target) || setSidebarOpen(false));
  }, [isSidebarOpen]);
  return reactExports.useEffect(() => {
    if ("none" !== toggleMode)
      return window.__mx_ScrollContainer_SidebarToggle || (window.__mx_ScrollContainer_SidebarToggle = {}), window.__mx_ScrollContainer_SidebarToggle[props.containerId] = () => setSidebarOpen((isOpen) => !isOpen), () => {
        delete window.__mx_ScrollContainer_SidebarToggle[props.containerId];
      };
  }, []), jsxRuntimeExports.jsxs("div", { className: classNames("mx-scrollcontainer", "mx-scrollcontainer-horizontal", { "mx-scrollcontainer-fixed": props.scrollPerRegion, "mx-scrollcontainer-open": isSidebarOpen, [`mx-scrollcontainer-${toggleMode}`]: "none" !== toggleMode }, props.containerType !== ContainerType.Inner ? props.class : void 0), style: { ...props.containerType !== ContainerType.Inner ? props.style : void 0, "--toggleable-sidebar-width": toggleableSidebarSize }, onClick: "slide" === toggleMode || "push" === toggleMode ? onClick : void 0, "data-scrollcontainer-id": props.containerType !== ContainerType.Inner ? props.containerId : void 0, children: [props.left.enabled && jsxRuntimeExports.jsx(ScrollContainerRegion, { name: "left", class: props.left.class, style: props.left.style, size: getRegionSize(props.left), canToggle: "none" !== props.left.toggleMode, ref: "none" !== props.left.toggleMode ? sidebarRef : void 0, children: props.left.content }), jsxRuntimeExports.jsx(ScrollContainerRegion, { name: "center", hasNestedScrollContainer: props.containerType === ContainerType.Outer, class: props.containerType !== ContainerType.Outer ? props.center.class : void 0, style: props.containerType !== ContainerType.Outer ? props.center.style : void 0, children: props.children ?? props.center.content }), props.right.enabled && jsxRuntimeExports.jsx(ScrollContainerRegion, { name: "right", class: props.right.class, style: props.right.style, size: getRegionSize(props.right), canToggle: "none" !== props.right.toggleMode, ref: "none" !== props.right.toggleMode ? sidebarRef : void 0, children: props.right.content })] });
}
function VerticalContainer(props) {
  return jsxRuntimeExports.jsxs("div", { className: classNames("mx-scrollcontainer", "mx-scrollcontainer-vertical", { "mx-scrollcontainer-fixed": props.scrollPerRegion }, props.containerType !== ContainerType.Inner ? props.class : void 0), style: { ...props.containerType !== ContainerType.Inner ? props.style : void 0 }, "data-scrollcontainer-id": props.containerId, children: [props.top.enabled && jsxRuntimeExports.jsx(ScrollContainerRegion, { name: "top", class: props.top.class, style: props.top.style, size: getRegionSize(props.top), children: props.top.content }), jsxRuntimeExports.jsx(ScrollContainerRegion, { name: "middle", hasNestedScrollContainer: props.containerType === ContainerType.Outer, class: props.containerType !== ContainerType.Outer ? props.center.class : void 0, style: props.containerType !== ContainerType.Outer ? props.center.style : void 0, children: props.children ?? props.center.content }), props.bottom.enabled && jsxRuntimeExports.jsx(ScrollContainerRegion, { name: "bottom", class: props.bottom.class, style: props.bottom.style, size: getRegionSize(props.bottom), children: props.bottom.content })] });
}
!function(ContainerType2) {
  ContainerType2[ContainerType2.Standalone = 0] = "Standalone", ContainerType2[ContainerType2.Outer = 1] = "Outer", ContainerType2[ContainerType2.Inner = 2] = "Inner";
}(ContainerType || (ContainerType = {}));

export { ExpressionProperty, PageFragment, Placeholder, ScrollContainer };
