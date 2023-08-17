'use strict';

const { io } = require('socket.io-client');
const { example, Example } = require('../clients/example');
const client = io('ws://localhost:3000/reach');
const { sendLocation, receiveLocation, confirmLocation } = require('../eventPool');
const { handleSendLocation, handleReceiveLocation, handleConfirmLocation } = require('../hub');

const person = new Example();



if (handleSendLocation()) {
  console.log('Post!');
  client.emit(sendLocation, example);
}

if (handleReceiveLocation(example, receiveLocation)) {
  console.log('Location received!', example);
  client.on('received', example);
}

if (handleConfirmLocation(confirmLocation)) {
  console.log('Location is confirmed');
  client.on(confirmLocation, (example) =>
    handleSendLocation(example, confirmLocation)
  );
  client.on('request', () => {
    console.log('sending info', person);
    client.emit(person);
  });

}

module.exports = { };