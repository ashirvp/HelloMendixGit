import { reactExports, jsxRuntimeExports } from './index-C0bqjiJG.js';
import { Alert, getAriaLabelProps, getValidationAriaProps } from './TextBox-DmEjxpBn.js';

class CheckBox extends reactExports.Component {
  constructor() {
    super(...arguments), this.onChangeHandler = this.onChange.bind(this), this.onEnterHandler = this.onEnter.bind(this), this.onLeaveHandler = this.onLeave.bind(this);
  }
  onChange(e) {
    this.props.value.setValue(e.target.checked);
  }
  onEnter() {
    this.dispatchAction("onEnter");
  }
  onLeave() {
    this.dispatchAction("onLeave");
  }
  render() {
    const value = this.props.value.value, textValue = "available" === this.props.value.status && void 0 !== value ? this.props.value.formatter.format(value) : "", renderAsText = this.props.value.readOnly && "text" === this.props.readOnlyStyle;
    return jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [renderAsText ? jsxRuntimeExports.jsx("div", { className: "form-control-static", children: textValue }) : this.renderInput(), this.renderLabel(), jsxRuntimeExports.jsx(Alert, { id: `${this.props.id}-error`, validation: this.props.value.validation })] });
  }
  renderLabel() {
    return this.props.caption && jsxRuntimeExports.jsx("label", { className: "control-label", htmlFor: this.props.id, children: this.props.caption.value });
  }
  renderInput() {
    return jsxRuntimeExports.jsx("input", { type: "checkbox", id: this.props.id, tabIndex: this.props.tabIndex, onChange: this.onChangeHandler, onFocus: this.onEnterHandler, onBlur: this.onLeaveHandler, checked: this.props.value.value ?? false, disabled: this.props.value.readOnly, ...getAriaLabelProps(this.props.ariaLabel?.value), ...getValidationAriaProps(this.props.value.validation, this.props.id) });
  }
  dispatchAction(property) {
    const prop = this.props[property];
    "available" === this.props.value.status && prop && prop.execute();
  }
}

export { CheckBox };
