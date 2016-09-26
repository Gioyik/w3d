var host = "127.0.0.1";
var ws = new WebSocket('ws://' + host + ':8080');
var conn_state;

ws.onopen = function () {
  if (ws.readyState != WebSocket.OPEN) {
    throw new Error('[w3d]: Not connected');
  } else {
    console.log('[w3d]: Connection ready. WebSocket connection state: '+ws.readyState);
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
var w3d = {
    // w3d.ledBlink(ledNumber, blinkTime)
    ledBlink: function(pin, delay) {
      console.log('[w3d]: Led (PIN)): '+pin+' - Blink (DELAY): '+delay);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledBlink', led: pin, blink: delay}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_BLINKING') {
            console.log('[w3d]: '+d.event);
          };
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      };
    },

    // w3d.ledOn(ledNumber)
    ledOn: function(pin) {
      console.log('[w3d]: Led (PIN)): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledOn', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_ON') {
            console.log('[w3d]: '+d.event);
          };
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      };
    },

    // w3d.ledOff(ledNumber)
    ledOff: function(pin) {
      console.log('[w3d]: Led (PIN)): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledOff', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_OFF') {
            console.log('[w3d]: '+d.event);
          };
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      };
    },

    // w3d.ledToggle(ledNumber)
    ledToggle: function(pin) {
      console.log('[w3d]: Led (PIN)): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledToggle', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_TOGGLE') {
            console.log('[w3d]: '+d.event);
          };
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      };
    },

    // w3d.ledStop(ledNumber)
    ledStop: function(pin) {
      console.log('[w3d]: Led (PIN)): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledStop', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_STOP') {
            console.log('[w3d]: '+d.event);
          };
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      };
    },
};
