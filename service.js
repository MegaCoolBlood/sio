var express = require('express')
var ws = require('./x')
var app = express()
app.get('/', function (req, res) {
   res.sendfile(__dirname + '/mouse.html');
})
app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
})

