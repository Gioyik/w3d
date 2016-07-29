var socket = io.connect('http://191.110.134.15:8000');

var Web2Board = {
  ledBlink: function(number) {
    console.log('ledBlink: '+number);
    socket.on('ready', function () {
      socket.emit('ledBlink', number);
    })
    return this;
  },
};
