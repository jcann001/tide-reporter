//jshint esversion:6
const fetch = require("node-fetch");
const express = require("express");
const bodyParser  = require("body-parser");
const nodemailer = require("nodemailer");
// const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// mongoose.connect("mongodb://localhost:27017/tideReportDB", {useNewUrlParser: true, useUnifiedTopology: true });

// const tideSchema = {
//   firstName: String,
//   lastName: String,
//   email: String,
//   latitude: Int16Array,
//   longitude:
// };

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");

});


app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const lat = req.body.lat;
  const lng = req.body.long;

  // const userData ={
  //   members: [
  //     {
  //       email_address: email,
  //       status: "subscribed",
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName,
  //       }
  //     }
  //   ]
  // };

  // const userJsonData = JSON.stringify(userData);
  // const url = "https://us2.api.mailchimp.com/3.0/lists/650cd64068";
  // const options = {
  //   method: "POST",
  //   auth: "jcann001:58f9bf8a2b69c8be0d306160702d141b-us2"
  // };

  // const request = https.request(url, options, function(response){

  
  fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=2020-11-4&end=2020-11-11`, {
    headers: {
      'Authorization': '2231c0d2-1675-11eb-b3db-0242ac130002-2231c14a-1675-11eb-b3db-0242ac130002'
    }
}).then((response) => response.json()).then((jsonData) => {
    // Do something with response data.
    console.log(jsonData.data);

    res.sendFile(__dirname + "/success.html");

  }).catch((error) => {
    res.sendFile(__dirname + "/failure.html");
  });
  // });
  // request.write(userJsonData);
  // request.end();
  
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});