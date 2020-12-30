#!/usr/bin/env node

/**
 * ==========================
 * Hey, could you please....
 * I'm busy
 * ==========================
 * 
 * Basically that's the original motivation to create this repo
 * Hope it helps
 */

const { program } = require('commander');

const tslint = require('./lib/tslint.js');
const webpack = require('./lib/webpack.js');
const coding = require('./lib/coding.js');
const cyberpunk = require('./lib/cyberpunk');

const randomItem = require('./lib/utils/random-array-item');
function ImBusy() {
    const fn = randomItem([tslint, webpack, coding, cyberpunk]);
    console.clear();
    fn();
}

ImBusy.onTsLint = tslint;
ImBusy.onWebpack = webpack;
ImBusy.onCoding = coding;
ImBusy.onCyberpunk = cyberpunk;

program
    .version('1.0.0');

program
    .command('on <task>')
    .description("Specify the task you're working on")
    .action((task) => {
        const taskName = (task || '').toString().toLowerCase();
        switch (taskName) {
            case 'tslint':
                console.clear();
                ImBusy.onTsLint();
                break;
            case 'webpack':
                console.clear();
                ImBusy.onWebpack();
                break;
            case 'coding':
            case 'programming':
                console.clear();
                ImBusy.onCoding();
                break;
            case 'cyberpunk':
                console.clear();
                ImBusy.onCyberpunk();
                break;
            default:
                ImBusy();
        }
    });

program
    .parse(process.argv);