'use strict';

const { io } = require('socket.io-client');
const events = require('../eventPool');
const { example, Example } = require('../clients/example');
const client = io('ws://localhost:3000/reach');

const person = new Example();

client.emit(events.sendLocation, person);

client.on(events.receiveLocation, (person) => console.log(`Other users can now see the location for ${person.username}`, person.timestamp));
client.on(events.confirmLocation, (person) => console.log('Location confirmed! I see you!', person.username));

setInterval(() => {client.emit(events.sendLocation, person)}, 3000)
module.exports = { client };