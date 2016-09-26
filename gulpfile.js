var gulp = require('gulp');
var ifaces = require('os').networkInterfaces();
var replace = require('gulp-replace');
var webserver = require('gulp-webserver');
var spawn = require('child_process').spawn;
var address;
var node;

// Get ip address from device
for (var dev in ifaces) {
    ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined);
}

gulp.task('default', function() {
    // Insert correct IP where the websocket
    // is running
    gulp.src(['source/client.js'])
      .pipe(replace('127.0.0.1', address))
      .pipe(gulp.dest('public'));

    // Serve w3d file for client
    gulp.src('public')
      .pipe(webserver({
        livereload: true,
        host: address,
        port: 8081
      }));

    // Start node socket server on the RPi
    if (node) node.kill()
    node = spawn('node', ['source/server.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
      if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
      }
    });
});

process.on('exit', function() {
    if (node) node.kill()
})
