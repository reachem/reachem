'use strict';

const { io } = require('socket.io-client');
const { startClient } = require('./personTwo');

const events = io('ws://localhost:3000');

module.exports = { events };
startClient(events);