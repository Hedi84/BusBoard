const got = require('got');
const url = "https://api-radon.tfl.gov.uk/StopPoint/Mode/bus/Disruption/?app_id=f99ccd88&app_key=702440117b45a45f829df3026201c662"

//Retrieves information from URL and stores it in an array.

function parseURL(callback) {
    var array = [];
    got(url, { json: true }).then(response => {
        array = response.body;
        callback(array);
    })
}

exports.parseURL = parseURL;