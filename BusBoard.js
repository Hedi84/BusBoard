const got = require('got');
const url = "https://api-radon.tfl.gov.uk/StopPoint/Mode/bus/Disruption/?app_id=f99ccd88&app_key=702440117b45a45f829df3026201c662"
const BusCode = "490008660N";


let array = [];

got(url, { json: true }).then(response => {
    array.push(response.body);
    return array;
    })

// let retrievedData = [];
// for(i = 0; i <= array.length; i++) {
//     if(array[i].stationAtcoCode === BusCode){
//     retrievedData.push(array[i]);
//     }
// }

console.log(array);