const readline = require('readline-sync');
const importParse = require('./ParserPromise.js');
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
  return retrieveTimes(object)
    .then(result => {
      return importApp.filteringData(result);
    })
    .then(busesArray => {
      return {name : object.commonName, buses : busesArray}
    })
}


function retrieveTimes (object) {
  url = importApp.createsURL(object.id);
  return importParse.parseURL(url);
}

function createBusMessage (object) {
  return "The first two buses for bus stop " + object.commonName + "are:"
}

function postcode (postcode) {
  return createPostcodeUrl(postcode)
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
      var array = []
       return getNearestStops(result.stopPoints[0])
       .then(object => {
         array.push(object);
         return getNearestStops(result.stopPoints[1])
          .then (object2 => {
             array.push(object2);
             return array;
          });
        });
      });
}

  exports.postcode = postcode
