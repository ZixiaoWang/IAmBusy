const faker = require('faker');
const colors = require('colors');
const chalk = require('chalk');

const randomNumber = require('./utils/random-number');
const randomItem = require('./utils/random-array-item');

const WINDOW_WIDTH = 100;

async function $progress(numberOfTasks = 1) {
    function $singleProgress(duration = 1000, prefix = '', postfix = '') {
        const numberOfBlock = WINDOW_WIDTH - 25;
        let total = (duration / 24) | 0;
        let count = (duration / 24) | 0;
        let interval = 0;

        return new Promise((resolve, reject) => {
            interval = setInterval(() => {
                const progress = Math.round(((total - count) / total) * numberOfBlock);
                const done = '▊'.repeat(progress);
                const undone = '_'.repeat(numberOfBlock - progress);
                const tail = postfix ? postfix : (' ' + (progress / numberOfBlock * 100).toFixed(2) + '%');
                const info = ' ' + prefix + ' ' + (done + undone).padEnd(numberOfBlock + 1) + tail + '\r';

                process.stdout.write(chalk.yellow(info));
                count--;
                if (count <= 0) {
                    clearInterval(interval);
                    console.log();
                    resolve();
                }
            }, 24);
        });
    }

    for await (let i of new Array(numberOfTasks).fill(0)) {
        const duration = randomNumber(1000, 15000);
        const prefix = `[${faker.lorem.word().substring(0, 7).padStart(7)}]`;
        await $singleProgress(duration, prefix);
    }

    console.log();
}

async function $paragraph(numberOfParagraphes = 1) {
    function $singleParagraph() {
        return new Promise((resolve, reject) => {
            const wordsNumber = randomNumber(45, 200)
            const words = new Array(wordsNumber).fill(' ').map(() => faker.lorem.word());
            const lines = [];
            let buffer = faker.random.word();
            let paragraph = '';

            words.forEach((word) => {
                if (buffer.length + word.length + 1 > WINDOW_WIDTH) {
                    lines.push(buffer);
                    buffer = word;
                } else {
                    buffer = buffer + ' ' + word;
                }
            });

            paragraph = lines.join('\n');
            console.log(colors.yellow(paragraph));
            console.log();
            resolve();
        });
    }

    for await (let i of new Array(numberOfParagraphes).fill(0)) {
        const pausingTime = randomNumber(1000, 6000);
        await $singleParagraph();
        await $pause(pausingTime);
    }

    console.log();
}

async function $separator() {
    console.log(colors.yellow('-'.repeat(WINDOW_WIDTH)));
    console.log();
}

async function $matrix(lines = 4) {
    function singleNumber() {
        return [0, 0, 0, 0]
            .map(() => randomNumber(7000, 15000).toString(16).substring(0, 4)).join('');
    }
    function singleLine() {
        return new Promise((resolve) => {
            const line = [0, 0, 0, 0].map(singleNumber);
            console.log(colors.yellow(line.join(' ')));
            resolve();
        });
    }

    for await (let i of new Array(lines).fill(0)) {
        await $pause(500);
        await singleLine();
    }

    console.log();
}

function $systemInfo() {

}

async function $pause(duration = 1000) {
    let flag = true;
    let count = (duration / 500) | 0 + 1;
    let interval = undefined;

    return new Promise((resolve) => {
        interval = setInterval(() => {
            const cursor = colors.yellow(flag ? '▊' : '_');
            process.stdout.write(cursor + '\r');
            flag = !flag;
            count--;

            if (count <= 0) {
                clearInterval(interval);
                process.stdout.write(' \r');
                resolve();
            }
        }, 500);
    });
}

async function cyberpunk() {
    console.clear();
    const fns = [
        $paragraph,
        $matrix,
        $progress,
        $separator
    ]


    async function afterEnteredSystem() {
        const fn = randomItem(fns);
        const arg = randomNumber(1, 4);
        const pausingTime = randomNumber(500, 7500);
        await fn(arg);
        await $pause(pausingTime);
        afterEnteredSystem();
    }

    const init = colors.yellow('Starting system...');
    const tasks = new Array(randomNumber(7, 12)).fill(0);

    console.log(init);
    console.log();
    afterEnteredSystem();
}

module.exports = cyberpunk;