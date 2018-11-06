const readline = require('readline-sync');
const importParse = require('./Parser.js');
const importClass = require('./BusArrival.js');
const moment = require('moment');

//Filters information for user inputted Bus Code
function filteringData(array) {
    let retrievedData = [];
    let numberOfBuses = Math.min(array.length,5);
    for(i = 0; i <= numberOfBuses - 1; i++) {
        retrievedData.push(new importClass.BusArrival(array[i].vehicleId,array[i].timeToStation,array[i].lineName,array[i].towards))
    }
    if (retrievedData.length > 0) {
        retrievedData.sort(sortData);
        retrievedData.forEach(function(element) {
        console.log("Arriving " + moment().add(element.timeToStation,"seconds").fromNow() + " is bus " + element.lineName + " towards " + element.towards + " with vehicle id " + element.vehicleId )
        })
    } else {
        console.log(`There was no information for that bus code :'(`);
    }
}

//Provides the filtering criteria for the Parser and returns the filtered information into an array.
function runProgram() {
    var busCode = userInput();
    var url = createsURL(busCode);
    importParse.parseURL(filteringData,url);
}

function createsURL(input) {
    const url = "https://api.tfl.gov.uk/StopPoint/" + input + "/Arrivals";
    return url;
}

function userInput() {
    console.log("Please enter the bus code:");
    var userInput = readline.prompt();
    return userInput;
}

function sortData(bus1,bus2) {
    if (bus1.timeToStation < bus2.timeToStation) {
        return -1;
    } else if (bus1.timeToStation > bus2.timeToStation) {
        return 1;
    } else {
        return 0;
    }
}

function runProgramPostcode () {
  postcode = askPostcode();
  url = createPostcodeUrl;
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

function getLatLong (array) {
  console.log("reached latlong");
  console.log(array);
}

runProgramPostcode();
