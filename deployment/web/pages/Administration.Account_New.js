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
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $Div, $DataView, $FormGroup, $TextBox, $Combobox, $CheckBox, $ActionButton } = asPluginWidgets({ Div, DataView, FormGroup, TextBox, Combobox, CheckBox, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key="p2.Administration.Account_New.layoutGrid1"
        $widgetId="p2.Administration.Account_New.layoutGrid1"
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        style={undefined}
        content={[
            <$Div key="p2.Administration.Account_New.layoutGrid1$row0"
                $widgetId="p2.Administration.Account_New.layoutGrid1$row0"
                class={"row"}
                style={undefined}
                content={[
                    <$Div key="p2.Administration.Account_New.layoutGrid1$row0$column0"
                        $widgetId="p2.Administration.Account_New.layoutGrid1$row0$column0"
                        class={"col-lg col-md col"}
                        style={undefined}
                        content={[
                            <$DataView key="p2.Administration.Account_New.dataView2"
                                $widgetId="p2.Administration.Account_New.dataView2"
                                class={"mx-name-dataView2 form-horizontal"}
                                style={undefined}
                                tabIndex={undefined}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p2.15",
                                    "scope": "$AccountPasswordData",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": t([
                                        ""
                                    ])
                                })}
                                body={[
                                    <$DataView key="p2.Administration.Account_New.dataView1"
                                        $widgetId="p2.Administration.Account_New.dataView1"
                                        class={"mx-name-dataView1 form-horizontal"}
                                        style={undefined}
                                        tabIndex={undefined}
                                        object={AssociationObjectProperty({
                                            "dataSourceId": "p2.18",
                                            "scope": "$AccountPasswordData",
                                            "editable": true,
                                            "path": "Administration.AccountPasswordData_Account/Administration.Account",
                                            "operationId": "6lwpZh3peVyDsaOj5UVE4w"
                                        })}
                                        emptyMessage={TextProperty({
                                            "value": t([
                                                ""
                                            ])
                                        })}
                                        body={[
                                            <$FormGroup key="p2.Administration.Account_New.textBox6$formGroup"
                                                $widgetId="p2.Administration.Account_New.textBox6$formGroup"
                                                class={"mx-name-textBox6 mx-textbox"}
                                                style={undefined}
                                                control={[
                                                    <$TextBox key="p2.Administration.Account_New.textBox6"
                                                        $widgetId="p2.Administration.Account_New.textBox6"
                                                        inputValue={AttributeProperty({
                                                            "scope": "p2.Administration.Account_New.dataView1",
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
                                                            "widgetId": "p2.Administration.Account_New.textBox6"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Full name" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p2.Administration.Account_New.textBox6"
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p2.Administration.Account_New.textBox6"
                                                })} />,
                                            <$FormGroup key="p2.Administration.Account_New.textBox9$formGroup"
                                                $widgetId="p2.Administration.Account_New.textBox9$formGroup"
                                                class={"mx-name-textBox9 mx-textbox"}
                                                style={undefined}
                                                control={[
                                                    <$TextBox key="p2.Administration.Account_New.textBox9"
                                                        $widgetId="p2.Administration.Account_New.textBox9"
                                                        inputValue={AttributeProperty({
                                                            "scope": "p2.Administration.Account_New.dataView1",
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
                                                            "widgetId": "p2.Administration.Account_New.textBox9"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "User name" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p2.Administration.Account_New.textBox9"
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p2.Administration.Account_New.textBox9"
                                                })} />,
                                            <$FormGroup key="p2.Administration.Account_New.comboBox1$formGroup"
                                                $widgetId="p2.Administration.Account_New.comboBox1$formGroup"
                                                class={"mx-name-comboBox1"}
                                                style={undefined}
                                                control={[
                                                    <$Combobox key="p2.Administration.Account_New.comboBox1"
                                                        $widgetId="p2.Administration.Account_New.comboBox1"
                                                        optionsSourceType={"association"}
                                                        attributeAssociation={AssociationProperty({
                                                            "type": "ReferenceSet",
                                                            "entity": "Administration.Account",
                                                            "path": "",
                                                            "attribute": "System.UserRoles",
                                                            "endpointEntity": "System.UserRole",
                                                            "selectableObjectsId": "p2.0",
                                                            "scope": "p2.Administration.Account_New.dataView1",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                                                        })}
                                                        optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                                                            "dataSourceId": "p2.0",
                                                            "entity": "System.UserRole",
                                                            "scope": "p2.Administration.Account_New.dataView1",
                                                            "operationId": "SoIfgtdAZVaJgdYw9ekulw",
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
                                                            "dataSourceId": "p2.0",
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
                                                            "widgetId": "p2.Administration.Account_New.comboBox1"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "User role(s)" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p2.Administration.Account_New.comboBox1"
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p2.Administration.Account_New.comboBox1"
                                                })} />,
                                            <$FormGroup key="p2.Administration.Account_New.checkBox1$formGroup"
                                                $widgetId="p2.Administration.Account_New.checkBox1$formGroup"
                                                class={"mx-name-checkBox1 mx-checkbox"}
                                                style={undefined}
                                                control={[
                                                    <$CheckBox key="p2.Administration.Account_New.checkBox1"
                                                        $widgetId="p2.Administration.Account_New.checkBox1"
                                                        value={AttributeProperty({
                                                            "scope": "p2.Administration.Account_New.dataView1",
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
                                                            "widgetId": "p2.Administration.Account_New.checkBox1"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Blocked" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p2.Administration.Account_New.checkBox1"
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p2.Administration.Account_New.checkBox1"
                                                })} />,
                                            <$FormGroup key="p2.Administration.Account_New.checkBox2$formGroup"
                                                $widgetId="p2.Administration.Account_New.checkBox2$formGroup"
                                                class={"mx-name-checkBox2 mx-checkbox"}
                                                style={undefined}
                                                control={[
                                                    <$CheckBox key="p2.Administration.Account_New.checkBox2"
                                                        $widgetId="p2.Administration.Account_New.checkBox2"
                                                        value={AttributeProperty({
                                                            "scope": "p2.Administration.Account_New.dataView1",
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
                                                            "widgetId": "p2.Administration.Account_New.checkBox2"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Active" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p2.Administration.Account_New.checkBox2"
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p2.Administration.Account_New.checkBox2"
                                                })} />,
                                            <$FormGroup key="p2.Administration.Account_New.comboBox3$formGroup"
                                                $widgetId="p2.Administration.Account_New.comboBox3$formGroup"
                                                class={"mx-name-comboBox3"}
                                                style={undefined}
                                                control={[
                                                    <$Combobox key="p2.Administration.Account_New.comboBox3"
                                                        $widgetId="p2.Administration.Account_New.comboBox3"
                                                        optionsSourceType={"association"}
                                                        attributeAssociation={AssociationProperty({
                                                            "type": "Reference",
                                                            "entity": "Administration.Account",
                                                            "path": "",
                                                            "attribute": "System.User_Language",
                                                            "endpointEntity": "System.Language",
                                                            "selectableObjectsId": "p2.1",
                                                            "scope": "p2.Administration.Account_New.dataView1",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                                                        })}
                                                        optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                                                            "dataSourceId": "p2.1",
                                                            "entity": "System.Language",
                                                            "scope": "p2.Administration.Account_New.dataView1",
                                                            "operationId": "eKwPw16Ul1iJpRXQ4WHxnw",
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
                                                            "dataSourceId": "p2.1",
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
                                                            "widgetId": "p2.Administration.Account_New.comboBox3"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Language" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p2.Administration.Account_New.comboBox3"
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p2.Administration.Account_New.comboBox3"
                                                })} />,
                                            <$FormGroup key="p2.Administration.Account_New.comboBox2$formGroup"
                                                $widgetId="p2.Administration.Account_New.comboBox2$formGroup"
                                                class={"mx-name-comboBox2"}
                                                style={undefined}
                                                control={[
                                                    <$Combobox key="p2.Administration.Account_New.comboBox2"
                                                        $widgetId="p2.Administration.Account_New.comboBox2"
                                                        optionsSourceType={"association"}
                                                        attributeAssociation={AssociationProperty({
                                                            "type": "Reference",
                                                            "entity": "Administration.Account",
                                                            "path": "",
                                                            "attribute": "System.User_TimeZone",
                                                            "endpointEntity": "System.TimeZone",
                                                            "selectableObjectsId": "p2.2",
                                                            "scope": "p2.Administration.Account_New.dataView1",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                                                        })}
                                                        optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                                                            "dataSourceId": "p2.2",
                                                            "entity": "System.TimeZone",
                                                            "scope": "p2.Administration.Account_New.dataView1",
                                                            "operationId": "nXNEjCrO9FWxJI8BJkQ7/A",
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
                                                            "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "Description" }, "args": { "currentObject": { "widget": "p2.Administration.Account_New.comboBox2", "source": "object" } } },
                                                            "dataSourceId": "p2.2"
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
                                                            "widgetId": "p2.Administration.Account_New.comboBox2"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Time zone" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p2.Administration.Account_New.comboBox2"
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p2.Administration.Account_New.comboBox2"
                                                })} />
                                        ]}
                                        hideFooter={true}
                                        footer={undefined} />,
                                    <$FormGroup key="p2.Administration.Account_New.textBox5$formGroup"
                                        $widgetId="p2.Administration.Account_New.textBox5$formGroup"
                                        class={"mx-name-textBox5 mx-textbox"}
                                        style={undefined}
                                        control={[
                                            <$TextBox key="p2.Administration.Account_New.textBox5"
                                                $widgetId="p2.Administration.Account_New.textBox5"
                                                inputValue={AttributeProperty({
                                                    "scope": "p2.Administration.Account_New.dataView2",
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
                                                    "widgetId": "p2.Administration.Account_New.textBox5"
                                                })} />
                                        ]}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "New password" }, "args": {} }
                                            })
                                        ])}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p2.Administration.Account_New.textBox5"
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p2.Administration.Account_New.textBox5"
                                        })} />,
                                    <$FormGroup key="p2.Administration.Account_New.textBox7$formGroup"
                                        $widgetId="p2.Administration.Account_New.textBox7$formGroup"
                                        class={"mx-name-textBox7 mx-textbox"}
                                        style={undefined}
                                        control={[
                                            <$TextBox key="p2.Administration.Account_New.textBox7"
                                                $widgetId="p2.Administration.Account_New.textBox7"
                                                inputValue={AttributeProperty({
                                                    "scope": "p2.Administration.Account_New.dataView2",
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
                                                    "widgetId": "p2.Administration.Account_New.textBox7"
                                                })} />
                                        ]}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Confirm password" }, "args": {} }
                                            })
                                        ])}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p2.Administration.Account_New.textBox7"
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p2.Administration.Account_New.textBox7"
                                        })} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key="p2.Administration.Account_New.microflowButton1"
                                        $widgetId="p2.Administration.Account_New.microflowButton1"
                                        buttonId={"p2.Administration.Account_New.microflowButton1"}
                                        class={"mx-name-microflowButton1"}
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
                                            "action": { "type": "callMicroflow", "argMap": { "AccountPasswordData": { "widget": "$AccountPasswordData", "source": "object" } }, "config": { "operationId": "7sd7h8dN2l2yx25LP80rWA", "validate": "view" }, "disabledDuringExecution": false },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key="p2.Administration.Account_New.cancelButton1"
                                        $widgetId="p2.Administration.Account_New.cancelButton1"
                                        buttonId={"p2.Administration.Account_New.cancelButton1"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "bNBJaD9A/F2/vVvzYEA9BQ", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "New Account"
]);

export const classes = "";

export const cancelChangesOperationId = "WR1x8hJJn1Wxaa4bf4+VZQ";
export const closeButton = "p2.Administration.Account_New.cancelButton1";
export const style = {};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
