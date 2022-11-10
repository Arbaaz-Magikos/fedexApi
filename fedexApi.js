var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();

exports.fedexApiSendPdf = async (awb_number,transaction_id,token,file) => {
    console.log(awb_number)
    console.log(transaction_id)
    console.log(token)
    console.log(file)
    return "this is Happning";
    data.append('document', metaData);
    data.append('attachment', file);
    var config = {
        method: 'post',
        url: 'https://documentapitest.prod.fedex.com/sandbox/documents/v1/etds/upload',
        headers: { 
          'Authorization': `Bearer ${token}`,
          ...data.getHeaders()
        },
        data : data
    };

    axios(config)
    .then(function (respose) {
        console.log(respose)
    })
    .catch(function(error){
        console.log(error)
    })
}