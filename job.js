//jshint esversion:6
const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const cron = require('node-cron');
const schedule = require('node-schedule');
const nodemailer = require("nodemailer");
const moment = require('moment-timezone');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPWD}@cluster0.v2n4v.mongodb.net/tidereporterjcDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  bufferMaxEntries: 0
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  city: String,
  state: String,
  lat: Number,
  lng: Number
});

const User = new mongoose.model("User", userSchema);


var j = schedule.scheduleJob('0 4 * * * Monday', function () {

  User.find({}, function (err, docs) {
    // cron.schedule('* 0 4 * * Wed', () => {
    // cron.schedule('*/1 * * * *', () => {
    if (!err) {
      for (let i = 0; i < docs.length; i++) {
        firstName = docs[i].firstName,
          lastName = docs[i].lastName,
          email = docs[i].email,
          city = docs[i].city,
          state = docs[i].state,
          lat = docs[i].lat,
          lng = docs[i].lng;

        console.log(email)
        fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${docs[i].lat}&lng=${docs[i].lng}`, {
          headers: {
            'Authorization': '2231c0d2-1675-11eb-b3db-0242ac130002-2231c14a-1675-11eb-b3db-0242ac130002'
          }
        }).then((response) => response.json()).then((jsonData) => {
          // console.log(jsonData.meta);
          console.log('Request Count: ' + jsonData.meta.requestCount);
          // console.log(jsonData.data);

          var time0 = moment(jsonData.data[0].time);
          var time1 = moment(jsonData.data[1].time);
          var time2 = moment(jsonData.data[2].time);
          var time3 = moment(jsonData.data[3].time);
          var time4 = moment(jsonData.data[4].time);
          var time5 = moment(jsonData.data[5].time);
          var time6 = moment(jsonData.data[6].time);
          var time7 = moment(jsonData.data[7].time);
          var time8 = moment(jsonData.data[8].time);
          var time9 = moment(jsonData.data[9].time);
          var time10 = moment(jsonData.data[10].time);
          var time11 = moment(jsonData.data[11].time);
          var time12 = moment(jsonData.data[12].time);
          var time13 = moment(jsonData.data[13].time);
          var time14 = moment(jsonData.data[14].time);
          var time15 = moment(jsonData.data[15].time);
          var time16 = moment(jsonData.data[16].time);
          var time17 = moment(jsonData.data[17].time);
          var time18 = moment(jsonData.data[18].time);
          var time19 = moment(jsonData.data[19].time);
          var time20 = moment(jsonData.data[20].time);
          var time21 = moment(jsonData.data[21].time);
          var time22 = moment(jsonData.data[22].time);
          var time23 = moment(jsonData.data[23].time);
          var time24 = moment(jsonData.data[24].time);
          var time25 = moment(jsonData.data[25].time);
          var time26 = moment(jsonData.data[26].time);
          var time27 = moment(jsonData.data[27].time);


          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });

          let mailOptions = {
            from: 'cannonj55@gmail.com',
            to: docs[i].email,
            subject: 'Your Local Tide Report',
            html: '<h3> Hello ' + docs[i].firstName + ', <br><br>' + 'The tidal extremes for ' + docs[i].city + ', ' + docs[i].state + ' are posted below: </h3><br> <h5>' +

              '<li>' + jsonData.data[0].type.toUpperCase() + ' tide on ' + time0.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[1].type.toUpperCase() + ' tide  on ' + time1.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[2].type.toUpperCase() + ' tide  on ' + time2.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[3].type.toUpperCase() + ' tide  on ' + time3.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[4].type.toUpperCase() + ' tide  on ' + time4.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[5].type.toUpperCase() + ' tide  on ' + time5.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[6].type.toUpperCase() + ' tide  on ' + time6.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[7].type.toUpperCase() + ' tide  on ' + time7.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[8].type.toUpperCase() + ' tide  on ' + time8.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[9].type.toUpperCase() + ' tide  on ' + time9.tz('America/New_York').format('dddd,MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[10].type.toUpperCase() + ' tide  on ' + time10.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[11].type.toUpperCase() + ' tide  on ' + time11.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[12].type.toUpperCase() + ' tide  on ' + time12.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[13].type.toUpperCase() + ' tide  on ' + time13.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[14].type.toUpperCase() + ' tide  on ' + time14.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[15].type.toUpperCase() + ' tide  on ' + time15.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[16].type.toUpperCase() + ' tide  on ' + time16.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[17].type.toUpperCase() + ' tide  on ' + time17.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[18].type.toUpperCase() + ' tide  on ' + time18.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[19].type.toUpperCase() + ' tide  on ' + time19.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[20].type.toUpperCase() + ' tide  on ' + time20.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[21].type.toUpperCase() + ' tide  on ' + time21.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[22].type.toUpperCase() + ' tide  on ' + time22.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[23].type.toUpperCase() + ' tide  on ' + time23.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[24].type.toUpperCase() + ' tide  on ' + time24.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[25].type.toUpperCase() + ' tide  on ' + time25.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[26].type.toUpperCase() + ' tide  on ' + time26.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br>' +
              '<li>' + jsonData.data[27].type.toUpperCase() + ' tide  on ' + time27.tz('America/New_York').format('dddd, MMMM Do YYYY @ h:mm a z') + '</li><br><br><br>' + '<h3>Thank you, ' + '<br>' + 'Tide Reporter</h3>' + '<h5>Local Station: ' + jsonData.meta.station.name + '<br>' + "Source: " + jsonData.meta.station.source + '</h5></h5>',
          };


          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              console.log('Error, Unable to send ', err);
            } else {
              console.log('Email sent :)');
            }
          });
        });
      }
    } else {
      console.log("Error, unable to grab transmit data", err);
    }
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running");
});