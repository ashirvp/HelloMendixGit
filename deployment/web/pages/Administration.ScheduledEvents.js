import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListAttributeProperty } from "mendix/ListAttributeProperty";
import { ListExpressionProperty } from "mendix/ListExpressionProperty";
import { TemplatedWidgetProperty } from "mendix/TemplatedWidgetProperty";

import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { Container } from "mendix/widgets/web/Container";
import * as DatagridWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/datagrid/Datagrid.mjs";
const Datagrid = Object.getOwnPropertyDescriptor(DatagridWidgetModule, "Datagrid")?.value || Object.getOwnPropertyDescriptor(DatagridWidgetModule, "default")?.value;   
import * as DatagridDateFilterWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.mjs";
const DatagridDateFilter = Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "DatagridDateFilter")?.value || Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "default")?.value;   
import "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.css";
import * as DatagridDropdownFilterWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/datagriddropdownfilter/DatagridDropdownFilter.mjs";
const DatagridDropdownFilter = Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "DatagridDropdownFilter")?.value || Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "default")?.value;   
import * as DatagridTextFilterWidgetModule from "C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/widgets/com/mendix/widget/web/datagridtextfilter/DatagridTextFilter.mjs";
const DatagridTextFilter = Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "DatagridTextFilter")?.value || Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "default")?.value;   
import { Div } from "mendix/widgets/web/Div";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Container, $Div, $Text, $Datagrid, $DatagridTextFilter, $DatagridDateFilter, $ConditionalVisibilityWrapper, $DatagridDropdownFilter } = asPluginWidgets({ Container, Div, Text, Datagrid, DatagridTextFilter, DatagridDateFilter, ConditionalVisibilityWrapper, DatagridDropdownFilter });

