'use strict';

const { io } = require("socket.io-client");

const events = io('ws://localhost:3000');
