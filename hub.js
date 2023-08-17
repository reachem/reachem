'use strict';

const { Server } = require('socket.io');
const events = require('./eventPool');

const io = new Server();
io.listen(3000);

const reach = io.of('/reach');

function handleSendLocation(payload) {
  console.log(`My current location is lat:${payload.lat} lon:${payload.lon}`);
  reach.emit(events.sendLocation);
}

function handleReceiveLocation(payload) {
  console.log(`Other users can now see the location for ${payload.username}`);
  reach.emit(events.receiveLocation, {
    username: payload.username,
    lat: payload.lat,
    lon: payload.lon,
  });
}

function handleConfirmLocation(payload) {
  console.log('Location confirmed! I see you!', payload.username);
  reach.emit(events.confirmLocation, {
    username: payload.username,
    lat: payload.lat,
    lon: payload.lon,
  });
}

function handleConnection(socket) {
  console.log('New connection', socket.id);
  socket.on(events.sendLocation, handleSendLocation);
  socket.on(events.receiveLocation, handleReceiveLocation);
  socket.on(events.confirmLocation, handleConfirmLocation);
}

function startSocketServer() {
  console.log('The server is connected');
  reach.on('connection', (socket) => handleConnection(socket));
  
}
module.exports = { startSocketServer, handleSendLocation, handleReceiveLocation, handleConfirmLocation }

