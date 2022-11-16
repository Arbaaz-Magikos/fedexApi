var axios = require("axios");
const { json } = require("body-parser");
var FormData = require("form-data");
var fs = require("fs");
// var data = new FormData();

 fedexApiSendPdf = async () => {
//   let fileName = file.INVOICE.name;
  let awb_number = "794684738840";
  let transaction_id = "00a78883-90ad-4c52-b4ec-012cb3fea5a7";
  let data = {
    workflowName: "ETDPostshipment",
    carrierCode: "FDXE",
    name: "test" + ".pdf",
    contentType: "application/pdf",
    meta: {
      shipDocumentType: "COMMERCIAL_INVOICE",
      formCode: "USMCA",
      trackingNumber: awb_number,
      shipmentDate: "2022-11-11T00:00:00",
      originCountryCode: "IN",
      destinationCountryCode: "US",
    },
  };
  let url =
    "https://documentapitest.prod.fedex.com/sandbox/documents/v1/etds/upload";
  let token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsNzM1Y2Q1MTg3MzcxYjRmNDhiZDc0YWJiOWEwNTMxZTU0In0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjExLU5vdi0yMDIyIDA0OjI3OjMwIEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1wcm9kLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE2NjgxNjI0NTAsImp0aSI6ImExMzE0YzZmLTU1MzItNDMwMy04MmFmLWQxZmE1NjEyMjlkYiJ9.TnMN97A_qS_x-Rf7DE0aj4CDWmFnEZ8-J68pv8Pb8jCPy0zftnMpAivhesruxesAc2djXI_97-zMysrTkni8_uiLWsm09KclGxUM3F7XrR0r6roL_2PuwCbGR1BOHErEDypqpbD_SpCp8bjILlwU8sZMbNhAGHyKBVKOqfP5ZX8H22ObR2PijfGDSBu8a7UWc7ONYx4GqvnALQa80zOxNBWSO0GQ3Kv9Oo85NfAveY_poFEbLZl-NrHL3Kkgpjpf1IJ7JbCiZj0ED3Dvoidyy2ZRTbJofGuHMx6WTsOYKKSc_Y3yIij1CjDGxebk1JXBfnfLoYJYyzBvdtuvfbRVu4oF5Iwmz4cYu0eoP3TeEQo1pSQhpzn_2N0LndLxVZWmATlZkaZ3YMA1xjwNWthjT0Cv_SlluKR0fSQoybJxW0hRoIqrTHi7aayyeLjfFlNQxmKG-sM9bkBHbE-1Ohg1wfWBZ2qLWn50flECsYc2Cn4bxDdlmbbk6m9sN8xlpPic6QUtaOWNleZZZ9BUL_DcKiRfw2126VhhvB7lq86H2F7kg-Pwby-P-mh21IPa-MxxKvHPrj-vdTpVrCSnbzmbIFkw8_pTky5ZiudwPQYzFRySUg2WjUeM88bbH9NM0Qy-6TyG78WAfW5Ba94EVnwMfkeAk2Ksu3p_hjPZhPTSznc";
  let config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      "x-customer-transaction-id": transaction_id,
    },
  };

  let payload = {
    attachment: fs.createReadStream("test.pdf"),
    document: data,
  };

  axios
    .post(url, JSON.stringify(payload), config)
    .then(function (respose) {
      console.log(respose);
      return respose;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

 fedexApiSendPdf();
