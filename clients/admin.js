'use strict';

const {io} = require('socket.io-client');
const client = io('ws://localhost:3000/reach',
  {auth: {role: 'admin'}}
);
const {Example} = require('./example');
const { sendLocation, receiveLocation ,confirmLocation} = require('../hub');

const person = new Example();


client.on('request', () => {
  console.log('sending info', person)
  // client.emit(person)
});
