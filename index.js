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

const tslint = require('./lib/tslint.js');
const webpack = require('./lib/webpack.js');
const coding = require('./lib/coding.js');

function ImBusy() {
    console.log('Compiling...');
}

ImBusy.onTsLint = tslint;
ImBusy.onWebpack = webpack;
ImBusy.onCoding = coding;

// TODO
ImBusy.onCoding();
// ImBusy.onWebpack();
// ImBusy.onTsLint();