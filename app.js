//jshint esversion:6
const fetch = require("node-fetch");
const express = require("express");
const bodyParser  = require("body-parser");
const nodemailer = require("nodemailer");
const moment = require('moment-timezone');
const { parse } = require("path");
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


  
  fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
    headers: {
      'Authorization': '2231c0d2-1675-11eb-b3db-0242ac130002-2231c14a-1675-11eb-b3db-0242ac130002'
    }
}).then((response) => response.json()).then((jsonData) => {
    // Do something with response data.
  console.log(jsonData.meta);
  console.log('Request Count: ' + jsonData.meta.requestCount);
  // console.log(jsonData.data[2].time);
  var time1 = moment(jsonData.data[1].time);
  var time3 = moment(jsonData.data[3].time);
  var time5 = moment(jsonData.data[5].time);
  var time7 = moment(jsonData.data[7].time);
  var time9 = moment(jsonData.data[9].time);
  var time11 = moment(jsonData.data[11].time);
  var time13 = moment(jsonData.data[13].time);
  var time15 = moment(jsonData.data[15].time);
  var time17 = moment(jsonData.data[17].time);
  var time19= moment(jsonData.data[19].time);
  var time21 = moment(jsonData.data[21].time);
  var time23 = moment(jsonData.data[23].time);
  var time25 = moment(jsonData.data[25].time);
  // var time27 = moment(jsonData.data[27].time);







  console.log(timeZoneTest.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z'));
  // console.log(time27.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z'));

  // console.log(jsonData.data[2].type);





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
      // html: 'Hello ' + firstName + ', <br><br>'+ 'The tidal extremes for ' + city +', '+ state + ' are posted below: <br><br>' +
      
      //  'Time: ' + time1.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' +
      //  'Time: ' + time3.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' +
      //  'Time: ' + time5.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' +
      //  'Time: ' + time7.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' + 
      //  'Time: ' + time9.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' +
      //  'Time: ' + time11.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' + 
      //  'Time: ' + time13.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' +
      //  'Time: ' + time15.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' + 
      //  'Time: ' + time17.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' +
      //  'Time: ' + time19.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' + 
      //  'Time: ' + time21.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' + 
      //  'Time: ' + time23.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' +
      //  'Time: ' + time25.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' +
      //  'Time: ' + time27.tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z') + '<br><br>' + 'Thank you, '+ '<br>'+ 'The Tide Reporter Team' + '<br><br>' + 'P.S. We are working swiftly to implement new features. Thank you!',
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