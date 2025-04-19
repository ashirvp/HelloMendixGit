import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectProperty } from "mendix/AssociationObjectProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebStaticImageProperty } from "mendix/WebStaticImageProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { Container } from "mendix/widgets/web/Container";
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import * as ImageWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.value || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.value;   
import "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $Div, $DataView, $Container, $Image, $Text, $ActionButton } = asPluginWidgets({ Div, DataView, Container, Image, Text, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key="p26.FeedbackModule.PopupSuccess.layoutGrid1"
        $widgetId="p26.FeedbackModule.PopupSuccess.layoutGrid1"
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        style={undefined}
        content={[
            <$Div key="p26.FeedbackModule.PopupSuccess.layoutGrid1$row0"
                $widgetId="p26.FeedbackModule.PopupSuccess.layoutGrid1$row0"
                class={"row"}
                style={undefined}
                content={[
                    <$Div key="p26.FeedbackModule.PopupSuccess.layoutGrid1$row0$column0"
                        $widgetId="p26.FeedbackModule.PopupSuccess.layoutGrid1$row0$column0"
                        class={"col-lg col-md col"}
                        style={undefined}
                        content={[
                            <$DataView key="p26.FeedbackModule.PopupSuccess.dataView1"
                                $widgetId="p26.FeedbackModule.PopupSuccess.dataView1"
                                class={"mx-name-dataView1 form-vertical"}
                                style={undefined}
                                tabIndex={undefined}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p26.10",
                                    "scope": "$Response",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": t([
                                        ""
                                    ])
                                })}
                                body={[
                                    <$Container key="p26.FeedbackModule.PopupSuccess.container1"
                                        $widgetId="p26.FeedbackModule.PopupSuccess.container1"
                                        class={"mx-name-container1"}
                                        style={undefined}
                                        renderMode={"div"}
                                        onClick={undefined}
                                        content={[
                                            <$Image key="p26.FeedbackModule.PopupSuccess.image1"
                                                $widgetId="p26.FeedbackModule.PopupSuccess.image1"
                                                datasource={"image"}
                                                imageObject={WebStaticImageProperty({
                                                    "image": { "uri": "img/FeedbackModule$Images$Success.png" }
                                                })}
                                                defaultImageDynamic={undefined}
                                                imageUrl={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                imageIcon={undefined}
                                                isBackgroundImage={false}
                                                children={undefined}
                                                onClickType={"action"}
                                                onClick={undefined}
                                                alternativeText={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                widthUnit={"auto"}
                                                width={100}
                                                heightUnit={"pixels"}
                                                height={240}
                                                iconSize={14}
                                                displayAs={"fullImage"}
                                                responsive={true}
                                                class={"mx-name-image1 img-center"}
                                                style={undefined}
                                                tabIndex={undefined} />,
                                            <$Text key="p26.FeedbackModule.PopupSuccess.text1"
                                                $widgetId="p26.FeedbackModule.PopupSuccess.text1"
                                                class={"mx-name-text1 text-center d-block spacing-outer-top-large spacing-outer-bottom-medium"}
                                                style={undefined}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Thanks for sharing your feedback with us!" }, "args": {} }
                                                    })
                                                ])}
                                                renderMode={"h3"} />,
                                            <$ActionButton key="p26.FeedbackModule.PopupSuccess.actionButton2"
                                                $widgetId="p26.FeedbackModule.PopupSuccess.actionButton2"
                                                buttonId={"p26.FeedbackModule.PopupSuccess.actionButton2"}
                                                class={"mx-name-actionButton2 d-block center-block"}
                                                style={undefined}
                                                tabIndex={undefined}
                                                renderType={"button"}
                                                role={undefined}
                                                buttonClass={"btn-primary"}
                                                caption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "View your feedback" }, "args": {} }
                                                    })
                                                ])}
                                                tooltip={TextProperty({
                                                    "value": t([
                                                        ""
                                                    ])
                                                })}
                                                icon={undefined}
                                                action={ActionProperty({
                                                    "action": { "type": "openLink", "argMap": { "$object": { "widget": "$Response", "source": "object" } }, "config": { "schema": "web", "addressAttribute": "FeedbackModule.ResponseHelper/URL" }, "disabledDuringExecution": true },
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
    "Feedback Submitted"
]);

export const classes = "";

export const cancelChangesOperationId = "aI632gLX016xaGBI5OW9Hw";
export const style = {};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
