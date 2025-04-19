import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListAttributeProperty } from "mendix/ListAttributeProperty";
import { ListExpressionProperty } from "mendix/ListExpressionProperty";
import { TemplatedWidgetProperty } from "mendix/TemplatedWidgetProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { Container } from "mendix/widgets/web/Container";
import * as DatagridWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/datagrid/Datagrid.mjs";
const Datagrid = Object.getOwnPropertyDescriptor(DatagridWidgetModule, "Datagrid")?.value || Object.getOwnPropertyDescriptor(DatagridWidgetModule, "default")?.value;   
import * as DatagridDateFilterWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.mjs";
const DatagridDateFilter = Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "DatagridDateFilter")?.value || Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "default")?.value;   
import "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.css";
import * as DatagridTextFilterWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/datagridtextfilter/DatagridTextFilter.mjs";
const DatagridTextFilter = Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "DatagridTextFilter")?.value || Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "default")?.value;   
import { Div } from "mendix/widgets/web/Div";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Container, $Div, $Text, $Datagrid, $DatagridTextFilter, $DatagridDateFilter, $ActionButton } = asPluginWidgets({ Container, Div, Text, Datagrid, DatagridTextFilter, DatagridDateFilter, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Container key="p6.Administration.ActiveSessions.container1"
        $widgetId="p6.Administration.ActiveSessions.container1"
        class={"mx-name-container1 pageheader pageheader-fullwidth"}
        style={undefined}
        renderMode={"div"}
        onClick={undefined}
        content={[
            <$Div key="p6.Administration.ActiveSessions.layoutGrid1"
                $widgetId="p6.Administration.ActiveSessions.layoutGrid1"
                class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                style={undefined}
                content={[
                    <$Div key="p6.Administration.ActiveSessions.layoutGrid1$row0"
                        $widgetId="p6.Administration.ActiveSessions.layoutGrid1$row0"
                        class={"row"}
                        style={undefined}
                        content={[
                            <$Div key="p6.Administration.ActiveSessions.layoutGrid1$row0$column0"
                                $widgetId="p6.Administration.ActiveSessions.layoutGrid1$row0$column0"
                                class={"col-lg-12 col-md-12 col-12"}
                                style={undefined}
                                content={[
                                    <$Text key="p6.Administration.ActiveSessions.label1"
                                        $widgetId="p6.Administration.ActiveSessions.label1"
                                        class={"mx-name-label1 pageheader-title"}
                                        style={undefined}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Active Sessions" }, "args": {} }
                                            })
                                        ])}
                                        renderMode={"h2"} />
                                ]} />
                        ]} />
                ]} />
        ]}
        ariaHidden={false} />,
    <$Div key="p6.Administration.ActiveSessions.layoutGrid2"
        $widgetId="p6.Administration.ActiveSessions.layoutGrid2"
        class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        style={undefined}
        content={[
            <$Div key="p6.Administration.ActiveSessions.layoutGrid2$row0"
                $widgetId="p6.Administration.ActiveSessions.layoutGrid2$row0"
                class={"row"}
                style={undefined}
                content={[
                    <$Div key="p6.Administration.ActiveSessions.layoutGrid2$row0$column0"
                        $widgetId="p6.Administration.ActiveSessions.layoutGrid2$row0$column0"
                        class={"col-lg-12 col-md-12 col-12"}
                        style={undefined}
                        content={[
                            <$Datagrid key="p6.Administration.ActiveSessions.dataGrid21"
                                $widgetId="p6.Administration.ActiveSessions.dataGrid21"
                                advanced={false}
                                datasource={DatabaseObjectListProperty({
                                    "dataSourceId": "p6.10",
                                    "entity": "System.Session",
                                    "operationId": "/g09AX0DRFi6pm9GsuDP/g",
                                    "sort": [
                                        [
                                            "System.Session_User/System.User/Name",
                                            "asc"
                                        ]
                                    ]
                                })}
                                refreshInterval={0}
                                itemSelectionMethod={"checkbox"}
                                showSelectAllToggle={true}
                                columns={[
                                    {
                                        "showContentAs": "attribute",
                                        "attribute": ListAttributeProperty({
                                            "path": "System.Session_User/System.User",
                                            "entity": "System.User",
                                            "attribute": "Name",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p6.10",
                                            "isList": false
                                        }),
                                        "content": undefined,
                                        "dynamicText": t([
                                            undefined
                                        ]),
                                        "header": t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "User name" }, "args": {} }
                                            })
                                        ]),
                                        "tooltip": t([
                                            undefined
                                        ]),
                                        "filter": [
                                            <$DatagridTextFilter key="p6.Administration.ActiveSessions.textFilter1"
                                                $widgetId="p6.Administration.ActiveSessions.textFilter1"
                                                advanced={false}
                                                defaultValue={undefined}
                                                defaultFilter={"contains"}
                                                placeholder={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                adjustable={true}
                                                delay={500}
                                                onChange={undefined}
                                                screenReaderButtonCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                screenReaderInputCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                class={"mx-name-textFilter1"}
                                                style={undefined}
                                                tabIndex={undefined} />
                                        ],
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "wrapText": false,
                                        "minWidth": "auto",
                                        "minWidthLimit": 100,
                                        "exportValue": t([
                                            undefined
                                        ]),
                                        "fetchOptionsLazy": true,
                                        "filterCaptionType": "expression",
                                        "allowEventPropagation": true
                                    },
                                    {
                                        "showContentAs": "dynamicText",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.Session",
                                            "attribute": "LastActive",
                                            "attributeType": "DateTime",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p6.10",
                                            "isList": false
                                        }),
                                        "content": undefined,
                                        "dynamicText": t([
                                            ListExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "LastActive" }, { "type": "literal", "value": "{\"type\":\"datetime\"}" } ] }, "args": { "currentObject": { "widget": "p6.Administration.ActiveSessions.dataGrid21", "source": "object" } } },
                                                "dataSourceId": "p6.10"
                                            })
                                        ]),
                                        "header": t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Last active" }, "args": {} }
                                            })
                                        ]),
                                        "tooltip": t([
                                            undefined
                                        ]),
                                        "filter": [
                                            <$DatagridDateFilter key="p6.Administration.ActiveSessions.dateFilter1"
                                                $widgetId="p6.Administration.ActiveSessions.dateFilter1"
                                                advanced={false}
                                                defaultValue={undefined}
                                                defaultStartDate={undefined}
                                                defaultEndDate={undefined}
                                                defaultFilter={"equal"}
                                                placeholder={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                adjustable={true}
                                                onChange={undefined}
                                                screenReaderButtonCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                screenReaderCalendarCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                screenReaderInputCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                class={"mx-name-dateFilter1"}
                                                style={undefined}
                                                tabIndex={undefined} />
                                        ],
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "wrapText": false,
                                        "minWidth": "auto",
                                        "minWidthLimit": 100,
                                        "exportValue": t([
                                            undefined
                                        ]),
                                        "fetchOptionsLazy": true,
                                        "filterCaptionType": "expression",
                                        "allowEventPropagation": true
                                    },
                                    {
                                        "showContentAs": "customContent",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.Session",
                                            "attribute": "LastActive",
                                            "attributeType": "DateTime",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p6.10",
                                            "isList": false
                                        }),
                                        "content": TemplatedWidgetProperty({
                                            "dataSourceId": "p6.10",
                                            "editable": false,
                                            "children": () => [
                                                <$ActionButton key="p6.Administration.ActiveSessions.actionButton1"
                                                    $widgetId="p6.Administration.ActiveSessions.actionButton1"
                                                    buttonId={"p6.Administration.ActiveSessions.actionButton1"}
                                                    class={"mx-name-actionButton1 btn-lg"}
                                                    style={undefined}
                                                    tabIndex={undefined}
                                                    renderType={"link"}
                                                    role={"button"}
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
                                                        "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-logout" }
                                                    })}
                                                    action={ActionProperty({
                                                        "action": { "type": "deleteObject", "argMap": { "$object": { "widget": "p6.Administration.ActiveSessions.dataGrid21", "source": "object" } }, "config": { "closePage": false, "operationId": "TuiHwy1JrlilW36H+ezDJw" }, "disabledDuringExecution": true },
                                                        "abortOnServerValidation": true
                                                    })} />
                                            ]
                                        }),
                                        "dynamicText": t([
                                            undefined
                                        ]),
                                        "header": t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                            })
                                        ]),
                                        "tooltip": t([
                                            undefined
                                        ]),
                                        "filter": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "sortable": false,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "no",
                                        "width": "autoFit",
                                        "size": 1,
                                        "alignment": "left",
                                        "wrapText": false,
                                        "minWidth": "auto",
                                        "minWidthLimit": 100,
                                        "exportValue": t([
                                            undefined
                                        ]),
                                        "fetchOptionsLazy": true,
                                        "filterCaptionType": "expression",
                                        "allowEventPropagation": true
                                    }
                                ]}
                                columnsFilterable={true}
                                pageSize={20}
                                pagination={"buttons"}
                                pagingPosition={"bottom"}
                                showPagingButtons={"always"}
                                showEmptyPlaceholder={"none"}
                                emptyPlaceholder={undefined}
                                rowClass={undefined}
                                onClick={undefined}
                                onSelectionChange={undefined}
                                columnsSortable={true}
                                columnsResizable={true}
                                columnsDraggable={true}
                                columnsHidable={true}
                                filterList={[]}
                                filtersPlaceholder={undefined}
                                filterSectionTitle={t([
                                    ExpressionProperty({
                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                    })
                                ])}
                                exportDialogLabel={t([
                                    ExpressionProperty({
                                        "expression": { "expr": { "type": "literal", "value": "Export progress" }, "args": {} }
                                    })
                                ])}
                                cancelExportLabel={t([
                                    ExpressionProperty({
                                        "expression": { "expr": { "type": "literal", "value": "Cancel data export" }, "args": {} }
                                    })
                                ])}
                                selectRowLabel={t([
                                    ExpressionProperty({
                                        "expression": { "expr": { "type": "literal", "value": "Select row" }, "args": {} }
                                    })
                                ])}
                                onClickTrigger={"single"}
                                itemSelectionMode={"clear"}
                                loadingType={"spinner"}
                                showNumberOfRows={false}
                                loadMoreButtonCaption={t([
                                    ExpressionProperty({
                                        "expression": { "expr": { "type": "literal", "value": "Load More" }, "args": {} }
                                    })
                                ])}
                                configurationStorageType={"attribute"}
                                storeFiltersInPersonalization={true}
                                class={"mx-name-dataGrid21 table-hover"}
                                style={undefined}
                                tabIndex={undefined} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Active Sessions"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const style = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
