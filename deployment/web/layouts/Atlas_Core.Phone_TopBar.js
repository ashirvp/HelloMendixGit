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
    <$ScrollContainer key="l13.Atlas_Core.Phone_TopBar.scrollContainer1"
        $widgetId="l13.Atlas_Core.Phone_TopBar.scrollContainer1"
        class={"mx-name-scrollContainer1"}
        style={undefined}
        scrollPerRegion={true}
        layoutMode={"headline"}
        top={{
            "enabled": true,
            "content": [
                <$Header key="l13.Atlas_Core.Phone_TopBar.header1"
                    $widgetId="l13.Atlas_Core.Phone_TopBar.header1"
                    class={"mx-name-header1"}
                    style={undefined}
                    content={[
                        <$Title key="l13.4"
                            $widgetId="l13.4"
                            class={""}
                            style={undefined}
                            caption={ExpressionProperty({
                                "expression": { "expr": { "type": "variable", "variable": "pageTitle" }, "args": {} }
                            })} />
                    ]}
                    leftWidgets={[
                        <$Placeholder key="l13.Atlas_Core.Phone_TopBar.HeaderLeft"
                            $widgetId="l13.Atlas_Core.Phone_TopBar.HeaderLeft"
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Phone_TopBar.HeaderLeft"
                            })} />
                    ]}
                    rightWidgets={[
                        <$Placeholder key="l13.Atlas_Core.Phone_TopBar.HeaderRight"
                            $widgetId="l13.Atlas_Core.Phone_TopBar.HeaderRight"
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Phone_TopBar.HeaderRight"
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
                <$Placeholder key="l13.Atlas_Core.Phone_TopBar.Main"
                    $widgetId="l13.Atlas_Core.Phone_TopBar.Main"
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Phone_TopBar.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
