//jshint esversion:6
const fetch = require("node-fetch");
const express = require("express");
const bodyParser  = require("body-parser");
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("npm");
const { json } = require("body-parser");
require('dotenv').config();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");

});


app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const city = req.body.city;
  const state = req.body.state;
  const lat = req.body.lat;
  const lng = req.body.long;

  
  fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=2020-11-08&end=2020-11-15`, {
    headers: {
      'Authorization': '2231c0d2-1675-11eb-b3db-0242ac130002-2231c14a-1675-11eb-b3db-0242ac130002'
    }
}).then((response) => response.json()).then((jsonData) => {
    // Do something with response data.
  console.log('Request Count: ' + jsonData.meta.requestCount);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    let mailOptions = {
      from: 'cannonj55@gmail.com',
      to: email,
      subject: 'Your Local Tide Report',
      text: 'Hello ' + firstName + ', \n\n'+ 'The tidal extremes for ' + city +', '+ state + ' are posted below: \n\n' + 'Sunday \n\n' +
      
      JSON.stringify(jsonData.data[1]) + '\n\n' +
      JSON.stringify(jsonData.data[3]) + '\n\n' + 'Monday: ' + '\n\n' +
      JSON.stringify(jsonData.data[5]) + '\n\n' +
      JSON.stringify(jsonData.data[7]) + '\n\n' + 'Tuesday: ' + '\n\n' +
      JSON.stringify(jsonData.data[9]) + '\n\n' +
      JSON.stringify(jsonData.data[11]) + '\n\n' + 'Wednesday: ' + '\n\n' +
      JSON.stringify(jsonData.data[13]) + '\n\n' +
      JSON.stringify(jsonData.data[15]) + '\n\n' + 'Thursday: ' + '\n\n' +
      JSON.stringify(jsonData.data[17]) + '\n\n' +
      JSON.stringify(jsonData.data[19]) + '\n\n' + 'Friday: ' + '\n\n' +
      JSON.stringify(jsonData.data[21]) + '\n\n' + 'Saturday: ' + '\n\n' +
      JSON.stringify(jsonData.data[23]) + '\n\n' +
      JSON.stringify(jsonData.data[25]) + '\n\n\n' + 'Thank you, '+ '\n'+ 'The Tide Reporter Team' + '\n\n' +'P.S. The time is given in UTC format. Please convert to your local time!'+ '\n' +'We are working swiftly to implement new features. Thank you!'
      // html: "<b>Hello world?</b>",
    };

    transporter.sendMail(mailOptions, function(err, data){
      if(err){
        console.log('Error, Unable to send ', err);
      } else {
        console.log('Email sent :)');
      }
    });
    

    res.sendFile(__dirname + "/success.html");

  }).catch((error) => {
    res.sendFile(__dirname + "/failure.html");
  });
  
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});