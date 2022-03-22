// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get("/api/whoami", function(req, res) {
  const language = req.header('Accept-Language');
  const software = req.header('User-Agent');
  
  const { JSDOM } = require( "jsdom" );
  const { window } = new JSDOM( "" );
  const $ = require( "jquery" )( window );
  $.getJSON('http://ipinfo.io', function(data){
    res.json({
    ipaddress: data.ip,
    language,
    software,
  })
  });
  
})

// {"ipaddress":"2405:4800:735c:256f:89df:7ae7:1db1:2d4f","language":"en,en-US;q=0.9,vi;q=0.8","software":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"}


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
