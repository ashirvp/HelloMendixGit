import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectProperty } from "mendix/AssociationObjectProperty";
import { AttributeProperty } from "mendix/AttributeProperty";
import { DerivedUniqueIdProperty } from "mendix/DerivedUniqueIdProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { TextProperty } from "mendix/TextProperty";
import { ValidationProperty } from "mendix/ValidationProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { DataView } from "mendix/widgets/web/DataView";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $DataView, $FormGroup, $TextBox, $ActionButton } = asPluginWidgets({ DataView, FormGroup, TextBox, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$DataView key="p7.Administration.ChangePasswordForm.dataView2"
        $widgetId="p7.Administration.ChangePasswordForm.dataView2"
        class={"mx-name-dataView2 form-horizontal"}
        style={undefined}
        tabIndex={undefined}
        object={AssociationObjectProperty({
            "dataSourceId": "p7.6",
            "scope": "$AccountPasswordData",
            "editable": true
        })}
        emptyMessage={TextProperty({
            "value": t([
                ""
            ])
        })}
        body={[
            <$FormGroup key="p7.Administration.ChangePasswordForm.textBox3$formGroup"
                $widgetId="p7.Administration.ChangePasswordForm.textBox3$formGroup"
                class={"mx-name-textBox3 mx-textbox"}
                style={undefined}
                control={[
                    <$TextBox key="p7.Administration.ChangePasswordForm.textBox3"
                        $widgetId="p7.Administration.ChangePasswordForm.textBox3"
                        inputValue={AttributeProperty({
                            "scope": "p7.Administration.ChangePasswordForm.dataView2",
                            "path": "",
                            "entity": "Administration.AccountPasswordData",
                            "attribute": "NewPassword",
                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                            "isList": false,
                            "validation": { "message": t([ "The password cannot be empty." ]), "expression": { "expr": { "type": "function", "name": "!=", "parameters": [ { "type": "variable", "variable": "value" }, { "type": "literal", "value": null } ] }, "args": {} } },
                            "formatting": { }
                        })}
                        isPassword={true}
                        placeholder={t([
                            ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                            })
                        ])}
                        mask={""}
                        readOnlyStyle={"text"}
                        maxLength={200}
                        onEnter={undefined}
                        onLeave={undefined}
                        onEnterKeyPress={undefined}
                        ariaLabel={undefined}
                        autocomplete={"on"}
                        submitWhileEditing={false}
                        submitDelay={300}
                        ariaRequired={true}
                        tabIndex={undefined}
                        id={DerivedUniqueIdProperty({
                            "widgetId": "p7.Administration.ChangePasswordForm.textBox3"
                        })} />
                ]}
                caption={t([
                    ExpressionProperty({
                        "expression": { "expr": { "type": "literal", "value": "New password" }, "args": {} }
                    })
                ])}
                labelFor={DerivedUniqueIdProperty({
                    "widgetId": "p7.Administration.ChangePasswordForm.textBox3"
                })}
                width={3}
                orientation={"horizontal"}
                hasError={ValidationProperty({
                    "inputWidgetId": "p7.Administration.ChangePasswordForm.textBox3"
                })} />,
            <$FormGroup key="p7.Administration.ChangePasswordForm.textBox1$formGroup"
                $widgetId="p7.Administration.ChangePasswordForm.textBox1$formGroup"
                class={"mx-name-textBox1 mx-textbox"}
                style={undefined}
                control={[
                    <$TextBox key="p7.Administration.ChangePasswordForm.textBox1"
                        $widgetId="p7.Administration.ChangePasswordForm.textBox1"
                        inputValue={AttributeProperty({
                            "scope": "p7.Administration.ChangePasswordForm.dataView2",
                            "path": "",
                            "entity": "Administration.AccountPasswordData",
                            "attribute": "ConfirmPassword",
                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                            "isList": false,
                            "validation": { "message": t([ "The password cannot be empty." ]), "expression": { "expr": { "type": "function", "name": "!=", "parameters": [ { "type": "variable", "variable": "value" }, { "type": "literal", "value": null } ] }, "args": {} } },
                            "formatting": { }
                        })}
                        isPassword={true}
                        placeholder={t([
                            ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                            })
                        ])}
                        mask={""}
                        readOnlyStyle={"text"}
                        maxLength={200}
                        onEnter={undefined}
                        onLeave={undefined}
                        onEnterKeyPress={undefined}
                        ariaLabel={undefined}
                        autocomplete={"on"}
                        submitWhileEditing={false}
                        submitDelay={300}
                        ariaRequired={true}
                        tabIndex={undefined}
                        id={DerivedUniqueIdProperty({
                            "widgetId": "p7.Administration.ChangePasswordForm.textBox1"
                        })} />
                ]}
                caption={t([
                    ExpressionProperty({
                        "expression": { "expr": { "type": "literal", "value": "Confirm password" }, "args": {} }
                    })
                ])}
                labelFor={DerivedUniqueIdProperty({
                    "widgetId": "p7.Administration.ChangePasswordForm.textBox1"
                })}
                width={3}
                orientation={"horizontal"}
                hasError={ValidationProperty({
                    "inputWidgetId": "p7.Administration.ChangePasswordForm.textBox1"
                })} />
        ]}
        hideFooter={false}
        footer={[
            <$ActionButton key="p7.Administration.ChangePasswordForm.microflowButton1"
                $widgetId="p7.Administration.ChangePasswordForm.microflowButton1"
                buttonId={"p7.Administration.ChangePasswordForm.microflowButton1"}
                class={"mx-name-microflowButton1"}
                style={undefined}
                tabIndex={undefined}
                renderType={"button"}
                role={undefined}
                buttonClass={"btn-success"}
                caption={t([
                    ExpressionProperty({
                        "expression": { "expr": { "type": "literal", "value": "Change" }, "args": {} }
                    })
                ])}
                tooltip={TextProperty({
                    "value": t([
                        ""
                    ])
                })}
                icon={undefined}
                action={ActionProperty({
                    "action": { "type": "callMicroflow", "argMap": { "AccountPasswordData": { "widget": "$AccountPasswordData", "source": "object" } }, "config": { "operationId": "PRBF7rlqMV6z5PK5ppLmvA", "validate": "view" }, "disabledDuringExecution": false },
                    "abortOnServerValidation": true
                })} />,
            <$ActionButton key="p7.Administration.ChangePasswordForm.cancelButton1"
                $widgetId="p7.Administration.ChangePasswordForm.cancelButton1"
                buttonId={"p7.Administration.ChangePasswordForm.cancelButton1"}
                class={"mx-name-cancelButton1"}
                style={undefined}
                tabIndex={undefined}
                renderType={"button"}
                role={undefined}
                buttonClass={"btn-default"}
                caption={t([
                    ExpressionProperty({
                        "expression": { "expr": { "type": "literal", "value": "Cancel" }, "args": {} }
                    })
                ])}
                tooltip={TextProperty({
                    "value": t([
                        ""
                    ])
                })}
                icon={undefined}
                action={ActionProperty({
                    "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "a/CaIZYUS12pkFkXyHewhw", "closePage": true }, "disabledDuringExecution": true },
                    "abortOnServerValidation": true
                })} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Change Password"
]);

export const classes = "";

export const cancelChangesOperationId = "35j3Wp3MmFWatMWohAP54A";
export const closeButton = "p7.Administration.ChangePasswordForm.cancelButton1";
export const style = {};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
