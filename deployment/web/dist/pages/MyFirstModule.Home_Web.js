import { reactExports, asPluginWidgets, selectTranslation } from '../index-C0bqjiJG.js';
import { PageFragment, ExpressionProperty } from '../ScrollContainer-C0iuIrQQ.js';
import { Container, Text } from '../Image-BatSpsjW.js';
import { Div } from '../Div-CApKa9DK.js';
import { content as content$1 } from '../Atlas_Core.Atlas_Default-BAxQCfHV.js';
import '../InlineText-BfcY53sg.js';
import '../ActionButton-CJv0U8vt.js';
import '../BH5qNKCa-B8rdn7Fj.js';
import '../BrzhM9fk-CigoUw5u.js';
import '../ListExpressionProperty-DwtPWMnL.js';
import '../WebIconProperty-BrGhUliV.js';
import '../WebStaticImageProperty-DZbv-db_.js';

const React = { createElement: reactExports.createElement };
const { $Container, $Div, $Text } = asPluginWidgets({ Container, Div, Text });
const region$Main = (historyId) => /* @__PURE__ */ React.createElement(PageFragment, { renderKey: historyId }, [
  /* @__PURE__ */ React.createElement(
    $Container,
    {
      key: "p23.MyFirstModule.Home_Web.container1",
      $widgetId: "p23.MyFirstModule.Home_Web.container1",
      class: "mx-name-container1 pageheader",
      style: void 0,
      renderMode: "div",
      onClick: void 0,
      content: [
        /* @__PURE__ */ React.createElement(
          $Div,
          {
            key: "p23.MyFirstModule.Home_Web.layoutGrid2",
            $widgetId: "p23.MyFirstModule.Home_Web.layoutGrid2",
            class: "mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid container-fluid",
            style: void 0,
            content: [
              /* @__PURE__ */ React.createElement(
                $Div,
                {
                  key: "p23.MyFirstModule.Home_Web.layoutGrid2$row0",
                  $widgetId: "p23.MyFirstModule.Home_Web.layoutGrid2$row0",
                  class: "row",
                  style: void 0,
                  content: [
                    /* @__PURE__ */ React.createElement(
                      $Div,
                      {
                        key: "p23.MyFirstModule.Home_Web.layoutGrid2$row0$column0",
                        $widgetId: "p23.MyFirstModule.Home_Web.layoutGrid2$row0$column0",
                        class: "col-lg col-md col",
                        style: void 0,
                        content: [
                          /* @__PURE__ */ React.createElement(
                            $Text,
                            {
                              key: "p23.MyFirstModule.Home_Web.text1",
                              $widgetId: "p23.MyFirstModule.Home_Web.text1",
                              class: "mx-name-text1 pageheader-title spacing-outer-bottom",
                              style: void 0,
                              caption: selectTranslation([
                                ExpressionProperty({
                                  "expression": { "expr": { "type": "literal", "value": "Welcome To GitMendix App" }, "args": {} }
                                })
                              ]),
                              renderMode: "h3"
                            }
                          ),
                          /* @__PURE__ */ React.createElement(
                            $Text,
                            {
                              key: "p23.MyFirstModule.Home_Web.text3",
                              $widgetId: "p23.MyFirstModule.Home_Web.text3",
                              class: "mx-name-text3 pageheader-subtitle text-detail",
                              style: void 0,
                              caption: selectTranslation([
                                ExpressionProperty({
                                  "expression": { "expr": { "type": "literal", "value": "This App is Stored In GitHub\r\n" }, "args": {} }
                                })
                              ]),
                              renderMode: "p"
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
      ],
      ariaHidden: false
    }
  ),
  /* @__PURE__ */ React.createElement(
    $Div,
    {
      key: "p23.MyFirstModule.Home_Web.layoutGrid1",
      $widgetId: "p23.MyFirstModule.Home_Web.layoutGrid1",
      class: "mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid",
      style: void 0,
      content: [
        /* @__PURE__ */ React.createElement(
          $Div,
          {
            key: "p23.MyFirstModule.Home_Web.layoutGrid1$row0",
            $widgetId: "p23.MyFirstModule.Home_Web.layoutGrid1$row0",
            class: "row",
            style: void 0,
            content: [
              /* @__PURE__ */ React.createElement(
                $Div,
                {
                  key: "p23.MyFirstModule.Home_Web.layoutGrid1$row0$column0",
                  $widgetId: "p23.MyFirstModule.Home_Web.layoutGrid1$row0$column0",
                  class: "col-lg col-md col",
                  style: void 0,
                  content: void 0
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
  "Homepage"
]);
const classes = "layout-atlas layout-atlas-responsive-default";
const style = {};
const content = {
  ...content$1,
  "Atlas_Core.Atlas_Default.Main": region$Main
};

export { classes, content, style, title };
