var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");
var data = new FormData();

exports.fedex = async () => {
    data.append(
        "document",
        '{"workflowName":"ETDPostshipment","carrierCode":"FDXE","name":"invoice.pdf","contentType":"application/pdf","meta":{"shipDocumentType":"COMMERCIAL_INVOICE","formCode":"USMCA","trackingNumber":"794684738840","shipmentDate":"2022-11-11T00:00:00","originCountryCode":"IN","destinationCountryCode":"US"}}'
      );
      data.append("attachment", fs.createReadStream("./invoice.pdf"));
      let token =
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsNzM1Y2Q1MTg3MzcxYjRmNDhiZDc0YWJiOWEwNTMxZTU0In0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjExLU5vdi0yMDIyIDA4OjI1OjE4IEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1wcm9kLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE2NjgxNzY3MTgsImp0aSI6ImZjMDBhYTc4LTljYjEtNGI1Zi05ZWZjLTA2N2VhNTIyNjMwYSJ9.DHgtvX4n7WUWd5W-RmdaJEVDPlALROEB0Pz_uJIp5uDg_qhdROEmaRo1pOEXeY1Kjr__bhcSHqIeYim2BiKfbZQstVF7aHnxn9XWVW6JWP5ARaJuxUvNJpRp1MRBXCm8PS5jVOpkn0847BPta_EuaacB0V3JvXco1AUPAb_ByR9-DHhjgHhl5Km2qGOyG_Np4bI86zzfGfpty0YmkPzi3vUwjZji0EzapAM1yfInNx6PicrT65FBo7PtCJIWXPdm3IWrkaW2WkpQ_suyNDdoRsGHWRTXhGTy6XfCn-v1WgXMIQ7Ro5WZXktYTCdTdO3R3bOQW4zpCv3RRRi8M_YjnHTtA7N3iY1FDjxuvky7p9KwPa8S4EMq9Zr0KzdUUjXS_zgbiR0JAzh12WVehTYUVsX5Hp_KhJXy5F3M5BHQOnw1sQAum39swNAyoe4AE8phThEkGCCbof3rLdixmEdY5sAMtDiDkwEOMK3c3YuzxlG1rShCZr4-Gi29myouPBxP-Dp_sordGoDmDbYQ1bxw9h0y_2HLcK6PJ_tOXVFNCThFaAVS8o79Xhgtjey56wS6jU4J4JcT2_Gbe_XEMEoZu4mLr4ZxSa36-tI8CLE5BOuo20Bsr68MyVxz1YiN2gjmgfWC2qHR371AUrBUcjnicJ943mZrnyaCy0TfrnN3bMU";
      var config = {
        method: "post",
        url: "https://documentapitest.prod.fedex.com/sandbox/documents/v1/etds/upload",
        headers: {
          Authorization: `Bearer ${token}`,
          ...data.getHeaders(),
        },
        data: data,
      };
      
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          return JSON.stringify(response.data)
        })
        .catch(function (error) {
          console.log(error);
          return error
        });
}

fedex()