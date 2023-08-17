'use strict';

const {io} = require('socket.io-client');
const client = io('ws://localhost:3000/reach',
  {auth: {role: 'admin'}}
);
const {Example} = require('./example');
const { sendLocation, receiveLocation ,confirmLocation} = require('../eventPool');

const person = new Example();


setInterval(() => {client.emit(sendLocation, person)},5000)
