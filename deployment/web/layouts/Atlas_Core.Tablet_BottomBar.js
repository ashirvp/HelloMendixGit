import { createElement } from "react";
const React = { createElement };

import { PlaceholderProperty } from "mendix/PlaceholderProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { Placeholder } from "mendix/widgets/web/Placeholder";
import { ScrollContainer } from "mendix/widgets/web/ScrollContainer";
import { SimpleMenuBar } from "mendix/widgets/web/SimpleMenuBar";
import { addEnumerations, asPluginWidgets, t } from "mendix";

const { $ScrollContainer, $SimpleMenuBar, $Placeholder } = asPluginWidgets({ ScrollContainer, SimpleMenuBar, Placeholder });

const region$Main = [
    <$ScrollContainer key="l14.Atlas_Core.Tablet_BottomBar.layoutContainer"
        $widgetId="l14.Atlas_Core.Tablet_BottomBar.layoutContainer"
        class={"mx-name-layoutContainer"}
        style={undefined}
        scrollPerRegion={true}
        layoutMode={"sidebar"}
        top={{
            "enabled": false
        }}
        bottom={{
            "enabled": true,
            "content": [
                <$SimpleMenuBar key="l14.Atlas_Core.Tablet_BottomBar.simpleMenuBar1"
                    $widgetId="l14.Atlas_Core.Tablet_BottomBar.simpleMenuBar1"
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
            "enabled": false
        }}
        center={{
            "content": [
                <$Placeholder key="l14.Atlas_Core.Tablet_BottomBar.Main"
                    $widgetId="l14.Atlas_Core.Tablet_BottomBar.Main"
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Tablet_BottomBar.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
