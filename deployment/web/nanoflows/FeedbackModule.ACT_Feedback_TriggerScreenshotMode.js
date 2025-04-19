import { addEnumerations, t } from "mendix";

export const ACT_Feedback_TriggerScreenshotMode = {
  "name": "FeedbackModule.ACT_Feedback_TriggerScreenshotMode",
  "instructions": [
    {
      "type": "closeForm",
      "label": "686e967d-5754-4ba9-a9fa-626370ec6545"
    },
    {
      "type": "javaScriptActionCall",
      "label": "44cfcc57-0c65-4761-a936-e4bd8b9e3463",
      "action": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/javascriptsource/feedbackmodule/actions/JS_ToggleFeedbackScreenshotWidget").JS_ToggleFeedbackScreenshotWidget,
      "outputVar": "base64FromWidget",
      "parameters": []
    },
    {
      "type": "switch",
      "label": "e8628673-1108-45f3-93f8-ecb624038313",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "base64FromWidget"
          },
          {
            "type": "literal",
            "value": "uploadCancelled"
          }
        ]
      },
      "targets": {
        "true": "8043fb74-4e96-49ee-b5b0-0a9c72372038",
        "false": "25486b1b-1a0a-4a45-9c51-24e15aafa143"
      }
    },
    {
      "type": "jump",
      "label": "25486b1b-1a0a-4a45-9c51-24e15aafa143",
      "target": "39a12df9-d9ab-4299-b25d-f35a235f405f"
    },
    {
      "type": "jump",
      "label": "39a12df9-d9ab-4299-b25d-f35a235f405f",
      "target": "aaaa0987-83b6-4648-8404-6a0d59942473"
    },
    {
      "type": "jump",
      "label": "aaaa0987-83b6-4648-8404-6a0d59942473",
      "target": "3e74af18-adc6-4034-8b87-694e243d2ec9"
    },
    {
      "type": "openForm",
      "label": "3e74af18-adc6-4034-8b87-694e243d2ec9",
      "path": "FeedbackModule/ShareFeedback.page.xml",
      "params": {
        "name": "FeedbackModule/ShareFeedback.page.xml",
        "location": "modal",
        "resizable": true
      }
    },
    {
      "type": "return",
      "label": "aa9e079e-9a8a-4366-9d7b-3cc060d59df0",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "switch",
      "label": "8043fb74-4e96-49ee-b5b0-0a9c72372038",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "base64FromWidget"
          },
          {
            "type": "literal",
            "value": null
          }
        ]
      },
      "targets": {
        "true": "3f75da77-49a8-43f8-8eae-3c0ac349d521",
        "false": "f7a095f2-df94-481b-8b5e-48a2dbc08b05"
      }
    },
    {
      "type": "return",
      "label": "f7a095f2-df94-481b-8b5e-48a2dbc08b05",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "changeObject",
      "label": "3f75da77-49a8-43f8-8eae-3c0ac349d521",
      "inputVar": "Feedback",
      "member": "ImageB64",
      "value": {
        "type": "variable",
        "variable": "base64FromWidget"
      }
    },
    {
      "type": "commitObjects",
      "operationId": "ImpRzGG0bFyrbJK39JtRfw",
      "inputVar": "Feedback"
    },
    {
      "type": "jump",
      "label": "aaaa0987-83b6-4648-8404-6a0d59942473",
      "target": "3e74af18-adc6-4034-8b87-694e243d2ec9"
    }
  ]
};
