'use strict';

const { io } = require('socket.io-client');
const events = require('../eventPool');
const { example } = require('../clients/example');
const client = io('ws://localhost:3000/reach');


reach.emit(events.sendLocation, payload);

reach.on(events.receiveLocation, (example) => console.log(`Other users can now see the location for ${example.username}`, payload.timestamp));
reach.on(events.confirmLocation, (example) => console.log('Location confirmed! I see you!', example.username));
// const person = new Example();

// if (handleSendLocation()) {
//   console.log('Post!');
//   client.emit(sendLocation, example);
// }

// if (handleReceiveLocation(example, receiveLocation)) {
//   console.log('Location received!', example);
//   client.on('received', example);
// }

// if (handleConfirmLocation(confirmLocation)) {
//   console.log('Location is confirmed');
//   client.on(confirmLocation, (example) =>
//     handleSendLocation(example, confirmLocation)
//   );
//   client.on('request', () => {
//     console.log('sending info', person);
//     client.emit(person);
//   });

// }

module.exports = { client };