import { createElement } from "react";
const React = { createElement };

import { ExpressionProperty } from "mendix/ExpressionProperty";
import { PlaceholderProperty } from "mendix/PlaceholderProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { Header } from "mendix/widgets/web/Header";
import { Placeholder } from "mendix/widgets/web/Placeholder";
import { ScrollContainer } from "mendix/widgets/web/ScrollContainer";
import { SimpleMenuBar } from "mendix/widgets/web/SimpleMenuBar";
import { Title } from "mendix/widgets/web/Title";
import { addEnumerations, asPluginWidgets, t } from "mendix";

const { $ScrollContainer, $Header, $Title, $Placeholder, $SimpleMenuBar } = asPluginWidgets({ ScrollContainer, Header, Title, Placeholder, SimpleMenuBar });

const region$Main = [
    <$ScrollContainer key="l16.Atlas_Core.Tablet_Split_Right.layoutContainer"
        $widgetId="l16.Atlas_Core.Tablet_Split_Right.layoutContainer"
        class={"mx-name-layoutContainer"}
        style={undefined}
        scrollPerRegion={true}
        layoutMode={"headline"}
        top={{
            "enabled": true,
            "content": [
                <$Header key="l16.Atlas_Core.Tablet_Split_Right.header1"
                    $widgetId="l16.Atlas_Core.Tablet_Split_Right.header1"
                    class={"mx-name-header1"}
                    style={undefined}
                    content={[
                        <$Title key="l16.4"
                            $widgetId="l16.4"
                            class={""}
                            style={undefined}
                            caption={ExpressionProperty({
                                "expression": { "expr": { "type": "variable", "variable": "pageTitle" }, "args": {} }
                            })} />
                    ]}
                    leftWidgets={[
                        <$Placeholder key="l16.Atlas_Core.Tablet_Split_Right.HeaderLeft"
                            $widgetId="l16.Atlas_Core.Tablet_Split_Right.HeaderLeft"
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Tablet_Split_Right.HeaderLeft"
                            })} />
                    ]}
                    rightWidgets={[
                        <$Placeholder key="l16.Atlas_Core.Tablet_Split_Right.HeaderRight"
                            $widgetId="l16.Atlas_Core.Tablet_Split_Right.HeaderRight"
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Tablet_Split_Right.HeaderRight"
                            })} />
                    ]} />
            ],
            "sizeMode": "auto",
            "class": "region-topbar"
        }}
        bottom={{
            "enabled": true,
            "content": [
                <$SimpleMenuBar key="l16.Atlas_Core.Tablet_Split_Right.simpleMenuBar1"
                    $widgetId="l16.Atlas_Core.Tablet_Split_Right.simpleMenuBar1"
                    class={"mx-name-simpleMenuBar1 bottom-nav-text-icons"}
                    style={undefined}
                    menu={[
                        {
                            "caption": TextProperty({
                                "value": t([
                                    "Home"
                                ])
                            }),
                            "icon": WebIconProperty({
                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-home" }
                            }),
                            "action": undefined
                        },
                        {
                            "caption": TextProperty({
                                "value": t([
                                    "Layouts"
                                ])
                            }),
                            "icon": WebIconProperty({
                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-layout-2" }
                            }),
                            "action": undefined
                        },
                        {
                            "caption": TextProperty({
                                "value": t([
                                    "Templates"
                                ])
                            }),
                            "icon": WebIconProperty({
                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-notes-paper-text" }
                            }),
                            "action": undefined
                        },
                        {
                            "caption": TextProperty({
                                "value": t([
                                    "Widgets"
                                ])
                            }),
                            "icon": WebIconProperty({
                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-cog" }
                            }),
                            "action": undefined
                        }
                    ]}
                    orientation={"horizontal"} />
            ],
            "sizeMode": "auto",
            "class": "region-bottombar"
        }}
        left={{
            "enabled": false
        }}
        right={{
            "enabled": true,
            "content": [
                <$Placeholder key="l16.Atlas_Core.Tablet_Split_Right.Right"
                    $widgetId="l16.Atlas_Core.Tablet_Split_Right.Right"
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Tablet_Split_Right.Right"
                    })} />
            ],
            "sizeMode": "pixels",
            "sizeValue": 375,
            "class": "",
            "toggleMode": "none",
            "initiallyOpen": false
        }}
        center={{
            "content": [
                <$Placeholder key="l16.Atlas_Core.Tablet_Split_Right.Main"
                    $widgetId="l16.Atlas_Core.Tablet_Split_Right.Main"
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Tablet_Split_Right.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
