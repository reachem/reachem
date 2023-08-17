'use strict';

const {io} = require('socket.io-client');
const client = io('ws://localhost:3000/reach',
  {auth: {role: 'admin'}}
);
const {Example} = require('./example');
const { sendLocation, receiveLocation ,confirmLocation} = require('../eventPool');

const person = new Example();

client.on(receiveLocation, (payload) => {
  console.log('client connected, ', payload);
})


setInterval(() => {client.emit(sendLocation, person)},5000)


