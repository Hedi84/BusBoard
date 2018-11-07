const readline = require('readline-sync');
const importParse = require('./ParserPromise.js');
// const importClass = require('./BusArrival.js');
const moment = require('moment');
const importApp = require('./App.js');


function askPostcode () {
  return new Promise(function(resolve, reject){
    console.log("Please enter valid postcode:")
    var postcode = readline.prompt();
    resolve(postcode)
  });
}

function createPostcodeUrl (postcode) {
  return new Promise(function(resolve, reject) {
    var url = "api.postcodes.io/postcodes/" + postcode;
    resolve(url);
  });
}

function getLatLong (object) {
  return new Promise(function(resolve, reject) {
    var latLong = [];
    latLong.push(object.result.longitude);
    latLong.push(object.result.latitude);
    resolve(latLong);
  });
}

function parseLatLongUrl (array) {
  return new Promise(function(resolve, reject) {
    url = "https://api.tfl.gov.uk/Stoppoint?lat=" + array[1] + "&lon=" + array[0] + "&stoptypes=NaptanPublicBusCoachTram"
    resolve(url)
  })

}

function getNearestStops (object) {
  // console.log(object.stopPoints)
  createBusMessage(object);
  return retrieveTimes(object)
    .then (result => {
      return importApp.filteringData(result);
    })
}


function retrieveTimes (object) {
  // console.log(object.id);
  url = importApp.createsURL(object.id);
  // console.log(url);
  return importParse.parseURL(url);
}

function createBusMessage (object) {
  console.log("The first two buses for bus stop " + object.commonName + "are:")
}


askPostcode()
  .then(result => {
    return createPostcodeUrl(result)
  })
  .then (result => {
    return importParse.parseURL(result)
  })
  .then (result => {
    return getLatLong(result)
  })
  .then (result => {
    return parseLatLongUrl(result)
  })
  .then(result => {
    return importParse.parseURL(result)
  })
  .then (result => {
     getNearestStops(result.stopPoints[0])
     .then (() => {
       getNearestStops(result.stopPoints[1])
     });
  })
