var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', function(socket) {

  socket.on('draw', function(coords) {
    io.emit('draw', coords);
    // console.log(coords);
  });

});

server.listen(3000, function() {
  console.log('Listening on 3000...');
});
