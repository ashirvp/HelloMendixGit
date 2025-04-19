import { addEnumerations, t } from "mendix";

export const ACT_SubmitFeedback = {
  "name": "FeedbackModule.ACT_SubmitFeedback",
  "instructions": [
    {
      "type": "microflowCall",
      "label": "14ce773a-9c53-4daf-9f87-5d5fd1e7dae6",
      "operationId": "6FMn7YFeLFCW7s3FEQkFpA",
      "parameters": [
        {
          "name": "Feedback",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          },
          "kind": "object"
        }
      ],
      "outputVar": "isValid"
    },
    {
      "type": "switch",
      "label": "030fcf72-928d-497f-a425-384a25a59350",
      "condition": {
        "type": "variable",
        "variable": "isValid"
      },
      "targets": {
        "true": "930c5c8c-d6b1-4895-b388-0cd4c1043310",
        "false": "84c7c4b2-4989-440a-ba13-488d16a593ed"
      }
    },
    {
      "type": "return",
      "label": "84c7c4b2-4989-440a-ba13-488d16a593ed",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "microflowCall",
      "label": "930c5c8c-d6b1-4895-b388-0cd4c1043310",
      "operationId": "Q8RULKgswFOv3CU+sCLPiQ",
      "parameters": [
        {
          "name": "Feedback",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          },
          "kind": "object"
        }
      ],
      "outputVar": "ResponseHelper"
    },
    {
      "type": "closeForm",
      "label": "99949268-ad94-437b-8ef5-f0e6b1a0bf70",
      "numberOfPagesToClose": {
        "type": "literalNumeric",
        "value": "1"
      }
    },
    {
      "type": "switch",
      "label": "af90efb4-d3a7-4447-99b1-1e05804cfa40",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "ResponseHelper"
          },
          {
            "type": "literal",
            "value": null
          }
        ]
      },
      "targets": {
        "true": "3c55ec1b-3f44-4dc2-9e11-ea988c629aec",
        "false": "557d0fe7-cecb-4e80-a5a6-e203b31dad29"
      }
    },
    {
      "type": "jump",
      "label": "557d0fe7-cecb-4e80-a5a6-e203b31dad29",
      "target": "24d6e33e-f359-4cad-93dc-89f15c72da8f"
    },
    {
      "type": "openForm",
      "label": "24d6e33e-f359-4cad-93dc-89f15c72da8f",
      "path": "FeedbackModule/PopupFailure.page.xml",
      "params": {
        "name": "FeedbackModule/PopupFailure.page.xml",
        "location": "modal",
        "resizable": false
      }
    },
    {
      "type": "return",
      "label": "d67192af-7301-472b-9434-0132ee899280",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "openForm",
      "label": "3c55ec1b-3f44-4dc2-9e11-ea988c629aec",
      "path": "FeedbackModule/PopupSuccess.page.xml",
      "params": {
        "name": "FeedbackModule/PopupSuccess.page.xml",
        "location": "modal",
        "resizable": false
      },
      "inputArgs": {
        "$Response": {
          "type": "variable",
          "variable": "ResponseHelper"
        }
      }
    },
    {
      "type": "nanoflowCall",
      "label": "dbcc1a76-edc9-4e7d-b109-b3ca0460fdd0",
      "flow": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/deployment/web/nanoflows/FeedbackModule.SUB_Feedback_ResetLocalStorage").SUB_Feedback_ResetLocalStorage,
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
      "type": "return",
      "label": "d0245d9f-cef5-4221-804b-35ed91b4e189",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    }
  ]
};
