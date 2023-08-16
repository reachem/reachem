'use strict';

const { Server } = require('socket.io');

const io = new Server();
io.listen(3000);

const reach = io.of('/reach');


function handleConnection(socket) {
  console.log('New connection', socket.id);
}

function startSocketServer() {
  console.log('The server is connected');
  reach.on('connection', (socket) => handleConnection(socket));
}
module.exports = { startSocketServer }

