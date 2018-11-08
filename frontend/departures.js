var xhttp = new XMLHttpRequest();
// const moment = require('moment');

  function sendInfo(){
    var input = document.querySelector("#postcode").value;
    xhttp.open('GET', `http://localhost:3000/postcode/${input}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.responseType = 'text';
    xhttp.onload = function() {
      // setTimeout(function(){alert("hi")}, 3000);
      var arrayString = xhttp.responseText;
      console.log(arrayString);
      var array = JSON.parse(arrayString);
      var tags = [];
      tagsOne = createTags(array[0]);
      tags.push(tagsOne)
      tagsTwo = createTags(array[1]);
      tags.push(tagsTwo)
      addToHtml(tags);

    }
      xhttp.send();

}

function addToHtml(tags) {
  document.getElementById('results').innerHTML = tags[0] + tags[1];
}
function createTags (element) {
  var tag = '<h3>' + element.name + '</h3>'
  + '<ul> <li>' + "Arriving " + element.buses[0].timeToStation + " seconds from now is bus " + element.buses[0].lineName + " towards " + element.buses[0].towards + " with vehicle id " + element.buses[0].vehicleId + '</li>'
  + '<li>' + "Arriving " + element.buses[1].timeToStation + " seconds from now is bus " + element.buses[1].lineName + " towards " + element.buses[1].towards + " with vehicle id " + element.buses[1].vehicleId + '</li>'
  + '</ul>';
  return tag
}
