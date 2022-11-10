const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
const { fedexApiSendPdf } = require("./fedexApi")


app.post('/', async (req, res) => {
    let {AWB_NUMBER,TRANSACTION_ID,TOKEN} = req.body
    let  UploadedFile = req.files
    let respose = await fedexApiSendPdf(AWB_NUMBER, TRANSACTION_ID,TOKEN, UploadedFile)
    return res.status(200).send({ message: respose });
  })

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});