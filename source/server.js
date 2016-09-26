var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });
var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi(),
  repl: false,
  debug: false,
});

// Client and RPi are connected
// Let's go ahead
wss.on('connection', function (socket) {
  console.log('[w3d]: Connection from remote client');
  // Sending confirmation to the client
  socket.send(JSON.stringify({event: 'RPI_READY'}));
  // Led blink function from Jhonny Five
  socket.on('message', function(a) {
    // Check if we are receiving a message from client
    // framework to connect with Johnny Five
    var b = JSON.parse(a);

    if (b.event == 'ledBlink') {
      board.on("ready", function() {
        // Tell Jhonny Five to Blink the led
        var led = new five.Led(b.led);
        // Blink delay or timing is not mandatory
        // most of people don't set this at first
        // However you can specify this if you want
        led.blink(b.blink);
      });
      // Send notification of Led Blinking
      socket.send(JSON.stringify({event: 'LED_BLINKING'}));
      console.log('[w3d]: Led Blinking');
    };

    if (b.event == 'ledOn') {
      board.on("ready", function() {
        // Tell Jhonny Five to On the led
        var led = new five.Led(b.led);
        led.on();
      });
      // Send notification of Led On
      socket.send(JSON.stringify({event: 'LED_ON'}));
      console.log('[w3d]: Led state On');
    };

    if (b.event == 'ledOff') {
      board.on("ready", function() {
        // Tell Jhonny Five to Off the led
        var led = new five.Led(b.led);
        led.on();
      });
      // Send notification of Led Off
      socket.send(JSON.stringify({event: 'LED_OFF'}));
      console.log('[w3d]: Led state Off');
    };

    if (b.event == 'ledToggle') {
      board.on("ready", function() {
        // Tell Jhonny Five to Toggle the led
        var led = new five.Led(b.led);
        led.toggle();
      });
      // Send notification of Led Toggle
      socket.send(JSON.stringify({event: 'LED_TOGGLE'}));
      console.log('[w3d]: Led state Toggle');
    };
  });
});

wss.on('close', function() {
  console.log('The connection with the Raspberry PI is closed');
});

wss.on('error', function(e) {
  console.log('Something wrong happened. [INFO]: '+e);
});
