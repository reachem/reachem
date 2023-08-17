'use strict';

const { chance, EVENT_NAMES } = require('..')

function start(client) {
  console.log("Vendor is started");
  client.emit("getAll", "acme-widgets");
  client.on(EVENT_NAMES.delivered, (payload) =>
    acknowledgeDelivery(payload, client)
  );
