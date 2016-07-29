var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//var five = require("johnny-five");
//var Raspi = require("raspi-io");
/*var board = new five.Board({
  io: new Raspi(),
  repl: false,
  debug: false,
});*/

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
  }
);

app.use(express.static('public'));

server.listen(8000);

io.set('origins', '*:*');

io.on('connection', function (socket) {
  socket.emit('ready');
  console.log("CONNECTION");
  socket.on('ledBlink', function(data) {
    console.log('ledBlink');
    /*board.on("ready", function() {
      var led = new five.Led(data);
      led.blink();
    })*/
  });
});
