const express = require('express')
const app = express()
const port = 3000
const script = require('./PostcodeApp.js');

app.use(express.static('frontend'))

app.get('/postcode/:id', function(req, res){
  var id = req.params.id;
  script.postcode(id)
    .then(output => {
      res.send(output);
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