addEnumerations({
    "System.EventStatus": [
        [
            "Running",
            t([
                "Running"
            ])
        ],
        [
            "Completed",
            t([
                "Completed"
            ])
        ],
        [
            "Error",
            t([
                "Error"
            ])
        ],
        [
            "Stopped",
            t([
                "Stopped"
            ])
        ]
    ]
});

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Container key="p21.Administration.ScheduledEvents.container1"
        $widgetId="p21.Administration.ScheduledEvents.container1"
        class={"mx-name-container1 pageheader pageheader-fullwidth"}
        style={undefined}
        renderMode={"div"}
        onClick={undefined}
        content={[
            <$Div key="p21.Administration.ScheduledEvents.layoutGrid1"
                $widgetId="p21.Administration.ScheduledEvents.layoutGrid1"
                class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                style={undefined}
                content={[
                    <$Div key="p21.Administration.ScheduledEvents.layoutGrid1$row0"
                        $widgetId="p21.Administration.ScheduledEvents.layoutGrid1$row0"
                        class={"row"}
                        style={undefined}
                        content={[
                            <$Div key="p21.Administration.ScheduledEvents.layoutGrid1$row0$column0"
                                $widgetId="p21.Administration.ScheduledEvents.layoutGrid1$row0$column0"
                                class={"col-lg-12 col-md-12 col-12"}
                                style={undefined}
                                content={[
                                    <$Text key="p21.Administration.ScheduledEvents.label1"
                                        $widgetId="p21.Administration.ScheduledEvents.label1"
                                        class={"mx-name-label1 pageheader-title"}
                                        style={undefined}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Scheduled Events" }, "args": {} }
                                            })
                                        ])}
                                        renderMode={"h2"} />
                                ]} />
                        ]} />
                ]} />
        ]}
        ariaHidden={false} />,
    <$Div key="p21.Administration.ScheduledEvents.layoutGrid2"
        $widgetId="p21.Administration.ScheduledEvents.layoutGrid2"
        class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        style={undefined}
        content={[
            <$Div key="p21.Administration.ScheduledEvents.layoutGrid2$row0"
                $widgetId="p21.Administration.ScheduledEvents.layoutGrid2$row0"
                class={"row"}
                style={undefined}
                content={[
                    <$Div key="p21.Administration.ScheduledEvents.layoutGrid2$row0$column0"
                        $widgetId="p21.Administration.ScheduledEvents.layoutGrid2$row0$column0"
                        class={"col-lg-12 col-md-12 col-12"}
                        style={undefined}
                        content={[
                            <$Datagrid key="p21.Administration.ScheduledEvents.dataGrid21"
                                $widgetId="p21.Administration.ScheduledEvents.dataGrid21"
                                advanced={false}
                                datasource={DatabaseObjectListProperty({
                                    "dataSourceId": "p21.10",
                                    "entity": "System.ScheduledEventInformation",
                                    "operationId": "LtLmdoc5V1+0sOBCHtjS1Q",
                                    "sort": [
                                        [
                                            "StartTime",
                                            "desc"
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
                                            "path": "",
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "Name",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p21.10",
                                            "isList": false
                                        }),
                                        "content": undefined,
                                        "dynamicText": t([
                                            undefined
                                        ]),
                                        "header": t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Name" }, "args": {} }
                                            })
                                        ]),
                                        "tooltip": t([
                                            undefined
                                        ]),
                                        "filter": [
                                            <$DatagridTextFilter key="p21.Administration.ScheduledEvents.textFilter1"
                                                $widgetId="p21.Administration.ScheduledEvents.textFilter1"
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
                                        "showContentAs": "attribute",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "Description",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p21.10",
                                            "isList": false
                                        }),
                                        "content": undefined,
                                        "dynamicText": t([
                                            undefined
                                        ]),
                                        "header": t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Description" }, "args": {} }
                                            })
                                        ]),
                                        "tooltip": t([
                                            undefined
                                        ]),
                                        "filter": [
                                            <$DatagridTextFilter key="p21.Administration.ScheduledEvents.textFilter2"
                                                $widgetId="p21.Administration.ScheduledEvents.textFilter2"
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
                                                class={"mx-name-textFilter2"}
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
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "StartTime",
                                            "attributeType": "DateTime",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p21.10",
                                            "isList": false
                                        }),
                                        "content": undefined,
                                        "dynamicText": t([
                                            ListExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "StartTime" }, { "type": "literal", "value": "{\"type\":\"datetime\"}" } ] }, "args": { "currentObject": { "widget": "p21.Administration.ScheduledEvents.dataGrid21", "source": "object" } } },
                                                "dataSourceId": "p21.10"
                                            })
                                        ]),
                                        "header": t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Start time" }, "args": {} }
                                            })
                                        ]),
                                        "tooltip": t([
                                            undefined
                                        ]),
                                        "filter": [
                                            <$DatagridDateFilter key="p21.Administration.ScheduledEvents.dateFilter1"
                                                $widgetId="p21.Administration.ScheduledEvents.dateFilter1"
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
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "Status",
                                            "attributeType": "Enum",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p21.10",
                                            "isList": false
                                        }),
                                        "content": TemplatedWidgetProperty({
                                            "dataSourceId": "p21.10",
                                            "editable": false,
                                            "children": () => [
                                                <$ConditionalVisibilityWrapper key="p21.Administration.ScheduledEvents.text2$visibility"
                                                    $widgetId="p21.Administration.ScheduledEvents.text2$visibility"
                                                    visible={ExpressionProperty({
                                                        "expression": { "expr": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Status" }, { "type": "literal", "value": "Running" } ] }, "args": { "currentObject": { "widget": "p21.Administration.ScheduledEvents.dataGrid21", "source": "object" } } }
                                                    })}
                                                    contents={[
                                                        <$Text key="p21.Administration.ScheduledEvents.text2"
                                                            $widgetId="p21.Administration.ScheduledEvents.text2"
                                                            class={"mx-name-text2 badge label-primary"}
                                                            style={undefined}
                                                            caption={t([
                                                                ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Running" }, "args": {} }
                                                                })
                                                            ])}
                                                            renderMode={"span"} />
                                                    ]} />,
                                                <$ConditionalVisibilityWrapper key="p21.Administration.ScheduledEvents.text1$visibility"
                                                    $widgetId="p21.Administration.ScheduledEvents.text1$visibility"
                                                    visible={ExpressionProperty({
                                                        "expression": { "expr": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Status" }, { "type": "literal", "value": "Completed" } ] }, "args": { "currentObject": { "widget": "p21.Administration.ScheduledEvents.dataGrid21", "source": "object" } } }
                                                    })}
                                                    contents={[
                                                        <$Text key="p21.Administration.ScheduledEvents.text1"
                                                            $widgetId="p21.Administration.ScheduledEvents.text1"
                                                            class={"mx-name-text1 badge label-success"}
                                                            style={undefined}
                                                            caption={t([
                                                                ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Completed" }, "args": {} }
                                                                })
                                                            ])}
                                                            renderMode={"span"} />
                                                    ]} />,
                                                <$ConditionalVisibilityWrapper key="p21.Administration.ScheduledEvents.text3$visibility"
                                                    $widgetId="p21.Administration.ScheduledEvents.text3$visibility"
                                                    visible={ExpressionProperty({
                                                        "expression": { "expr": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Status" }, { "type": "literal", "value": "Error" } ] }, "args": { "currentObject": { "widget": "p21.Administration.ScheduledEvents.dataGrid21", "source": "object" } } }
                                                    })}
                                                    contents={[
                                                        <$Text key="p21.Administration.ScheduledEvents.text3"
                                                            $widgetId="p21.Administration.ScheduledEvents.text3"
                                                            class={"mx-name-text3 badge label-danger"}
                                                            style={undefined}
                                                            caption={t([
                                                                ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Error" }, "args": {} }
                                                                })
                                                            ])}
                                                            renderMode={"span"} />
                                                    ]} />,
                                                <$ConditionalVisibilityWrapper key="p21.Administration.ScheduledEvents.text4$visibility"
                                                    $widgetId="p21.Administration.ScheduledEvents.text4$visibility"
                                                    visible={ExpressionProperty({
                                                        "expression": { "expr": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Status" }, { "type": "literal", "value": "Stopped" } ] }, "args": { "currentObject": { "widget": "p21.Administration.ScheduledEvents.dataGrid21", "source": "object" } } }
                                                    })}
                                                    contents={[
                                                        <$Text key="p21.Administration.ScheduledEvents.text4"
                                                            $widgetId="p21.Administration.ScheduledEvents.text4"
                                                            class={"mx-name-text4 badge label-secondary"}
                                                            style={undefined}
                                                            caption={t([
                                                                ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Stopped" }, "args": {} }
                                                                })
                                                            ])}
                                                            renderMode={"span"} />
                                                    ]} />
                                            ]
                                        }),
                                        "dynamicText": t([
                                            undefined
                                        ]),
                                        "header": t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Status" }, "args": {} }
                                            })
                                        ]),
                                        "tooltip": t([
                                            undefined
                                        ]),
                                        "filter": [
                                            <$DatagridDropdownFilter key="p21.Administration.ScheduledEvents.drop_downFilter1"
                                                $widgetId="p21.Administration.ScheduledEvents.drop_downFilter1"
                                                auto={true}
                                                defaultValue={undefined}
                                                filterOptions={[]}
                                                emptyOptionCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                multiSelect={false}
                                                onChange={undefined}
                                                ariaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })
                                                ])}
                                                filterable={false}
                                                clearable={true}
                                                selectedItemsStyle={"text"}
                                                selectionMethod={"checkbox"}
                                                class={"mx-name-drop_downFilter1"}
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
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "EndTime",
                                            "attributeType": "DateTime",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p21.10",
                                            "isList": false
                                        }),
                                        "content": undefined,
                                        "dynamicText": t([
                                            ListExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "EndTime" }, { "type": "literal", "value": "{\"type\":\"datetime\"}" } ] }, "args": { "currentObject": { "widget": "p21.Administration.ScheduledEvents.dataGrid21", "source": "object" } } },
                                                "dataSourceId": "p21.10"
                                            })
                                        ]),
                                        "header": t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "End time" }, "args": {} }
                                            })
                                        ]),
                                        "tooltip": t([
                                            undefined
                                        ]),
                                        "filter": [
                                            <$DatagridDateFilter key="p21.Administration.ScheduledEvents.dateFilter2"
                                                $widgetId="p21.Administration.ScheduledEvents.dateFilter2"
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
                                                class={"mx-name-dateFilter2"}
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
                                class={"mx-name-dataGrid21"}
                                style={undefined}
                                tabIndex={undefined} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Scheduled Events"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const style = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
