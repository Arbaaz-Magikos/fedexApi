const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
const { fedexApiSendPdf } = require("./fedexApi")

app.get('/', (req, res) => {
  res.send('I am fedex...');
})

app.post('/fedexUpload', async (req, res) => {
    let {document,token} = req.body
    // let  UploadedFile = req.files
    // console.log(JSON.parse(document))
    // console.log(token)
    // console.log(req.files)
    let respose = await fedex(UploadedFile)
    return res.status(200).send({ message: respose.data.errors });
  })

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});