'use strict';



const Chance = require('chance');
const chance = new Chance();


class Example {
  constructor(){
    this.username = chance.string({length: 8})
    this.email = chance.email();
    this.lat= chance.latitude();
    this.long= chance.longitude();
    this.timestamp= new Date();
  }

}

console.log(new Example())

module.exports = {Example}