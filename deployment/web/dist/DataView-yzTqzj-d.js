import { reactExports, ensure, jsxRuntimeExports, classNames } from './index-C0bqjiJG.js';
import { useLegacyResize, getBox } from './CD0QimeZ-DAlMyu7v.js';

const DataView = (props) => {
  const dvNode = reactExports.useRef(null), controlsNode = reactExports.useRef(null), contentNode = reactExports.useRef(null);
  return useLegacyResize(dvNode, reactExports.useCallback(function(container) {
    const content = ensure(contentNode.current);
    if (!container)
      return content.style.height = "auto", void (content.style.overflow = "");
    const parentBox = getBox(container), dataView = getBox(dvNode.current), remainder = parentBox.contentBox.height - (dataView.marginBox.height - dataView.contentBox.height) - (props.footer ? getBox(controlsNode.current).marginBox.height : 0);
    content.style.height = `${remainder}px`, content.style.overflow = "auto";
  }, [dvNode, controlsNode, contentNode]), [{ node: controlsNode, options: { childList: true, subtree: true, characterData: true } }]), jsxRuntimeExports.jsxs("div", { className: classNames("mx-dataview", props.class), style: props.style, "data-focusindex": props.tabIndex, ref: dvNode, children: [jsxRuntimeExports.jsx("div", { className: "mx-dataview-content", ref: contentNode, children: props.body }), props.emptyMessage.value && "unavailable" === props.object.status && jsxRuntimeExports.jsx("div", { className: "mx-dataview-message", children: jsxRuntimeExports.jsx("div", { children: jsxRuntimeExports.jsx("p", { children: props.emptyMessage.value }) }) }), props.footer && jsxRuntimeExports.jsx("div", { className: "mx-dataview-controls", style: props.hideFooter ? { display: "none" } : {}, ref: controlsNode, children: props.footer })] });
};

export { DataView };
