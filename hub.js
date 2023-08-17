'use strict';

const { Server } = require('socket.io');
const events = require('./eventPool');

const io = new Server();
io.listen(3000);

const reach = io.of('/reach');

function handleSendLocation(payload) {
  console.log(`My current location is lat:${payload.lat} lon:${payload.long}`, payload.timestamp);
  reach.to('admin').emit(events.receiveLocation, payload);  
  reach.emit(events.receiveLocation, {
    username: payload.username,
    lat: payload.lat,
    long: payload.long,
    timestamp: payload.timestamp,
  });}

function handleReceiveLocation(payloçad) {
  console.log(`Other users can now see the location for ${payload.username}`, payload.timestamp);

  reach.to('admin').emit(events.receiveLocation, payload);  
  reach.emit(events.receiveLocation, {
    username: payload.username,
    lat: payload.lat,
    long: payload.long,
    timestamp: payload.timestamp,
  });
}

function handleConfirmLocation(payload) {
  console.log('Location confirmed! I see you!', payload.username);
  reach.emit(events.confirmLocation, {
    username: payload.username,
    lat: payload.lat,
    long: payload.long,
  });
}

function handleConnection(socket) {
  console.log('New connection', socket.id);
  if(socket.handshake.auth.role === 'admin'){
    console.log('welcome admin');
    socket.join('admin');
  }
  socket.on(events.sendLocation, (payload) => handleSendLocation(payload));
  socket.on(events.receiveLocation, (payload) => handleReceiveLocation(payload));
  socket.on(events.confirmLocation, (payload) => handleConfirmLocation(payload));
}

function startSocketServer() {
  console.log('The server is connected');
  reach.on('connection', (socket) => handleConnection(socket));
  
}


// function requestLocation(socket){
//   socket.emit(requestLocation)
// };

// requestLocation(reach);

module.exports = { 
  startSocketServer, 
  handleSendLocation, 
  handleReceiveLocation, 
  handleConfirmLocation,
  io,
  reach,
};

