var host = "127.0.0.1";
var ws = new WebSocket('ws://' + host + ':81');
var conn_state;

ws.onopen = function () {
  if (ws.readyState != WebSocket.OPEN) {
    throw new Error('[w3d]: Not connected');
  } else {
    console.log('[w3d]: Connection ready. WebSocket connection state: '+ws.readyState);
  }

  // Making sure we talk to the RPi
  ws.onmessage = function(a) {
    var b = JSON.parse(a.data);
    if (b.event == 'RPI_READY') {
      conn_state = b.event;
    } else {
      conn_state = 'RPI_NOT_READY';
    }
  };
};

ws.onclose = function () {
  console.log('Connection is closed. Check everything is running correctly');
};

// The Main class that has all the
// connection with the PI and specification
var w3d = {
    // w3d.ledBlink(ledNumber, blinkTime)
    ledBlink: function(pin, delay, cb) {
      console.log('[w3d]: Led (PIN): '+pin+' - Blink (DELAY): '+delay+' - Callback (CB): '+cb);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledBlink', led: pin, blink: delay, callback: cb}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_BLINKING') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.ledOn(ledNumber)
    ledOn: function(pin) {
      console.log('[w3d]: Led (PIN): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledOn', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_ON') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.ledOff(ledNumber)
    ledOff: function(pin) {
      console.log('[w3d]: Led (PIN): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledOff', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_OFF') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.ledToggle(ledNumber)
    ledToggle: function(pin) {
      console.log('[w3d]: Led (PIN): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledToggle', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_TOGGLE') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.ledStop(ledNumber)
    ledStop: function(pin) {
      console.log('[w3d]: Led (PIN): '+pin);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledStop', led: pin}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_STOP') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.ledStrobe(ledNumber, ms, callback)
    ledStrobe: function(pin, ms, cb) {
      console.log('[w3d]: Led (PIN): '+pin+' - Time (MS): '+ms+' - Callback (CB): '+cb);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledStrobe', led: pin, time: ms, callback: cb}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_STROBE') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.ledBrightnessledNumber, brightness)
    ledBrightness: function(pin, br) {
      console.log('[w3d]: Led (PIN): '+pin+' - Brightness (BR): '+br);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledBrightness', led: pin, bright: br}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_BRIGHTNESS') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // NO ANIMATION
    // w3d.ledFade(ledNumber, brightness, ms, callback)
    ledFade: function(pin, br, ms, cb) {
      console.log('[w3d]: Led (PIN): '+pin+' - Brightness (BR): '+br+' - Time (MS): '+ms+' - Callback (CB): '+cb);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledFade', led: pin, bright: br, time: ms, callback: cb}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_FADE') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.ledFadeIn(ledNumber, ms, callback)
    ledFadeIn: function(pin, ms, cb) {
      console.log('[w3d]: Led (PIN): '+pin+' - Time (MS): '+ms+' - Callback (CB): '+cb);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledFadeIn', led: pin, time: ms, callback: cb}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_FADEIN') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.ledFadeOut(ledNumber, ms, callback)
    ledFadeOut: function(pin, ms, cb) {
      console.log('[w3d]: Led (PIN): '+pin+' - Time (MS): '+ms+' - Callback (CB): '+cb);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledFadeOut', led: pin, time: ms, callback: cb}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_FADEOUT') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // NO ANIMATION
    // w3d.ledPulse(ledNumber, ms, callback)
    ledPulse: function(pin, ms, cb) {
      console.log('[w3d]: Led (PIN): '+pin+' - Time (MS): '+ms+' - Callback (CB): '+cb);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'ledPulse', led: pin, time: ms, callback: cb}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LED_PULSE') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.light(ledNumber, event, command)
    light: function(pin, ev, run) {
      console.log('[w3d]: Led (PIN): '+pin+' - Event (EV): '+ev+' - Command (RUN): '+run);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'light', led: pin, onevent: ev, command: run}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LIGHT') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

    // w3d.lightWithin(ledNumber, range, handler)
    // Event can be CHANGE or DATA only
    lightWithin: function(pin, ran, hdl) {
      console.log('[w3d]: Led (PIN): '+pin+' - Range (EV): '+ran+' - Handler (RUN): '+hdl);
      if (conn_state == "RPI_READY") {
        ws.send(JSON.stringify({event: 'lightWithin', led: pin, range: ran, handler: hdl}));
        ws.onmessage = function(c) {
          var d = JSON.parse(c.data);
          if (d.event == 'LIGHT_WITHIN') {
            console.log('[w3d]: '+d.event);
          }
        };
      } else {
        console.log('[w3d]: Impossible to send instructions to RPi');
      }
    },

};
