import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ExpressionProperty } from "mendix/ExpressionProperty";

import { Container } from "mendix/widgets/web/Container";
import { Div } from "mendix/widgets/web/Div";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Container, $Div, $Text } = asPluginWidgets({ Container, Div, Text });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Container key="p23.MyFirstModule.Home_Web.container1"
        $widgetId="p23.MyFirstModule.Home_Web.container1"
        class={"mx-name-container1 pageheader"}
        style={undefined}
        renderMode={"div"}
        onClick={undefined}
        content={[
            <$Div key="p23.MyFirstModule.Home_Web.layoutGrid2"
                $widgetId="p23.MyFirstModule.Home_Web.layoutGrid2"
                class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                style={undefined}
                content={[
                    <$Div key="p23.MyFirstModule.Home_Web.layoutGrid2$row0"
                        $widgetId="p23.MyFirstModule.Home_Web.layoutGrid2$row0"
                        class={"row"}
                        style={undefined}
                        content={[
                            <$Div key="p23.MyFirstModule.Home_Web.layoutGrid2$row0$column0"
                                $widgetId="p23.MyFirstModule.Home_Web.layoutGrid2$row0$column0"
                                class={"col-lg col-md col"}
                                style={undefined}
                                content={[
                                    <$Text key="p23.MyFirstModule.Home_Web.text1"
                                        $widgetId="p23.MyFirstModule.Home_Web.text1"
                                        class={"mx-name-text1 pageheader-title spacing-outer-bottom"}
                                        style={undefined}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Welcome To GitMendix App" }, "args": {} }
                                            })
                                        ])}
                                        renderMode={"h3"} />,
                                    <$Text key="p23.MyFirstModule.Home_Web.text3"
                                        $widgetId="p23.MyFirstModule.Home_Web.text3"
                                        class={"mx-name-text3 pageheader-subtitle text-detail"}
                                        style={undefined}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "This App is Stored In GitHub\r\n" }, "args": {} }
                                            })
                                        ])}
                                        renderMode={"p"} />
                                ]} />
                        ]} />
                ]} />
        ]}
        ariaHidden={false} />,
    <$Div key="p23.MyFirstModule.Home_Web.layoutGrid1"
        $widgetId="p23.MyFirstModule.Home_Web.layoutGrid1"
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        style={undefined}
        content={[
            <$Div key="p23.MyFirstModule.Home_Web.layoutGrid1$row0"
                $widgetId="p23.MyFirstModule.Home_Web.layoutGrid1$row0"
                class={"row"}
                style={undefined}
                content={[
                    <$Div key="p23.MyFirstModule.Home_Web.layoutGrid1$row0$column0"
                        $widgetId="p23.MyFirstModule.Home_Web.layoutGrid1$row0$column0"
                        class={"col-lg col-md col"}
                        style={undefined}
                        content={undefined} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Homepage"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const style = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
