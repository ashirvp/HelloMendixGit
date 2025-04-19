import { addEnumerations, t } from "mendix";

export const ACT_Feedback_UploadImage = {
  "name": "FeedbackModule.ACT_Feedback_UploadImage",
  "instructions": [
    {
      "type": "setVariable",
      "label": "00c881d1-abdc-404e-81cc-a2a83d380687",
      "value": {
        "type": "literal",
        "value": ".gif,.png,.jpg,.jpeg"
      },
      "outputVar": "mimeTypes",
      "outputKind": "primitive"
    },
    {
      "type": "setVariable",
      "label": "625538a0-da9e-4847-b9b4-2fdca4395dc7",
      "value": {
        "type": "literalNumeric",
        "value": "5"
      },
      "outputVar": "fileUploadSize",
      "outputKind": "primitive"
    },
    {
      "type": "javaScriptActionCall",
      "label": "bdbe1182-fd05-4bf7-820e-844cf2066322",
      "action": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/javascriptsource/feedbackmodule/actions/JS_UploadAndConvertToFileBlobURL").JS_UploadAndConvertToFileBlobURL,
      "outputVar": "fileBlobURL",
      "parameters": [
        {
          "kind": "primitive",
          "value": {
            "type": "variable",
            "variable": "mimeTypes"
          }
        },
        {
          "kind": "primitive",
          "value": {
            "type": "variable",
            "variable": "fileUploadSize"
          }
        }
      ]
    },
    {
      "type": "switch",
      "label": "1ae28389-99fa-438a-8620-2c3cd4bd824c",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "fileBlobURL"
          },
          {
            "type": "literal",
            "value": "uploadCancelled"
          }
        ]
      },
      "targets": {
        "true": "d3f026dc-501d-45be-b836-cbd03187831f",
        "false": "1567d7b4-db13-4521-88b7-f1d43e6a314f"
      }
    },
    {
      "type": "return",
      "label": "1567d7b4-db13-4521-88b7-f1d43e6a314f",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "switch",
      "label": "d3f026dc-501d-45be-b836-cbd03187831f",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "fileBlobURL"
          },
          {
            "type": "literal",
            "value": null
          }
        ]
      },
      "targets": {
        "false": "8ae410b7-0e6b-4d2e-92b4-feca26ed24f2",
        "true": "e568b172-050c-498b-b5be-43dc46747a2f"
      }
    },
    {
      "type": "switch",
      "label": "e568b172-050c-498b-b5be-43dc46747a2f",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "fileBlobURL"
          },
          {
            "type": "literal",
            "value": "fileSizeNotAccepted"
          }
        ]
      },
      "targets": {
        "true": "e11fa895-aace-4c35-9ca5-c24d6f61c6ec",
        "false": "aeb419eb-a3a5-42de-a6e2-164927497521"
      }
    },
    {
      "type": "showMessage",
      "label": "aeb419eb-a3a5-42de-a6e2-164927497521",
      "messageType": "error",
      "message": t([
        {
          "type": "literal",
          "value": "Maximum image size allowed is 5MB."
        }
      ]),
      "blocking": true
    },
    {
      "type": "return",
      "label": "6474f081-6998-4ccc-8dff-2562f184e743",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "switch",
      "label": "e11fa895-aace-4c35-9ca5-c24d6f61c6ec",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "fileBlobURL"
          },
          {
            "type": "literal",
            "value": "fileTypeNotAccepted"
          }
        ]
      },
      "targets": {
        "false": "6448d68b-8592-4466-8db1-e1c2038ea1c8",
        "true": "395e923d-af56-4677-801c-54823405bd1a"
      }
    },
    {
      "type": "closeForm",
      "label": "395e923d-af56-4677-801c-54823405bd1a"
    },
    {
      "type": "javaScriptActionCall",
      "label": "1a9206e0-d75a-42f2-9f42-9af9e22d76a2",
      "action": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/javascriptsource/feedbackmodule/actions/JS_ToggleFeedbackAnnotateWidget").JS_ToggleFeedbackAnnotateWidget,
      "outputVar": "base64ImageFromWidget",
      "parameters": [
        {
          "kind": "primitive",
          "value": {
            "type": "variable",
            "variable": "fileBlobURL"
          }
        }
      ]
    },
    {
      "type": "changeObject",
      "label": "91b9dd68-7b8e-4cc3-a840-fe7a26303c18",
      "inputVar": "Feedback",
      "member": "ImageB64",
      "value": {
        "type": "variable",
        "variable": "base64ImageFromWidget"
      }
    },
    {
      "type": "commitObjects",
      "operationId": "LNmuiXRpv1mTN7MRGT+J+A",
      "inputVar": "Feedback"
    },
    {
      "type": "openForm",
      "label": "95cf6bd7-3d48-4cb3-aeff-ebfe67a723f6",
      "path": "FeedbackModule/ShareFeedback.page.xml",
      "params": {
        "name": "FeedbackModule/ShareFeedback.page.xml",
        "location": "modal",
        "resizable": true
      }
    },
    {
      "type": "javaScriptActionCall",
      "label": "f492f813-5196-4aac-a894-e5a72c938434",
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
      "type": "javaScriptActionCall",
      "label": "87c9c527-6787-4efe-b7df-59dcadfaedd9",
      "action": () => require("C:/Users/ashir/Downloads/mendix/HelloMendixGit/javascriptsource/feedbackmodule/actions/JS_RevokeUploadedFileFromMemory").JS_RevokeUploadedFileFromMemory,
      "parameters": [
        {
          "kind": "primitive",
          "value": {
            "type": "variable",
            "variable": "fileBlobURL"
          }
        }
      ]
    },
    {
      "type": "return",
      "label": "4d671412-f1bd-4319-b2c6-2db5c90c701c",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "showMessage",
      "label": "6448d68b-8592-4466-8db1-e1c2038ea1c8",
      "messageType": "error",
      "message": t([
        {
          "type": "literal",
          "value": "Only images with format of .gif .jpg .jpeg .png are allowed"
        }
      ]),
      "blocking": true
    },
    {
      "type": "return",
      "label": "369d3e6b-85f4-4b53-863e-28baa7f3dfed",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "showMessage",
      "label": "8ae410b7-0e6b-4d2e-92b4-feca26ed24f2",
      "messageType": "error",
      "message": t([
        {
          "type": "literal",
          "value": "Upload failed, please try again."
        }
      ]),
      "blocking": true
    },
    {
      "type": "return",
      "label": "b660a877-38c1-4a79-90b4-61db08191ef7",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    }
  ]
};
