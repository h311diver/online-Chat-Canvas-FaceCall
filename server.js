var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var socket = require('socket.io');
var io = socket(server);
var port = 5000
var socketList = [];
var socketUpload = require( "socketio-file-upload" );
app.use('/', function(req, resp) {
    resp.sendFile(__dirname + '/chat.html');
});


function onConnection(socket){
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  }
  
  io.on('connection', onConnection);



 
server.listen(port, function() {
    console.log('Server On !');
});


io.on('connection', (socket) => {
    // message 
    var roomName = null;
  
    socket.on('join', (data) => {
      roomName = data;
      socket.join(data);
    })
  
    socket.on('message', (data) => {
      io.sockets.in(roomName).emit('message', data);
      console.log(data);
    });
  
    
  });