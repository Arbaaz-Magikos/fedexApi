var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");
var data = new FormData();

fedex = async () => {
    data.append(
        "document",
        '{"workflowName":"ETDPostshipment","carrierCode":"FDXE","name":"invoice.pdf","contentType":"application/pdf","meta":{"shipDocumentType":"COMMERCIAL_INVOICE","formCode":"USMCA","trackingNumber":"794686963416","shipmentDate":"2022-11-16T00:00:00","originCountryCode":"IN","destinationCountryCode":"US"}}'
      );
      data.append("attachment", fs.createReadStream("invoice.pdf"));
      let token =
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsNzM1Y2Q1MTg3MzcxYjRmNDhiZDc0YWJiOWEwNTMxZTU0In0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjE2LU5vdi0yMDIyIDAxOjA2OjM1IEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1wcm9kLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE2Njg1ODIzOTUsImp0aSI6ImVhOTdhNDBlLWU4NDItNDRjZS1iYTBjLThjOGM5YjI0MjI0ZiJ9.bF8ItJWdXTa7358ImXRoYhVB3kZFNcI1ZECvhDnBio5Y06ahLI34BBbjYeLYiv_wDml_hspsYev_hZzjSZs1CyLhRSdh7cibY8cxDuAVW_WwdKHah17ByoImSsmDZn2qL07Va5EqtB56Kybv2ksnWxay5h7lTOhifdfIhSi3VJ88_Cj5FCo5SuzSWeVqtWsaIj4Yg-YuGD4byWHQ7JilRHou4VuTbaMIskzeP0qPMRdUcJ6x_r13ooYPZDZAGHYi_ruuPikXB16dN2BB_8m7FueIc9nHPc1qcUl_sZLQyuDxxEGKAjQQ4OAfhiPqtixrotQWh2yrz9vX5jJ6zCLavwgiWGrZgFFPExJeQsofnwLI7GLlypD8TI1R41srN0wDCG9f3agx_mVxddtZ3DcGj0evgp76b7Y2rrczGbnAkDTeNyc_O3cOK8mIqdPF_Mq7UBic6ylEISBzJ4bZ7hifWsqioD_FBmd5aZ4hqTEwrO_uCSt_QQbJNck2LDFj2bezfsk-JUC4dJ_ECHR44bbGtkkMoL_RqMoMdxvR-_cpqyEORbxQT5eVsVaKdmNue8um37hTJFgNPKDwPIQth50wp3SKhgYRb0t_6EkBOJbW86bbafulugcAe7z0GCkVsFnNbIwxpREu5xgxbECiVQekaZCqS3pNGxzGP2-n7ArfACw"
      var config = {
        method: "post",
        url: "https://documentapitest.prod.fedex.com/sandbox/documents/v1/etds/upload",
        headers: {
          Authorization: `Bearer ${token}`,
          ...data.getHeaders(),
        },
        data: data,
      };
      console.log(data)
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          return JSON.stringify(response.data)
        })
        .catch(function (error) {
          console.log(error.response.data);
          return error
        });
}

fedex()