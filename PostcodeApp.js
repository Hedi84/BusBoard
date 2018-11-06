const readline = require('readline-sync');
const importParse = require('./Parser.js');
// const importClass = require('./BusArrival.js');
const moment = require('moment');
const importApp = require('./App.js');


function runProgramPostcode () {
  postcode = askPostcode();
  url = createPostcodeUrl(postcode);
  importParse.parseURL(getLatLong, url);
}

function askPostcode () {
  console.log("Please enter valid postcode:")
  var postcode = readline.prompt();
  return postcode
}

function createPostcodeUrl (postcode) {
  var url = "api.postcodes.io/postcodes/" + postcode;
  return url;
}

function getLatLong (object) {
  var latLong = [];
  latLong.push(object.result.longitude);
  latLong.push(object.result.latitude);
  parseLatLongUrl(latLong);
}

function parseLatLongUrl (array) {
  url = "https://api.tfl.gov.uk/Stoppoint?lat=" + array[1] + "&lon=" + array[0] + "&stoptypes=NaptanPublicBusCoachTram"
  importParse.parseURL(getNearestStops, url);
}

function getNearestStops (object) {
  // console.log(object.stopPoints)
  createBusMessage(object.stopPoints[0]);
  retrieveTimes(object.stopPoints[0]);
  createBusMessage(object.stopPoints[1]);
  retrieveTimes(object.stopPoints[1]);
}

function retrieveTimes (object) {
  url = importApp.createsURL(object.id);
  importParse.parseURL(importApp.filteringData, url);
}

function createBusMessage (object) {
  console.log("The first two buses for bus stop " + object.commonName + "are:")
}

runProgramPostcode();
