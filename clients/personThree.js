'use strict';

const { chance, EVENT_NAMES } = require('../util');

function sendPickup(events) {
  const event = {
    // store: chance.city(),
    // orderId: chance.guid(),
    // customer: chance.name(),
    // address: chance.address(),
    // company: 'Flowers',
  };

  const payload = {
    event: 'pickup', // either pickup or delivered
    messageId: event.orderId, // unique id from the original payload
    clientId: `1-800-flowers`, // either acme-widgets or 1-800-flowers
    order: event,
  };

  console.log('Vendor asking for pickup!', event);
  events.emit(EVENT_NAMES.pickup, payload);
}
function acknowledgePost(payload, client) {
  console.log('Thank you for posting!', payload.messageId);
  client.emit('received', payload);
}



function startClient(client) {
  console.log('Vendor is started');
  client.emit('getAll', 'acme-widgets');
  client.on(EVENT_NAMES.delivered, (payload) =>
    acknowledgePost(payload, client)
  );
  
  function ready() {
    // sends an initial pickup event, then sets a timer for 4-5 seconds and repeats
    sendPickup(client);
    setTimeout(ready, chance.integer({ min: 5000, max: 10000 }));
  }
  // calls itself every 4 - 5 seconds
  ready();
}

module.exports = {startClient,
  toTest: {sendPickup, acknowledgePost}
};
