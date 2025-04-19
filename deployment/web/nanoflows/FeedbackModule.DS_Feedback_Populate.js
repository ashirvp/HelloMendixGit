import { addEnumerations, t } from "mendix";

export const DS_Feedback_Populate = {
  "name": "FeedbackModule.DS_Feedback_Populate",
  "instructions": [
    {
      "type": "nanoflowCall",
      "label": "0e2512c6-59aa-4ffd-b28a-c49be100c1f1",
      "flow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.SUB_Feedback_GetOrCreate").SUB_Feedback_GetOrCreate,
      "parameters": [],
      "outputVar": "Feedback"
    },
    {
      "type": "microflowCall",
      "label": "fcde7949-d49d-4411-86b8-c905c45bfcf0",
      "operationId": "UmcRRLfrp1+8szNOFQXOVQ",
      "parameters": [
        {
          "name": "Feedback",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          },
          "kind": "object"
        }
      ]
    },
    {
      "type": "changeObject",
      "label": "5c296bc2-6d43-4504-a03f-3c668934dc8b",
      "inputVar": "Feedback",
      "member": "_showEmail",
      "value": {
        "type": "conditional",
        "condition": {
          "type": "conditional",
          "condition": {
            "type": "function",
            "name": "!=",
            "parameters": [
              {
                "type": "variable",
                "variable": "Feedback",
                "path": "SubmitterEmail"
              },
              {
                "type": "literal",
                "value": null
              }
            ]
          },
          "then": {
            "type": "function",
            "name": "!=",
            "parameters": [
              {
                "type": "variable",
                "variable": "Feedback",
                "path": "SubmitterEmail"
              },
              {
                "type": "literal",
                "value": ""
              }
            ]
          },
          "else": {
            "type": "literal",
            "value": false
          }
        },
        "then": {
          "type": "literal",
          "value": false
        },
        "else": {
          "type": "literal",
          "value": true
        }
      }
    },
    {
      "type": "javaScriptActionCall",
      "label": "b18657b9-7788-43f0-9474-62b7c85bd06f",
      "action": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/javascriptsource/feedbackmodule/actions/JS_PopulateFeedbackMetadata").JS_PopulateFeedbackMetadata,
      "parameters": [
        {
          "kind": "object",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          }
        }
      ]
    },
    {
      "type": "javaScriptActionCall",
      "label": "d518afce-04db-4039-a0fe-8867bd83c649",
      "action": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/javascriptsource/feedbackmodule/actions/SetStorageItemObject").SetStorageItemObject,
      "parameters": [
        {
          "kind": "primitive",
          "value": {
            "type": "constant",
            "name": "FeedbackModule.LocalStorageKey"
          }
        },
        {
          "kind": "object",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          }
        }
      ]
    },
    {
      "type": "return",
      "label": "d0246ec7-cbba-4651-a8ab-4f81248dd84b",
      "result": {
        "type": "variable",
        "variable": "Feedback"
      },
      "resultKind": "object"
    }
  ]
};
