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
    <$ScrollContainer key="l19.Atlas_Core.Tablet_Split_Left.layoutContainer"
        $widgetId="l19.Atlas_Core.Tablet_Split_Left.layoutContainer"
        class={"mx-name-layoutContainer"}
        style={undefined}
        scrollPerRegion={true}
        layoutMode={"headline"}
        top={{
            "enabled": true,
            "content": [
                <$Header key="l19.Atlas_Core.Tablet_Split_Left.header1"
                    $widgetId="l19.Atlas_Core.Tablet_Split_Left.header1"
                    class={"mx-name-header1"}
                    style={undefined}
                    content={[
                        <$Title key="l19.4"
                            $widgetId="l19.4"
                            class={""}
                            style={undefined}
                            caption={ExpressionProperty({
                                "expression": { "expr": { "type": "variable", "variable": "pageTitle" }, "args": {} }
                            })} />
                    ]}
                    leftWidgets={[
                        <$Placeholder key="l19.Atlas_Core.Tablet_Split_Left.HeaderLeft"
                            $widgetId="l19.Atlas_Core.Tablet_Split_Left.HeaderLeft"
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Tablet_Split_Left.HeaderLeft"
                            })} />
                    ]}
                    rightWidgets={[
                        <$Placeholder key="l19.Atlas_Core.Tablet_Split_Left.HeaderRight"
                            $widgetId="l19.Atlas_Core.Tablet_Split_Left.HeaderRight"
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Tablet_Split_Left.HeaderRight"
                            })} />
                    ]} />
            ],
            "sizeMode": "auto",
            "class": "region-topbar"
        }}
        bottom={{
            "enabled": true,
            "content": [
                <$SimpleMenuBar key="l19.Atlas_Core.Tablet_Split_Left.simpleMenuBar1"
                    $widgetId="l19.Atlas_Core.Tablet_Split_Left.simpleMenuBar1"
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
            "enabled": true,
            "content": [
                <$Placeholder key="l19.Atlas_Core.Tablet_Split_Left.Left"
                    $widgetId="l19.Atlas_Core.Tablet_Split_Left.Left"
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Tablet_Split_Left.Left"
                    })} />
            ],
            "sizeMode": "pixels",
            "sizeValue": 375,
            "class": "region-left",
            "toggleMode": "none",
            "initiallyOpen": false
        }}
        right={{
            "enabled": false
        }}
        center={{
            "content": [
                <$Placeholder key="l19.Atlas_Core.Tablet_Split_Left.Main"
                    $widgetId="l19.Atlas_Core.Tablet_Split_Left.Main"
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Tablet_Split_Left.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
