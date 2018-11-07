const got = require('got');
const readline = require('readline-sync');

//Retrieves information from URL and stores it in an array.

function parseURL(url) {
  // console.log(url);
    var array = [];
    return got(url, { json: true })
        .then(response => {
            array = response.body;
            // console.log('Reached Callback');
            return array;
       })
}



exports.parseURL = parseURL;
