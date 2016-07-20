var W3D;
var socket;

(function() {
  'use strict';

  var init = function() {
    socket = io.connect('http://localhost:3000');
  };

  init.prototype = {

    led: function(number) {
      socket.on('connection', function () {
        socket.emit('led:selection', number);
      }
    )},

    blink: function(time) {
      socket.on('connection', function () {
        socket.emit('blink:time', time);
      })
    }
  }

  W3D = function() {
    return new init();
  }

  if (window.$ == null) {
    window.$ = w3d;
  }
}());
