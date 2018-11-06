const got = require('got');
const readline = require('readline-sync');

//Retrieves information from URL and stores it in an array.

function parseURL(callback,url) {
  console.log(url);
    var array = [];
    got(url, { json: true })
        .then(response => {
            array = response.body;
            console.log('Reached Callback');
            callback(array);
       })
       .catch
       }



exports.parseURL = parseURL;
