// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function naturalToUnix(str) {
  var re = /(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d+),\s(\d+)/;
  var match = re.exec(str);
  if(match != null) {
    //var month = monthToNumber(match[1]);
    var month = monthArr.indexOf(match[1]);
    var day = match[2];
    var year = match[3];
    var date = new Date(year, month, day);
    var unixtime = date.getTime()/1000;
    return unixtime;
  }  
  return null;
}

function unixToNatural(unixtime) {
  if(typeof(unixtime) === "number" && unixtime > 0) {
    var date = new Date(unixtime * 1000);
    //date.setTime(unixtime);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    return monthArr[month] + " " + day + ", " + year; 
  }
  return null;
}

app.get("/date/:value", function (request, response) {
  var value = request.params['value'];
  var unixtime = naturalToUnix(value);
  var nattime = unixToNatural(Number(value));
  var result = {};
  if (unixtime == null && nattime == null) {
    result = null;
  }
  else if(unixtime != null) {
    result = {Natural: value, Unixtime: unixtime};
  }
  else if(nattime != null) {
    result = {Natural: nattime, Unixtime: value};
  }
  response.json(result);
  response.end("\nOK");
  //response.send(match[0] + match[1]);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
