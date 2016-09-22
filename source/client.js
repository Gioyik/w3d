var host = "127.0.0.1";
var ws = new WebSocket('ws://' + host + ':8080');
var conn_state;

ws.onopen = function () {
  if (ws.readyState != WebSocket.OPEN) {
    throw new Error('[Web2Board]: Not connected');
  } else {
    console.log('[Web2Board]: Connection ready. WebSocket connection state: '+ws.readyState);
  };

  // Making sure we talk to the RPi
  ws.onmessage = function(a) {
    var b = JSON.parse(a.data);
    if (b.event == 'RPI_READY') {
      conn_state = b.event;
    } else {
      conn_state = 'RPI_NOT_READY';
    };
  };
};

ws.onclose = function () {
  console.log('Connection is closed. Check everything is running correctly');
}

// The Main class that has all the
// connection with the PI and specification
var Web2Board = {
    // Web2Board.ledBlink(ledNumber, blinkTime)
    ledBlink: function(pin, delay) {
      console.log('[Web2Board]: Led (PIN)): '+pin+' - Blink (DELAY): '+delay);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledBlink', led: pin, blink: delay}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_BLINKING') {
            console.log('[Web2Board]: '+d.event);
          };
        };
      } else {
        console.log('[Web2Board]: Impossible to send instructions to RPi');
      };
    },

    // Web2Board.ledOn(ledNumber)
    ledOn: function(pin) {
      console.log('[Web2Board]: Led (PIN)): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledOn', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_ON') {
            console.log('[Web2Board]: '+d.event);
          };
        };
      } else {
        console.log('[Web2Board]: Impossible to send instructions to RPi');
      };
    },

    // Web2Board.ledOff(ledNumber)
    ledOff: function(pin) {
      console.log('[Web2Board]: Led (PIN)): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledOff', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_OFF') {
            console.log('[Web2Board]: '+d.event);
          };
        };
      } else {
        console.log('[Web2Board]: Impossible to send instructions to RPi');
      };
    },

    // Web2Board.ledToggle(ledNumber)
    ledToggle: function(pin) {
      console.log('[Web2Board]: Led (PIN)): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledToggle', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_TOGGLE') {
            console.log('[Web2Board]: '+d.event);
          };
        };
      } else {
        console.log('[Web2Board]: Impossible to send instructions to RPi');
      };
    },

    // Web2Board.ledStop(ledNumber)
    ledStop: function(pin) {
      console.log('[Web2Board]: Led (PIN)): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledStop', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_STOP') {
            console.log('[Web2Board]: '+d.event);
          };
        };
      } else {
        console.log('[Web2Board]: Impossible to send instructions to RPi');
      };
    },
};
