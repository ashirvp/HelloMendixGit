import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AttributeProperty } from "mendix/AttributeProperty";
import { DerivedUniqueIdProperty } from "mendix/DerivedUniqueIdProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { NanoflowObjectProperty } from "mendix/NanoflowObjectProperty";
import { TextProperty } from "mendix/TextProperty";
import { ValidationProperty } from "mendix/ValidationProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { Container } from "mendix/widgets/web/Container";
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import * as ImageWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.value || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.value;   
import "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import { Label } from "mendix/widgets/web/Label";
import { Text } from "mendix/widgets/web/Text";
import { TextArea } from "mendix/widgets/web/TextArea";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $Div, $DataView, $Container, $Text, $FormGroup, $TextBox, $TextArea, $Label, $ActionButton, $ConditionalVisibilityWrapper, $Image } = asPluginWidgets({ Div, DataView, Container, Text, FormGroup, TextBox, TextArea, Label, ActionButton, ConditionalVisibilityWrapper, Image });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key="p28.FeedbackModule.ShareFeedback.layoutGrid1"
        $widgetId="p28.FeedbackModule.ShareFeedback.layoutGrid1"
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        style={undefined}
        content={[
            <$Div key="p28.FeedbackModule.ShareFeedback.layoutGrid1$row0"
                $widgetId="p28.FeedbackModule.ShareFeedback.layoutGrid1$row0"
                class={"row"}
                style={undefined}
                content={[
                    <$Div key="p28.FeedbackModule.ShareFeedback.layoutGrid1$row0$column0"
                        $widgetId="p28.FeedbackModule.ShareFeedback.layoutGrid1$row0$column0"
                        class={"col-lg col-md col"}
                        style={undefined}
                        content={[
                            <$DataView key="p28.FeedbackModule.ShareFeedback.dataView5"
                                $widgetId="p28.FeedbackModule.ShareFeedback.dataView5"
                                class={"mx-name-dataView5 form-vertical"}
                                style={undefined}
                                tabIndex={undefined}
                                object={NanoflowObjectProperty({
                                    "dataSourceId": "p28.20",
                                    "editable": true,
                                    "source": { "nanoflow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.DS_Feedback_Populate").DS_Feedback_Populate },
                                    "argMap": {}
                                })}
                                emptyMessage={TextProperty({
                                    "value": t([
                                        ""
                                    ])
                                })}
                                body={[
                                    <$Container key="p28.FeedbackModule.ShareFeedback.container5"
                                        $widgetId="p28.FeedbackModule.ShareFeedback.container5"
                                        class={"mx-name-container5 spacing-outer-bottom-medium"}
                                        style={undefined}
                                        renderMode={"div"}
                                        onClick={undefined}
                                        content={[
                                            <$Text key="p28.FeedbackModule.ShareFeedback.text1"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.text1"
                                                class={"mx-name-text1"}
                                                style={undefined}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Help us make your experience better and share your feedback with us!" }, "args": {} }
                                                    })
                                                ])}
                                                renderMode={"p"} />,
                                            <$FormGroup key="p28.FeedbackModule.ShareFeedback.feedback_subject$formGroup"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.feedback_subject$formGroup"
                                                class={"mx-name-feedback_subject mx-textbox"}
                                                style={undefined}
                                                control={[
                                                    <$TextBox key="p28.FeedbackModule.ShareFeedback.feedback_subject"
                                                        $widgetId="p28.FeedbackModule.ShareFeedback.feedback_subject"
                                                        inputValue={AttributeProperty({
                                                            "scope": "p28.FeedbackModule.ShareFeedback.dataView5",
                                                            "path": "",
                                                            "entity": "FeedbackModule.Feedback",
                                                            "attribute": "Subject",
                                                            "onChange": { "type": "callNanoflow", "argMap": { "Feedback": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } }, "config": { "nanoflow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.OCH_Feedback_SaveToLocalStorage").OCH_Feedback_SaveToLocalStorage }, "disabledDuringExecution": false },
                                                            "isList": false,
                                                            "validation": null,
                                                            "formatting": { }
                                                        })}
                                                        isPassword={false}
                                                        placeholder={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Summarize your feedback in a few words" }, "args": {} }
                                                            })
                                                        ])}
                                                        mask={""}
                                                        readOnlyStyle={"control"}
                                                        maxLength={200}
                                                        onEnter={undefined}
                                                        onLeave={undefined}
                                                        onEnterKeyPress={undefined}
                                                        ariaLabel={undefined}
                                                        autocomplete={"on"}
                                                        submitWhileEditing={true}
                                                        submitDelay={300}
                                                        ariaRequired={undefined}
                                                        tabIndex={undefined}
                                                        id={DerivedUniqueIdProperty({
                                                            "widgetId": "p28.FeedbackModule.ShareFeedback.feedback_subject"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Subject" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p28.FeedbackModule.ShareFeedback.feedback_subject"
                                                })}
                                                width={undefined}
                                                orientation={"vertical"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p28.FeedbackModule.ShareFeedback.feedback_subject"
                                                })} />,
                                            <$FormGroup key="p28.FeedbackModule.ShareFeedback.textArea2$formGroup"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.textArea2$formGroup"
                                                class={"mx-name-textArea2 mx-textarea"}
                                                style={undefined}
                                                control={[
                                                    <$TextArea key="p28.FeedbackModule.ShareFeedback.textArea2"
                                                        $widgetId="p28.FeedbackModule.ShareFeedback.textArea2"
                                                        inputValue={AttributeProperty({
                                                            "scope": "p28.FeedbackModule.ShareFeedback.dataView5",
                                                            "path": "",
                                                            "entity": "FeedbackModule.Feedback",
                                                            "attribute": "Description",
                                                            "onChange": { "type": "callNanoflow", "argMap": { "Feedback": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } }, "config": { "nanoflow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.OCH_Feedback_SaveToLocalStorage").OCH_Feedback_SaveToLocalStorage }, "disabledDuringExecution": false },
                                                            "isList": false,
                                                            "validation": null
                                                        })}
                                                        counterMessage={undefined}
                                                        maxLength={undefined}
                                                        numberOfLines={5}
                                                        autoGrow={false}
                                                        placeholder={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Please add a detailed description, including steps you took before finding issue, or how this idea would help improve the experience for you and other users" }, "args": {} }
                                                            })
                                                        ])}
                                                        readOnlyStyle={"control"}
                                                        textTooLongMessage={undefined}
                                                        onEnter={undefined}
                                                        onLeave={undefined}
                                                        ariaLabel={undefined}
                                                        ariaRequired={undefined}
                                                        submitWhileEditing={true}
                                                        submitDelay={300}
                                                        tabIndex={undefined}
                                                        id={DerivedUniqueIdProperty({
                                                            "widgetId": "p28.FeedbackModule.ShareFeedback.textArea2"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Description" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p28.FeedbackModule.ShareFeedback.textArea2"
                                                })}
                                                width={undefined}
                                                orientation={"vertical"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p28.FeedbackModule.ShareFeedback.textArea2"
                                                })} />
                                        ]}
                                        ariaHidden={false} />,
                                    <$Container key="p28.FeedbackModule.ShareFeedback.container4"
                                        $widgetId="p28.FeedbackModule.ShareFeedback.container4"
                                        class={"mx-name-container4 col-left spacing-outer-bottom"}
                                        style={undefined}
                                        renderMode={"div"}
                                        onClick={undefined}
                                        content={[
                                            <$Label key="p28.FeedbackModule.ShareFeedback.label1"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.label1"
                                                class={"mx-name-label1 text-semibold spacing-outer-bottom-none"}
                                                style={undefined}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p28.FeedbackModule.ShareFeedback.label1"
                                                })}
                                                caption={TextProperty({
                                                    "value": t([
                                                        "Attachment"
                                                    ])
                                                })} />,
                                            <$Text key="p28.FeedbackModule.ShareFeedback.text2"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.text2"
                                                class={"mx-name-text2 text-light"}
                                                style={undefined}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Upload a jpg, jpeg, png or gif image file of max. 5MB." }, "args": {} }
                                                    })
                                                ])}
                                                renderMode={"span"} />
                                        ]}
                                        ariaHidden={false} />,
                                    <$Container key="p28.FeedbackModule.ShareFeedback.container2"
                                        $widgetId="p28.FeedbackModule.ShareFeedback.container2"
                                        class={"mx-name-container2 flexcontainer justify-content-start spacing-outer-bottom-medium"}
                                        style={{
                                            "gap": "8px"
                                        }}
                                        renderMode={"div"}
                                        onClick={undefined}
                                        content={[
                                            <$ActionButton key="p28.FeedbackModule.ShareFeedback.actionButton4"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.actionButton4"
                                                buttonId={"p28.FeedbackModule.ShareFeedback.actionButton4"}
                                                class={"mx-name-actionButton4"}
                                                style={undefined}
                                                tabIndex={undefined}
                                                renderType={"button"}
                                                role={undefined}
                                                buttonClass={"btn-default"}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Take Screenshot" }, "args": {} }
                                                    })
                                                ])}
                                                tooltip={TextProperty({
                                                    "value": t([
                                                        ""
                                                    ])
                                                })}
                                                icon={WebIconProperty({
                                                    "icon": { "type": "glyph", "iconClass": "glyphicon-camera" }
                                                })}
                                                action={ActionProperty({
                                                    "action": { "type": "callNanoflow", "argMap": { "Feedback": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } }, "config": { "nanoflow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.ACT_Feedback_TriggerScreenshotMode").ACT_Feedback_TriggerScreenshotMode }, "disabledDuringExecution": true },
                                                    "abortOnServerValidation": true
                                                })} />,
                                            <$ActionButton key="p28.FeedbackModule.ShareFeedback.actionButton5"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.actionButton5"
                                                buttonId={"p28.FeedbackModule.ShareFeedback.actionButton5"}
                                                class={"mx-name-actionButton5"}
                                                style={undefined}
                                                tabIndex={undefined}
                                                renderType={"button"}
                                                role={undefined}
                                                buttonClass={"btn-default"}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Upload" }, "args": {} }
                                                    })
                                                ])}
                                                tooltip={TextProperty({
                                                    "value": t([
                                                        ""
                                                    ])
                                                })}
                                                icon={WebIconProperty({
                                                    "icon": { "type": "glyph", "iconClass": "glyphicon-open" }
                                                })}
                                                action={ActionProperty({
                                                    "action": { "type": "callNanoflow", "argMap": { "Feedback": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } }, "config": { "nanoflow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.ACT_Feedback_UploadImage").ACT_Feedback_UploadImage }, "disabledDuringExecution": true },
                                                    "abortOnServerValidation": true
                                                })} />
                                        ]}
                                        ariaHidden={false} />,
                                    <$ConditionalVisibilityWrapper key="p28.FeedbackModule.ShareFeedback.container6$visibility"
                                        $widgetId="p28.FeedbackModule.ShareFeedback.container6$visibility"
                                        visible={ExpressionProperty({
                                            "expression": { "expr": { "type": "function", "name": "!=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "ImageB64" }, { "type": "literal", "value": null } ] }, "args": { "currentObject": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } } }
                                        })}
                                        contents={[
                                            <$Container key="p28.FeedbackModule.ShareFeedback.container6"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.container6"
                                                class={"mx-name-container6 mxfeedback-screenshot-preview spacing-outer-bottom-medium"}
                                                style={undefined}
                                                renderMode={"div"}
                                                onClick={undefined}
                                                content={[
                                                    <$Container key="p28.FeedbackModule.ShareFeedback.container7"
                                                        $widgetId="p28.FeedbackModule.ShareFeedback.container7"
                                                        class={"mx-name-container7"}
                                                        style={{
                                                            "position": "relative"
                                                        }}
                                                        renderMode={"div"}
                                                        onClick={undefined}
                                                        content={[
                                                            <$ActionButton key="p28.FeedbackModule.ShareFeedback.actionButton1"
                                                                $widgetId="p28.FeedbackModule.ShareFeedback.actionButton1"
                                                                buttonId={"p28.FeedbackModule.ShareFeedback.actionButton1"}
                                                                class={"mx-name-actionButton1 mxfeedback-screenshot-preview__delete-button"}
                                                                style={undefined}
                                                                tabIndex={undefined}
                                                                renderType={"button"}
                                                                role={undefined}
                                                                buttonClass={"btn-default"}
                                                                caption={t([
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                    })
                                                                ])}
                                                                tooltip={TextProperty({
                                                                    "value": t([
                                                                        ""
                                                                    ])
                                                                })}
                                                                icon={WebIconProperty({
                                                                    "icon": { "type": "glyph", "iconClass": "glyphicon-remove" }
                                                                })}
                                                                action={ActionProperty({
                                                                    "action": { "type": "callNanoflow", "argMap": { "Feedback": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } }, "config": { "nanoflow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.ACT_Feedback_ClearImage").ACT_Feedback_ClearImage }, "disabledDuringExecution": true },
                                                                    "abortOnServerValidation": true
                                                                })} />,
                                                            <$Image key="p28.FeedbackModule.ShareFeedback.image1"
                                                                $widgetId="p28.FeedbackModule.ShareFeedback.image1"
                                                                datasource={"imageUrl"}
                                                                imageObject={undefined}
                                                                defaultImageDynamic={undefined}
                                                                imageUrl={t([
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "ImageB64" }, "args": { "currentObject": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } } }
                                                                    })
                                                                ])}
                                                                imageIcon={undefined}
                                                                isBackgroundImage={false}
                                                                children={undefined}
                                                                onClickType={"action"}
                                                                onClick={undefined}
                                                                alternativeText={t([
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "literal", "value": "A Preview of the Feedback image that was from the screenshot or upload" }, "args": {} }
                                                                    })
                                                                ])}
                                                                widthUnit={"auto"}
                                                                width={100}
                                                                heightUnit={"auto"}
                                                                height={100}
                                                                iconSize={14}
                                                                displayAs={"fullImage"}
                                                                responsive={true}
                                                                class={"mx-name-image1 mxfeedback-screenshot-preview__image img-center img-contain"}
                                                                style={{
                                                                    "width": "auto"
                                                                }}
                                                                tabIndex={undefined} />
                                                        ]}
                                                        ariaHidden={false} />
                                                ]}
                                                ariaHidden={false} />
                                        ]} />,
                                    <$ConditionalVisibilityWrapper key="p28.FeedbackModule.ShareFeedback.textBox1$formGroup$visibility"
                                        $widgetId="p28.FeedbackModule.ShareFeedback.textBox1$formGroup$visibility"
                                        visible={ExpressionProperty({
                                            "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "_showEmail" }, "args": { "currentObject": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } } }
                                        })}
                                        contents={[
                                            <$FormGroup key="p28.FeedbackModule.ShareFeedback.textBox1$formGroup"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.textBox1$formGroup"
                                                class={"mx-name-textBox1 mx-textbox"}
                                                style={undefined}
                                                control={[
                                                    <$TextBox key="p28.FeedbackModule.ShareFeedback.textBox1"
                                                        $widgetId="p28.FeedbackModule.ShareFeedback.textBox1"
                                                        inputValue={AttributeProperty({
                                                            "scope": "p28.FeedbackModule.ShareFeedback.dataView5",
                                                            "path": "",
                                                            "entity": "FeedbackModule.Feedback",
                                                            "attribute": "SubmitterEmail",
                                                            "onChange": { "type": "callNanoflow", "argMap": { "Feedback": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } }, "config": { "nanoflow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.OCH_Feedback_SaveToLocalStorage").OCH_Feedback_SaveToLocalStorage }, "disabledDuringExecution": false },
                                                            "isList": false,
                                                            "validation": null,
                                                            "formatting": { }
                                                        })}
                                                        isPassword={false}
                                                        placeholder={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "name@company.com" }, "args": {} }
                                                            })
                                                        ])}
                                                        mask={""}
                                                        readOnlyStyle={"control"}
                                                        maxLength={200}
                                                        onEnter={undefined}
                                                        onLeave={undefined}
                                                        onEnterKeyPress={undefined}
                                                        ariaLabel={undefined}
                                                        autocomplete={"on"}
                                                        submitWhileEditing={true}
                                                        submitDelay={300}
                                                        ariaRequired={undefined}
                                                        tabIndex={undefined}
                                                        id={DerivedUniqueIdProperty({
                                                            "widgetId": "p28.FeedbackModule.ShareFeedback.textBox1"
                                                        })} />
                                                ]}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Email" }, "args": {} }
                                                    })
                                                ])}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p28.FeedbackModule.ShareFeedback.textBox1"
                                                })}
                                                width={undefined}
                                                orientation={"vertical"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p28.FeedbackModule.ShareFeedback.textBox1"
                                                })} />
                                        ]} />,
                                    <$Container key="p28.FeedbackModule.ShareFeedback.container3"
                                        $widgetId="p28.FeedbackModule.ShareFeedback.container3"
                                        class={"mx-name-container3 flex-row flexcontainer justify-content-end"}
                                        style={{
                                            "gap": "8px"
                                        }}
                                        renderMode={"div"}
                                        onClick={undefined}
                                        content={[
                                            <$ActionButton key="p28.FeedbackModule.ShareFeedback.feedback_cancel"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.feedback_cancel"
                                                buttonId={"p28.FeedbackModule.ShareFeedback.feedback_cancel"}
                                                class={"mx-name-feedback_cancel"}
                                                style={{
                                                    "border": "0"
                                                }}
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
                                                    "action": { "type": "closePage", "argMap": {}, "config": {}, "disabledDuringExecution": true },
                                                    "abortOnServerValidation": true
                                                })} />,
                                            <$ActionButton key="p28.FeedbackModule.ShareFeedback.feedback_clear"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.feedback_clear"
                                                buttonId={"p28.FeedbackModule.ShareFeedback.feedback_clear"}
                                                class={"mx-name-feedback_clear btn-bordered"}
                                                style={undefined}
                                                tabIndex={undefined}
                                                renderType={"button"}
                                                role={undefined}
                                                buttonClass={"btn-default"}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Clear" }, "args": {} }
                                                    })
                                                ])}
                                                tooltip={TextProperty({
                                                    "value": t([
                                                        ""
                                                    ])
                                                })}
                                                icon={undefined}
                                                action={ActionProperty({
                                                    "action": { "type": "callNanoflow", "argMap": { "Feedback": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } }, "config": { "nanoflow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.ACT_Feedback_ClearForm").ACT_Feedback_ClearForm }, "disabledDuringExecution": true },
                                                    "abortOnServerValidation": true
                                                })} />,
                                            <$ActionButton key="p28.FeedbackModule.ShareFeedback.feedback_submit"
                                                $widgetId="p28.FeedbackModule.ShareFeedback.feedback_submit"
                                                buttonId={"p28.FeedbackModule.ShareFeedback.feedback_submit"}
                                                class={"mx-name-feedback_submit"}
                                                style={undefined}
                                                tabIndex={undefined}
                                                renderType={"button"}
                                                role={undefined}
                                                buttonClass={"btn-primary"}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Submit" }, "args": {} }
                                                    })
                                                ])}
                                                tooltip={TextProperty({
                                                    "value": t([
                                                        ""
                                                    ])
                                                })}
                                                icon={undefined}
                                                action={ActionProperty({
                                                    "action": { "type": "callNanoflow", "argMap": { "Feedback": { "widget": "p28.FeedbackModule.ShareFeedback.dataView5", "source": "object" } }, "config": { "nanoflow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.ACT_SubmitFeedback").ACT_SubmitFeedback }, "disabledDuringExecution": true },
                                                    "abortOnServerValidation": true
                                                })} />
                                        ]}
                                        ariaHidden={false} />
                                ]}
                                hideFooter={true}
                                footer={undefined} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Share your feedback"
]);

export const classes = "";

export const cancelChangesOperationId = "cS837hDkEF+kDmgntlp69g";
export const style = {};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
