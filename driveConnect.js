const fs = require('fs');
const readline = require('readline');
var axios = require("axios");
var FormData = require("form-data");
const {
	google
} = require('googleapis');

const { fedex } = require('./fedex');
const { file } = require('googleapis/build/src/apis/file');

var data = new FormData();


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
	if (err) return console.log('Error loading client secret file:', err);
	// Authorize a client with credentials, then call the Google Drive API.
	authorize(JSON.parse(content), downloadFile);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
	const {
		client_secret,
		client_id,
		redirect_uris
	} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getAccessToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error retrieving access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) return console.error(err);
				console.log('Token stored to', TOKEN_PATH);
			});
			callback(oAuth2Client);
		});
	});
}
//var file_buffer = []

 
// download to local file  
// async function downloadFile(auth) {
//     const drive = google.drive({version: "v3", auth});
//  var fileId = "1Hi9-bE5HekxxmKaAYJ-l6Voq47kSWpbw"
// var file;
// drive.files.get(
//      {fileId: fileId, alt: "media"}, 
//      {responseType: "stream"},

//     (err, { data }) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         let buf = [];
//         data.on("data", (e) => buf.push(e));
//         data.on("end", () => {
//         file = Buffer.concat(buf);
//         console.log("File buffer is",file);
//         return file 
//         });
//         console.log("success",file);
//     });
    // data.append(
    //     "document",
    //     '{"workflowName":"ETDPostshipment","carrierCode":"FDXE","name":"invoice.pdf","contentType":"application/pdf","meta":{"shipDocumentType":"COMMERCIAL_INVOICE","formCode":"USMCA","trackingNumber":"794684738840","shipmentDate":"2022-11-11T00:00:00","originCountryCode":"IN","destinationCountryCode":"US"}}'
    //   );
    //   data.append("attachment", file);
    //   let token =
    //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsNzM1Y2Q1MTg3MzcxYjRmNDhiZDc0YWJiOWEwNTMxZTU0In0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjEyLU5vdi0yMDIyIDAyOjMyOjQ5IEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1wcm9kLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE2NjgyNDE5NjksImp0aSI6ImQ0ZWVlYjI5LTg5Y2MtNDA1MC1hMTQ4LTlmZGEwODFmMDQ3ZiJ9.TapilunvVV4bwLiA2jfqoyJv5zgsdcZsTrZGXDflVYYjSepUA4KZY42cYniV5xnkZRQzYealEzBGmsDJXaoyIXAQZhCtT5O_rkl70g5gfcuKJUvVOGT31DHVo5QX3k87PZTNftjBh1HZmJlkttiIIiFb9HEIuliF1Saqu2HTHpKxYE6lqGlsMzaUaGByhcnVwMZdMFEftWNCcKJdv2S7WCODvJX3Utgo2MSNpAJZIS7MeYk1_YrlePDuE1f1o9mFFzGIXZ5fJBwJSJRy0WZTlFXWVWoIZtaxQi5QAxCmlPFVePQmWQOn2AIPd47CrRBLJpe4MuIOm6DsfLmirQST1P4HRhrMjMccSz7Asea2-ZJdTqOV5gxsKpgQ-eXqnocdpP87UOwnZOjWtuswmsa3t_F01ThpLSNzQKhbtuBQ8TUIw6GmItS4hvFkgEDn9aS6Mk-cfvcS1eoIjjWR3xD4Md0mfq2np-RS7QbWy-3wvdlsZeFjHoJQpN7cgndKGLQMp8FGJMO_IggQbFVR8jvvKQ2O3sp_uSRt4KWkTxHcaRtpjDc0gEjwz-0DMdogGqaU_42k0g1HaGOltyfJ_QqcalwXbG1emTZ8dyPQqX7mc0s7hh74ptdUAADRWhVqniO3YVsqLjzVhorLAvcvDYOaYXPviM9F5y8PtX1wL5NIM6A"
    //   var config = {
    //     method: "post",
    //     url: "https://documentapitest.prod.fedex.com/sandbox/documents/v1/etds/upload",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       ...data.getHeaders(),
    //     },
    //     data: data,
    //   };
      
    //   axios(config)
    //     .then(function (response) {
    //       console.log(JSON.stringify(response.data));
    //       return JSON.stringify(response.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       return error
    //     });
//}
fs.unlink('test.pdf', function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log('File deleted!');
});