var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

server.listen(80);

/*app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});*/

io.on('connection', function (socket) {
  console.log("CONNECTION");
});

io.on('ledBlink', function(data) {
  console.log('ledBlink');
  board.on("ready", function() {
    var led = new five.Led(data);
    led.blink();
  })
});
