const express = require('express')
const app = express()
const port = 3000
const script = require('./PostcodeApp.js');



app.get('/postcode/:id', function(req, res){
  var id = req.params.id;
  script.postcode(id)
  // return output
    .then(output => {
      res.send(output);
    })
})
// res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
