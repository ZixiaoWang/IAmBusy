/**
 * ==========================
 * Hey, could you please....
 * I'm busy
 * ==========================
 * 
 * Basically that's the original motivation to create this repo
 * Hope it helps
 */

const faker = require('faker');
const colors = require('colors');

const javascript = require('./lib/javascript.js');

function ImBusy() {
    console.log('Compiling...');
}

ImBusy.onJavascript = javascript;

ImBusy.onJavascript()