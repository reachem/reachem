'use strict';

const { chance, EVENT_NAMES } = require('../util');

function sendPickup(events) {

  const   payload = {
    username: chance.string({length: 8}),
    email: chance.email(),
    lat: 32.4124,
    long: 12.143241,
    timestamp: new Date(),
  };

  console.log('Post!', event);
  events.emit(EVENT_NAMES.pickup, payload);
}
function acknowledgePost(payload, client) {
  console.log('Thank you for posting!', payload.messageId);
  client.emit('received', payload);
}



function startClient(client) {
  console.log('Client is started');
  client.emit('getAll', '');
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
