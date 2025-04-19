import { addEnumerations, t } from "mendix";

export const SUB_Feedback_GetOrCreate = {
  "name": "FeedbackModule.SUB_Feedback_GetOrCreate",
  "instructions": [
    {
      "type": "tryCatch",
      "label": "e3542a98-08af-404e-8d28-7c31ffa0056b",
      "catchTarget": "f45d5324-4713-46fe-826d-00106195b106",
      "body": [
        {
          "type": "javaScriptActionCall",
          "action": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/javascriptsource/feedbackmodule/actions/GetStorageItemObject").GetStorageItemObject,
          "outputVar": "LocalFeedback",
          "parameters": [
            {
              "kind": "primitive",
              "value": {
                "type": "constant",
                "name": "FeedbackModule.LocalStorageKey"
              }
            },
            {
              "kind": "primitive",
              "value": {
                "type": "literal",
                "value": "FeedbackModule.Feedback"
              }
            }
          ]
        },
        {
          "type": "return",
          "result": {
            "type": "literal",
            "value": true
          },
          "resultKind": "primitive"
        }
      ]
    },
    {
      "type": "switch",
      "label": "3dfb0722-5a99-40e2-995c-54cc73c25e15",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "LocalFeedback"
          },
          {
            "type": "literal",
            "value": null
          }
        ]
      },
      "targets": {
        "false": "3715d3e1-ee34-4b3f-ba45-62a18332b37f",
        "true": "e43d6b6e-3bef-4bd4-8e3f-bd17d0eb9209"
      }
    },
    {
      "type": "return",
      "label": "e43d6b6e-3bef-4bd4-8e3f-bd17d0eb9209",
      "result": {
        "type": "variable",
        "variable": "LocalFeedback"
      },
      "resultKind": "object"
    },
    {
      "type": "jump",
      "label": "3715d3e1-ee34-4b3f-ba45-62a18332b37f",
      "target": "6655c432-6d6a-4b23-81c9-dde375df9c86"
    },
    {
      "type": "createObject",
      "label": "6655c432-6d6a-4b23-81c9-dde375df9c86",
      "objectType": "FeedbackModule.Feedback",
      "outputVar": "NewFeedback"
    },
    {
      "type": "return",
      "label": "8f7ecb9c-626d-41a5-8b53-939c75450d0c",
      "result": {
        "type": "variable",
        "variable": "NewFeedback"
      },
      "resultKind": "object"
    },
    {
      "type": "jump",
      "label": "f45d5324-4713-46fe-826d-00106195b106",
      "target": "3715d3e1-ee34-4b3f-ba45-62a18332b37f"
    },
    {
      "type": "jump",
      "label": "3715d3e1-ee34-4b3f-ba45-62a18332b37f",
      "target": "6655c432-6d6a-4b23-81c9-dde375df9c86"
    }
  ]
};
