import { reactExports, asPluginWidgets, selectTranslation } from '../index-C0bqjiJG.js';
import { PageFragment, ExpressionProperty } from '../ScrollContainer-C0iuIrQQ.js';
import { ActionButton, TextProperty, ActionProperty } from '../ActionButton-CJv0U8vt.js';
import { AssociationObjectProperty } from '../AssociationObjectProperty-CbKn2w_s.js';
import { WebStaticImageProperty } from '../WebStaticImageProperty-DZbv-db_.js';
import { ImageWidgetModule, Container, Text } from '../Image-BatSpsjW.js';
import { DataView } from '../DataView-yzTqzj-d.js';
import { Div } from '../Div-CApKa9DK.js';
import { content as content$1 } from '../Atlas_Core.PopupLayout-DY2UU0mX.js';
import '../InlineText-BfcY53sg.js';
import '../CD0QimeZ-DAlMyu7v.js';

const React = { createElement: reactExports.createElement };
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.value || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.value;
const { $Div, $DataView, $Container, $Image, $Text, $ActionButton } = asPluginWidgets({ Div, DataView, Container, Image, Text, ActionButton });
const region$Main = (historyId) => /* @__PURE__ */ React.createElement(PageFragment, { renderKey: historyId }, [
  /* @__PURE__ */ React.createElement(
    $Div,
    {
      key: "p26.FeedbackModule.PopupSuccess.layoutGrid1",
      $widgetId: "p26.FeedbackModule.PopupSuccess.layoutGrid1",
      class: "mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid",
      style: void 0,
      content: [
        /* @__PURE__ */ React.createElement(
          $Div,
          {
            key: "p26.FeedbackModule.PopupSuccess.layoutGrid1$row0",
            $widgetId: "p26.FeedbackModule.PopupSuccess.layoutGrid1$row0",
            class: "row",
            style: void 0,
            content: [
              /* @__PURE__ */ React.createElement(
                $Div,
                {
                  key: "p26.FeedbackModule.PopupSuccess.layoutGrid1$row0$column0",
                  $widgetId: "p26.FeedbackModule.PopupSuccess.layoutGrid1$row0$column0",
                  class: "col-lg col-md col",
                  style: void 0,
                  content: [
                    /* @__PURE__ */ React.createElement(
                      $DataView,
                      {
                        key: "p26.FeedbackModule.PopupSuccess.dataView1",
                        $widgetId: "p26.FeedbackModule.PopupSuccess.dataView1",
                        class: "mx-name-dataView1 form-vertical",
                        style: void 0,
                        tabIndex: void 0,
                        object: AssociationObjectProperty({
                          "dataSourceId": "p26.10",
                          "scope": "$Response",
                          "editable": true
                        }),
                        emptyMessage: TextProperty({
                          "value": selectTranslation([
                            ""
                          ])
                        }),
                        body: [
                          /* @__PURE__ */ React.createElement(
                            $Container,
                            {
                              key: "p26.FeedbackModule.PopupSuccess.container1",
                              $widgetId: "p26.FeedbackModule.PopupSuccess.container1",
                              class: "mx-name-container1",
                              style: void 0,
                              renderMode: "div",
                              onClick: void 0,
                              content: [
                                /* @__PURE__ */ React.createElement(
                                  $Image,
                                  {
                                    key: "p26.FeedbackModule.PopupSuccess.image1",
                                    $widgetId: "p26.FeedbackModule.PopupSuccess.image1",
                                    datasource: "image",
                                    imageObject: WebStaticImageProperty({
                                      "image": { "uri": "img/FeedbackModule$Images$Success.png" }
                                    }),
                                    defaultImageDynamic: void 0,
                                    imageUrl: selectTranslation([
                                      ExpressionProperty({
                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                      })
                                    ]),
                                    imageIcon: void 0,
                                    isBackgroundImage: false,
                                    children: void 0,
                                    onClickType: "action",
                                    onClick: void 0,
                                    alternativeText: selectTranslation([
                                      ExpressionProperty({
                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                      })
                                    ]),
                                    widthUnit: "auto",
                                    width: 100,
                                    heightUnit: "pixels",
                                    height: 240,
                                    iconSize: 14,
                                    displayAs: "fullImage",
                                    responsive: true,
                                    class: "mx-name-image1 img-center",
                                    style: void 0,
                                    tabIndex: void 0
                                  }
                                ),
                                /* @__PURE__ */ React.createElement(
                                  $Text,
                                  {
                                    key: "p26.FeedbackModule.PopupSuccess.text1",
                                    $widgetId: "p26.FeedbackModule.PopupSuccess.text1",
                                    class: "mx-name-text1 text-center d-block spacing-outer-top-large spacing-outer-bottom-medium",
                                    style: void 0,
                                    caption: selectTranslation([
                                      ExpressionProperty({
                                        "expression": { "expr": { "type": "literal", "value": "Thanks for sharing your feedback with us!" }, "args": {} }
                                      })
                                    ]),
                                    renderMode: "h3"
                                  }
                                ),
                                /* @__PURE__ */ React.createElement(
                                  $ActionButton,
                                  {
                                    key: "p26.FeedbackModule.PopupSuccess.actionButton2",
                                    $widgetId: "p26.FeedbackModule.PopupSuccess.actionButton2",
                                    buttonId: "p26.FeedbackModule.PopupSuccess.actionButton2",
                                    class: "mx-name-actionButton2 d-block center-block",
                                    style: void 0,
                                    tabIndex: void 0,
                                    renderType: "button",
                                    role: void 0,
                                    buttonClass: "btn-primary",
                                    caption: selectTranslation([
                                      ExpressionProperty({
                                        "expression": { "expr": { "type": "literal", "value": "View your feedback" }, "args": {} }
                                      })
                                    ]),
                                    tooltip: TextProperty({
                                      "value": selectTranslation([
                                        ""
                                      ])
                                    }),
                                    icon: void 0,
                                    action: ActionProperty({
                                      "action": { "type": "openLink", "argMap": { "$object": { "widget": "$Response", "source": "object" } }, "config": { "schema": "web", "addressAttribute": "FeedbackModule.ResponseHelper/URL" }, "disabledDuringExecution": true },
                                      "abortOnServerValidation": true
                                    })
                                  }
                                )
                              ],
                              ariaHidden: false
                            }
                          )
                        ],
                        hideFooter: true,
                        footer: void 0
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  )
]);
const title = selectTranslation([
  "Feedback Submitted"
]);
const classes = "";
const cancelChangesOperationId = "aI632gLX016xaGBI5OW9Hw";
const style = {};
const content = {
  ...content$1,
  "Atlas_Core.PopupLayout.Main": region$Main
};

export { cancelChangesOperationId, classes, content, style, title };
