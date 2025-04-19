import { createElement } from "react";
const React = { createElement };

import { ExpressionProperty } from "mendix/ExpressionProperty";
import { PlaceholderProperty } from "mendix/PlaceholderProperty";

import { Header } from "mendix/widgets/web/Header";
import { Placeholder } from "mendix/widgets/web/Placeholder";
import { ScrollContainer } from "mendix/widgets/web/ScrollContainer";
import { Title } from "mendix/widgets/web/Title";
import { addEnumerations, asPluginWidgets, t } from "mendix";

const { $ScrollContainer, $Header, $Title, $Placeholder } = asPluginWidgets({ ScrollContainer, Header, Title, Placeholder });

const region$Main = [
    <$ScrollContainer key="l18.Atlas_Core.Tablet_TopBar.layoutContainer"
        $widgetId="l18.Atlas_Core.Tablet_TopBar.layoutContainer"
        class={"mx-name-layoutContainer"}
        style={undefined}
        scrollPerRegion={true}
        layoutMode={"sidebar"}
        top={{
            "enabled": true,
            "content": [
                <$Header key="l18.Atlas_Core.Tablet_TopBar.header1"
                    $widgetId="l18.Atlas_Core.Tablet_TopBar.header1"
                    class={"mx-name-header1"}
                    style={undefined}
                    content={[
                        <$Title key="l18.4"
                            $widgetId="l18.4"
                            class={""}
                            style={undefined}
                            caption={ExpressionProperty({
                                "expression": { "expr": { "type": "variable", "variable": "pageTitle" }, "args": {} }
                            })} />
                    ]}
                    leftWidgets={[
                        <$Placeholder key="l18.Atlas_Core.Tablet_TopBar.HeaderLeft"
                            $widgetId="l18.Atlas_Core.Tablet_TopBar.HeaderLeft"
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Tablet_TopBar.HeaderLeft"
                            })} />
                    ]}
                    rightWidgets={[
                        <$Placeholder key="l18.Atlas_Core.Tablet_TopBar.HeaderRight"
                            $widgetId="l18.Atlas_Core.Tablet_TopBar.HeaderRight"
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Tablet_TopBar.HeaderRight"
                            })} />
                    ]} />
            ],
            "sizeMode": "auto",
            "class": "region-topbar"
        }}
        bottom={{
            "enabled": false
        }}
        left={{
            "enabled": false
        }}
        right={{
            "enabled": false
        }}
        center={{
            "content": [
                <$Placeholder key="l18.Atlas_Core.Tablet_TopBar.Main"
                    $widgetId="l18.Atlas_Core.Tablet_TopBar.Main"
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Tablet_TopBar.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
