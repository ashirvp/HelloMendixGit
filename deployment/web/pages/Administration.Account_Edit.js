import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectProperty } from "mendix/AssociationObjectProperty";
import { AssociationProperty } from "mendix/AssociationProperty";
import { AttributeProperty } from "mendix/AttributeProperty";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { DerivedUniqueIdProperty } from "mendix/DerivedUniqueIdProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListAttributeProperty } from "mendix/ListAttributeProperty";
import { ListExpressionProperty } from "mendix/ListExpressionProperty";
import { TextProperty } from "mendix/TextProperty";
import { ValidationProperty } from "mendix/ValidationProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { CheckBox } from "mendix/widgets/web/CheckBox";
import * as ComboboxWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.mjs";
const Combobox = Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "Combobox")?.value || Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "default")?.value;   
import "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.css";
import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { Label } from "mendix/widgets/web/Label";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $Div, $DataView, $ConditionalVisibilityWrapper, $Label, $FormGroup, $TextBox, $Combobox, $CheckBox, $ActionButton } = asPluginWidgets({ Div, DataView, ConditionalVisibilityWrapper, Label, FormGroup, TextBox, Combobox, CheckBox, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key="p3.Administration.Account_Edit.layoutGrid1"
        $widgetId="p3.Administration.Account_Edit.layoutGrid1"
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        style={undefined}
        content={[
            <$Div key="p3.Administration.Account_Edit.layoutGrid1$row0"
                $widgetId="p3.Administration.Account_Edit.layoutGrid1$row0"
                class={"row"}
                style={undefined}
                content={[
                    <$Div key="p3.Administration.Account_Edit.layoutGrid1$row0$column0"
                        $widgetId="p3.Administration.Account_Edit.layoutGrid1$row0$column0"
                        class={"col-lg col-md col"}
                        style={undefined}
                        content={[
                            <$DataView key="p3.Administration.Account_Edit.dataView1"
                                $widgetId="p3.Administration.Account_Edit.dataView1"
                                class={"mx-name-dataView1 form-horizontal"}
                                style={undefined}
                                tabIndex={undefined}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p3.17",
                                    "scope": "$Account",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": t([
                                        ""
                                    ])
                                })}
                                body={[
                                    <$ConditionalVisibilityWrapper key="p3.Administration.Account_Edit.label4$visibility"
                                        $widgetId="p3.Administration.Account_Edit.label4$visibility"
                                        visible={ExpressionProperty({
                                            "expression": { "expr": { "type": "function", "name": "not", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "IsLocalUser" } ] }, "args": { "currentObject": { "widget": "p3.Administration.Account_Edit.dataView1", "source": "object" } } }
                                        })}
                                        contents={[
                                            <$Label key="p3.Administration.Account_Edit.label4"
                                                $widgetId="p3.Administration.Account_Edit.label4"
                                                class={"mx-name-label4 alert alert-warning"}
                                                style={{
                                                    "width": "100%"
                                                }}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p3.Administration.Account_Edit.label4"
                                                })}
                                                caption={TextProperty({
                                                    "value": t([
                                                        "Mendix AppCloud users are provisioned by the AppCloudServices module, any changes made in this form might get overwritten. "
                                                    ])
                                                })} />
                                        ]} />,
                                    <$FormGroup key="p3.Administration.Account_Edit.textBox6$formGroup"
                                        $widgetId="p3.Administration.Account_Edit.textBox6$formGroup"
                                        class={"mx-name-textBox6 mx-textbox"}
                                        style={undefined}
                                        control={[
                                            <$TextBox key="p3.Administration.Account_Edit.textBox6"
                                                $widgetId="p3.Administration.Account_Edit.textBox6"
                                                inputValue={AttributeProperty({
                                                    "scope": "p3.Administration.Account_Edit.dataView1",
                                                    "path": "",
                                                    "entity": "Administration.Account",
                                                    "attribute": "FullName",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "validation": null,
                                                    "formatting": { }
                                                })}
                                                isPassword={false}
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
                                                ariaRequired={undefined}
                                                tabIndex={undefined}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p3.Administration.Account_Edit.textBox6"
                                                })} />
                                        ]}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Full name" }, "args": {} }
                                            })
                                        ])}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p3.Administration.Account_Edit.textBox6"
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p3.Administration.Account_Edit.textBox6"
                                        })} />,
                                    <$ConditionalVisibilityWrapper key="p3.Administration.Account_Edit.textBox9$formGroup$visibility"
                                        $widgetId="p3.Administration.Account_Edit.textBox9$formGroup$visibility"
                                        visible={ExpressionProperty({
                                            "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "IsLocalUser" }, "args": { "currentObject": { "widget": "p3.Administration.Account_Edit.dataView1", "source": "object" } } }
                                        })}
                                        contents={[
                                            <$FormGroup key="p3.Administration.Account_Edit.textBox9$formGroup"
                                                $widgetId="p3.Administration.Account_Edit.textBox9$formGroup"
                                                class={"mx-name-textBox9 mx-textbox"}
                                                style={undefined}
                                                control={[
                                                    <$TextBox key="p3.Administration.Account_Edit.textBox9"
                                                        $widgetId="p3.Administration.Account_Edit.textBox9"
                                                        inputValue={AttributeProperty({
                                                            "scope": "p3.Administration.Account_Edit.dataView1",
                                                            "path": "",
                                                            "entity": "Administration.Account",
                                                            "attribute": "Name",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                            "isList": false,
                                                            "validation": null,
                                                            "formatting": { }
                                                        })}
                                                        isPassword={false}
                                                        placeholder={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                            })
                                                        ])}
                                                        mask={""}
                                                        readOnlyStyle={"text"}
                                                        maxLength={100}
                                                        onEnter={undefined}
                                                        onLeave={undefined}
                                                        onEnterKeyPress={undefined}
                                                        ariaLabel={undefined}
                                                        autocomplete={"on"}
                                                        submitWhileEditing={false}
                                                        submitDelay={300}
                                                        ariaRequired={undefined}
                                                        tabIndex={undefined}
                                                        id={DerivedUniqueIdProperty({
                                                            "widgetId": "p3.Administration.Account_Edit.textBox9"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "User name" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p3.Administration.Account_Edit.textBox9"
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p3.Administration.Account_Edit.textBox9"
                                                })} />
                                        ]} />,
                                    <$ConditionalVisibilityWrapper key="p3.Administration.Account_Edit.textBox92$formGroup$visibility"
                                        $widgetId="p3.Administration.Account_Edit.textBox92$formGroup$visibility"
                                        visible={ExpressionProperty({
                                            "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "IsLocalUser" }, "args": { "currentObject": { "widget": "p3.Administration.Account_Edit.dataView1", "source": "object" } } }
                                        })}
                                        contents={[
                                            <$FormGroup key="p3.Administration.Account_Edit.textBox92$formGroup"
                                                $widgetId="p3.Administration.Account_Edit.textBox92$formGroup"
                                                class={"mx-name-textBox92 mx-textbox"}
                                                style={undefined}
                                                control={[
                                                    <$TextBox key="p3.Administration.Account_Edit.textBox92"
                                                        $widgetId="p3.Administration.Account_Edit.textBox92"
                                                        inputValue={AttributeProperty({
                                                            "scope": "p3.Administration.Account_Edit.dataView1",
                                                            "path": "",
                                                            "entity": "Administration.Account",
                                                            "attribute": "Name",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                            "isList": false,
                                                            "isEditable": { "expr": { "type": "literal", "value": false }, "args": {} },
                                                            "validation": null,
                                                            "formatting": { }
                                                        })}
                                                        isPassword={false}
                                                        placeholder={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                            })
                                                        ])}
                                                        mask={""}
                                                        readOnlyStyle={"text"}
                                                        maxLength={100}
                                                        onEnter={undefined}
                                                        onLeave={undefined}
                                                        onEnterKeyPress={undefined}
                                                        ariaLabel={undefined}
                                                        autocomplete={"on"}
                                                        submitWhileEditing={false}
                                                        submitDelay={300}
                                                        ariaRequired={undefined}
                                                        tabIndex={undefined}
                                                        id={DerivedUniqueIdProperty({
                                                            "widgetId": "p3.Administration.Account_Edit.textBox92"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "OpenID" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p3.Administration.Account_Edit.textBox92"
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p3.Administration.Account_Edit.textBox92"
                                                })} />
                                        ]} />,
                                    <$FormGroup key="p3.Administration.Account_Edit.comboBox2$formGroup"
                                        $widgetId="p3.Administration.Account_Edit.comboBox2$formGroup"
                                        class={"mx-name-comboBox2"}
                                        style={undefined}
                                        control={[
                                            <$Combobox key="p3.Administration.Account_Edit.comboBox2"
                                                $widgetId="p3.Administration.Account_Edit.comboBox2"
                                                optionsSourceType={"association"}
                                                attributeAssociation={AssociationProperty({
                                                    "type": "ReferenceSet",
                                                    "entity": "Administration.Account",
                                                    "path": "",
                                                    "attribute": "System.UserRoles",
                                                    "endpointEntity": "System.UserRole",
                                                    "selectableObjectsId": "p3.0",
                                                    "scope": "p3.Administration.Account_Edit.dataView1",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                                                })}
                                                optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                                                    "dataSourceId": "p3.0",
                                                    "entity": "System.UserRole",
                                                    "scope": "p3.Administration.Account_Edit.dataView1",
                                                    "operationId": "vfZvbAT2QlS/YvnDy8hHKA",
                                                    "sort": [
                                                        [
                                                            "Name",
                                                            "asc"
                                                        ]
                                                    ],
                                                    "constraints": { "type": "relatedEntity", "left": { "type": "attribute", "attribute": "id", "context": "System.UserRole", "attributeType": "ObjectReference" }, "rightEntity": "System.UserRole", "rightEntityAlias": "System.UserRole1", "right": { "type": "attribute", "attribute": "System.grantableRoles", "context": "System.UserRole1", "attributeType": "ObjectReference" }, "next": { "type": "relatedEntity", "left": { "type": "attribute", "attribute": "id", "context": "System.UserRole1", "attributeType": "ObjectReference" }, "rightEntity": "System.User", "rightEntityAlias": "System.User", "right": { "type": "attribute", "attribute": "System.UserRoles", "context": "System.User", "attributeType": "ObjectReference" }, "next": { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "id", "context": "System.User", "attributeType": "ObjectReference" }, { "type": "token", "name": "currentUser" } ] } } }
                                                })}
                                                optionsSourceAssociationCaptionType={"attribute"}
                                                optionsSourceAssociationCaptionAttribute={ListAttributeProperty({
                                                    "path": "",
                                                    "entity": "System.UserRole",
                                                    "attribute": "Name",
                                                    "attributeType": "String",
                                                    "sortable": true,
                                                    "filterable": true,
                                                    "dataSourceId": "p3.0",
                                                    "isList": false
                                                })}
                                                optionsSourceAssociationCaptionExpression={undefined}
                                                emptyOptionText={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                filterType={"contains"}
                                                noOptionsText={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                clearable={true}
                                                optionsSourceAssociationCustomContentType={"no"}
                                                optionsSourceAssociationCustomContent={undefined}
                                                showFooter={false}
                                                menuFooterContent={undefined}
                                                selectionMethod={"checkbox"}
                                                selectedItemsStyle={"text"}
                                                selectAllButton={false}
                                                selectAllButtonCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Select all" }, "args": {} }
                                                    })
                                                ])}
                                                onChangeEvent={undefined}
                                                onEnterEvent={undefined}
                                                onLeaveEvent={undefined}
                                                ariaRequired={false}
                                                clearButtonAriaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                                                    })
                                                ])}
                                                removeValueAriaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Remove value" }, "args": {} }
                                                    })
                                                ])}
                                                a11ySelectedValue={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Selected value:" }, "args": {} }
                                                    })
                                                ])}
                                                a11yOptionsAvailable={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Number of options available:" }, "args": {} }
                                                    })
                                                ])}
                                                a11yInstructions={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Use up and down arrow keys to navigate. Press Enter or Space Bar keys to select." }, "args": {} }
                                                    })
                                                ])}
                                                source={"context"}
                                                optionsSourceDatabaseDataSource={undefined}
                                                optionsSourceDatabaseCaptionType={"attribute"}
                                                optionsSourceDatabaseDefaultValue={undefined}
                                                optionsSourceStaticDataSource={[]}
                                                optionsSourceDatabaseCustomContentType={"no"}
                                                staticDataSourceCustomContentType={"no"}
                                                readOnlyStyle={"text"}
                                                lazyLoading={true}
                                                loadingType={"spinner"}
                                                tabIndex={undefined}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p3.Administration.Account_Edit.comboBox2"
                                                })} />
                                        ]}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "User role(s)" }, "args": {} }
                                            })
                                        ])}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p3.Administration.Account_Edit.comboBox2"
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p3.Administration.Account_Edit.comboBox2"
                                        })} />,
                                    <$FormGroup key="p3.Administration.Account_Edit.checkBox1$formGroup"
                                        $widgetId="p3.Administration.Account_Edit.checkBox1$formGroup"
                                        class={"mx-name-checkBox1 mx-checkbox"}
                                        style={undefined}
                                        control={[
                                            <$CheckBox key="p3.Administration.Account_Edit.checkBox1"
                                                $widgetId="p3.Administration.Account_Edit.checkBox1"
                                                value={AttributeProperty({
                                                    "scope": "p3.Administration.Account_Edit.dataView1",
                                                    "path": "",
                                                    "entity": "Administration.Account",
                                                    "attribute": "Blocked",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "validation": null
                                                })}
                                                readOnlyStyle={"text"}
                                                onEnter={undefined}
                                                onLeave={undefined}
                                                caption={undefined}
                                                ariaLabel={undefined}
                                                tabIndex={undefined}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p3.Administration.Account_Edit.checkBox1"
                                                })} />
                                        ]}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Blocked" }, "args": {} }
                                            })
                                        ])}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p3.Administration.Account_Edit.checkBox1"
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p3.Administration.Account_Edit.checkBox1"
                                        })} />,
                                    <$FormGroup key="p3.Administration.Account_Edit.checkBox2$formGroup"
                                        $widgetId="p3.Administration.Account_Edit.checkBox2$formGroup"
                                        class={"mx-name-checkBox2 mx-checkbox"}
                                        style={undefined}
                                        control={[
                                            <$CheckBox key="p3.Administration.Account_Edit.checkBox2"
                                                $widgetId="p3.Administration.Account_Edit.checkBox2"
                                                value={AttributeProperty({
                                                    "scope": "p3.Administration.Account_Edit.dataView1",
                                                    "path": "",
                                                    "entity": "Administration.Account",
                                                    "attribute": "Active",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "validation": null
                                                })}
                                                readOnlyStyle={"text"}
                                                onEnter={undefined}
                                                onLeave={undefined}
                                                caption={undefined}
                                                ariaLabel={undefined}
                                                tabIndex={undefined}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p3.Administration.Account_Edit.checkBox2"
                                                })} />
                                        ]}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Active" }, "args": {} }
                                            })
                                        ])}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p3.Administration.Account_Edit.checkBox2"
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p3.Administration.Account_Edit.checkBox2"
                                        })} />,
                                    <$FormGroup key="p3.Administration.Account_Edit.comboBox3$formGroup"
                                        $widgetId="p3.Administration.Account_Edit.comboBox3$formGroup"
                                        class={"mx-name-comboBox3"}
                                        style={undefined}
                                        control={[
                                            <$Combobox key="p3.Administration.Account_Edit.comboBox3"
                                                $widgetId="p3.Administration.Account_Edit.comboBox3"
                                                optionsSourceType={"association"}
                                                attributeAssociation={AssociationProperty({
                                                    "type": "Reference",
                                                    "entity": "Administration.Account",
                                                    "path": "",
                                                    "attribute": "System.User_Language",
                                                    "endpointEntity": "System.Language",
                                                    "selectableObjectsId": "p3.1",
                                                    "scope": "p3.Administration.Account_Edit.dataView1",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                                                })}
                                                optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                                                    "dataSourceId": "p3.1",
                                                    "entity": "System.Language",
                                                    "scope": "p3.Administration.Account_Edit.dataView1",
                                                    "operationId": "3nBgCxmlKFuCjDzz35Oofw",
                                                    "sort": []
                                                })}
                                                optionsSourceAssociationCaptionType={"attribute"}
                                                optionsSourceAssociationCaptionAttribute={ListAttributeProperty({
                                                    "path": "",
                                                    "entity": "System.Language",
                                                    "attribute": "Description",
                                                    "attributeType": "String",
                                                    "sortable": true,
                                                    "filterable": true,
                                                    "dataSourceId": "p3.1",
                                                    "isList": false
                                                })}
                                                optionsSourceAssociationCaptionExpression={undefined}
                                                emptyOptionText={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                filterType={"contains"}
                                                noOptionsText={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                clearable={true}
                                                optionsSourceAssociationCustomContentType={"no"}
                                                optionsSourceAssociationCustomContent={undefined}
                                                showFooter={false}
                                                menuFooterContent={undefined}
                                                selectionMethod={"checkbox"}
                                                selectedItemsStyle={"text"}
                                                selectAllButton={false}
                                                selectAllButtonCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Select all" }, "args": {} }
                                                    })
                                                ])}
                                                onChangeEvent={undefined}
                                                onEnterEvent={undefined}
                                                onLeaveEvent={undefined}
                                                ariaRequired={false}
                                                clearButtonAriaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                                                    })
                                                ])}
                                                removeValueAriaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Remove value" }, "args": {} }
                                                    })
                                                ])}
                                                a11ySelectedValue={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Selected value:" }, "args": {} }
                                                    })
                                                ])}
                                                a11yOptionsAvailable={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Number of options available:" }, "args": {} }
                                                    })
                                                ])}
                                                a11yInstructions={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Use up and down arrow keys to navigate. Press Enter or Space Bar keys to select." }, "args": {} }
                                                    })
                                                ])}
                                                source={"context"}
                                                optionsSourceDatabaseDataSource={undefined}
                                                optionsSourceDatabaseCaptionType={"attribute"}
                                                optionsSourceDatabaseDefaultValue={undefined}
                                                optionsSourceStaticDataSource={[]}
                                                optionsSourceDatabaseCustomContentType={"no"}
                                                staticDataSourceCustomContentType={"no"}
                                                readOnlyStyle={"text"}
                                                lazyLoading={true}
                                                loadingType={"spinner"}
                                                tabIndex={undefined}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p3.Administration.Account_Edit.comboBox3"
                                                })} />
                                        ]}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Language" }, "args": {} }
                                            })
                                        ])}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p3.Administration.Account_Edit.comboBox3"
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p3.Administration.Account_Edit.comboBox3"
                                        })} />,
                                    <$FormGroup key="p3.Administration.Account_Edit.comboBox4$formGroup"
                                        $widgetId="p3.Administration.Account_Edit.comboBox4$formGroup"
                                        class={"mx-name-comboBox4"}
                                        style={undefined}
                                        control={[
                                            <$Combobox key="p3.Administration.Account_Edit.comboBox4"
                                                $widgetId="p3.Administration.Account_Edit.comboBox4"
                                                optionsSourceType={"association"}
                                                attributeAssociation={AssociationProperty({
                                                    "type": "Reference",
                                                    "entity": "Administration.Account",
                                                    "path": "",
                                                    "attribute": "System.User_TimeZone",
                                                    "endpointEntity": "System.TimeZone",
                                                    "selectableObjectsId": "p3.2",
                                                    "scope": "p3.Administration.Account_Edit.dataView1",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                                                })}
                                                optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                                                    "dataSourceId": "p3.2",
                                                    "entity": "System.TimeZone",
                                                    "scope": "p3.Administration.Account_Edit.dataView1",
                                                    "operationId": "Mb9JWPbUpFe9Qgw1BC17rA",
                                                    "sort": [
                                                        [
                                                            "RawOffset",
                                                            "asc"
                                                        ],
                                                        [
                                                            "Description",
                                                            "asc"
                                                        ]
                                                    ]
                                                })}
                                                optionsSourceAssociationCaptionType={"expression"}
                                                optionsSourceAssociationCaptionExpression={ListExpressionProperty({
                                                    "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "Description" }, "args": { "currentObject": { "widget": "p3.Administration.Account_Edit.comboBox4", "source": "object" } } },
                                                    "dataSourceId": "p3.2"
                                                })}
                                                emptyOptionText={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                filterType={"contains"}
                                                noOptionsText={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                clearable={true}
                                                optionsSourceAssociationCustomContentType={"no"}
                                                optionsSourceAssociationCustomContent={undefined}
                                                showFooter={false}
                                                menuFooterContent={undefined}
                                                selectionMethod={"checkbox"}
                                                selectedItemsStyle={"text"}
                                                selectAllButton={false}
                                                selectAllButtonCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Select all" }, "args": {} }
                                                    })
                                                ])}
                                                onChangeEvent={undefined}
                                                onEnterEvent={undefined}
                                                onLeaveEvent={undefined}
                                                ariaRequired={false}
                                                clearButtonAriaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                                                    })
                                                ])}
                                                removeValueAriaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Remove value" }, "args": {} }
                                                    })
                                                ])}
                                                a11ySelectedValue={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Selected value:" }, "args": {} }
                                                    })
                                                ])}
                                                a11yOptionsAvailable={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Number of options available:" }, "args": {} }
                                                    })
                                                ])}
                                                a11yInstructions={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Use up and down arrow keys to navigate. Press Enter or Space Bar keys to select." }, "args": {} }
                                                    })
                                                ])}
                                                source={"context"}
                                                optionsSourceDatabaseDataSource={undefined}
                                                optionsSourceDatabaseCaptionType={"attribute"}
                                                optionsSourceDatabaseDefaultValue={undefined}
                                                optionsSourceStaticDataSource={[]}
                                                optionsSourceDatabaseCustomContentType={"no"}
                                                staticDataSourceCustomContentType={"no"}
                                                readOnlyStyle={"text"}
                                                lazyLoading={true}
                                                loadingType={"spinner"}
                                                tabIndex={undefined}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p3.Administration.Account_Edit.comboBox4"
                                                })} />
                                        ]}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Time zone" }, "args": {} }
                                            })
                                        ])}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p3.Administration.Account_Edit.comboBox4"
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p3.Administration.Account_Edit.comboBox4"
                                        })} />,
                                    <$ConditionalVisibilityWrapper key="p3.Administration.Account_Edit.microflowTrigger1$visibility"
                                        $widgetId="p3.Administration.Account_Edit.microflowTrigger1$visibility"
                                        visible={ExpressionProperty({
                                            "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "IsLocalUser" }, "args": { "currentObject": { "widget": "p3.Administration.Account_Edit.dataView1", "source": "object" } } }
                                        })}
                                        contents={[
                                            <$ActionButton key="p3.Administration.Account_Edit.microflowTrigger1"
                                                $widgetId="p3.Administration.Account_Edit.microflowTrigger1"
                                                buttonId={"p3.Administration.Account_Edit.microflowTrigger1"}
                                                class={"mx-name-microflowTrigger1"}
                                                style={undefined}
                                                tabIndex={undefined}
                                                renderType={"button"}
                                                role={undefined}
                                                buttonClass={"btn-default"}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Change password" }, "args": {} }
                                                    })
                                                ])}
                                                tooltip={TextProperty({
                                                    "value": t([
                                                        ""
                                                    ])
                                                })}
                                                icon={undefined}
                                                action={ActionProperty({
                                                    "action": { "type": "callMicroflow", "argMap": { "Account": { "widget": "$Account", "source": "object" } }, "config": { "operationId": "DRuj9blCcFK+MlFyc9g8Nw" }, "disabledDuringExecution": false },
                                                    "abortOnServerValidation": true
                                                })} />
                                        ]} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key="p3.Administration.Account_Edit.saveButton1"
                                        $widgetId="p3.Administration.Account_Edit.saveButton1"
                                        buttonId={"p3.Administration.Account_Edit.saveButton1"}
                                        class={"mx-name-saveButton1"}
                                        style={undefined}
                                        tabIndex={undefined}
                                        renderType={"button"}
                                        role={undefined}
                                        buttonClass={"btn-success"}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Save" }, "args": {} }
                                            })
                                        ])}
                                        tooltip={TextProperty({
                                            "value": t([
                                                ""
                                            ])
                                        })}
                                        icon={undefined}
                                        action={ActionProperty({
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p3.Administration.Account_Edit.dataView1", "source": "object" } }, "config": { "operationId": "/h/IiwJb51aBCKa7a+/+6g", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key="p3.Administration.Account_Edit.cancelButton1"
                                        $widgetId="p3.Administration.Account_Edit.cancelButton1"
                                        buttonId={"p3.Administration.Account_Edit.cancelButton1"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "x9/YAY6NrlKuLpqDtJpk8Q", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Edit Account"
]);

export const classes = "";

export const cancelChangesOperationId = "Itg8lxCxUVS+3ihfYL5AcA";
export const closeButton = "p3.Administration.Account_Edit.cancelButton1";
export const style = {};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
