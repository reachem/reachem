'use strict';



const Chance = require('chance');
const chance = new Chance();


class Example {
  constructor(){
    this.username = chance.word({length: 8});
    this.email = chance.email();
    this.lat = chance.latitude();
    this.long = chance.longitude();
    this.timestamp = new Date();
  }
}

module.exports = {Example};
