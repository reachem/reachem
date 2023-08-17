'use strict';

const { io } = require('socket.io-client');

const client = io('ws://localhost:3000/caps');
client.on(events.announcement, (payload) => console.log(payload.message));
client.on(events.ready, pickup);

// pickup(events);

client.on(pickup, (payload) => {
  pickupConfirmation(payload, client)
  setTimeout(() => {
    deliveredConfirmation(payload, client)}
    , 5000);
});

module.exports = { client };
