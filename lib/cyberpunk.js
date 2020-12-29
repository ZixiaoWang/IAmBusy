const faker = require('faker');
const colors = require('colors');
const chalk = require('chalk');

const randomNumber = require('./utils/random-number');
const randomItem = require('./utils/random-array-item');

const WINDOW_WIDTH = 80;

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
                if (count < 0) {
                    clearInterval(interval);
                    console.log();
                    resolve();
                }
            }, 24);
        });
    }

    for await (let i of new Array(numberOfTasks).fill(0)) {
        const duration = randomNumber(300, 7000);
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
    function singleIndex() {
        return [0, 0, 0, 0, 0, 0, 0, 0].map(() => {
            return randomNumber(0, 9).toString();
        }).join('');
    }
    function singleNumberBlock() {
        return [0, 0, 0, 0, 0]
            .map(() => {
                const num = randomNumber(17, 255).toString(16);
                const r = randomNumber(1, 16);
                if (r < 2) {
                    return colors.green(num);
                } else {
                    return colors.yellow(num);
                }
            })
            .join(' ');
    }
    function singleResult() {
        let result = '';
        for (let i = 0; i < 16; i++) {
            const r = randomNumber(0, 99);
            const c = randomNumber(32, 127);
            result += r < 45 ? String.fromCharCode(c) : '_';
        }

        return result;
    }

    function singleLine() {
        const index = singleIndex();
        const ram = [0, 0, 0, 0].map(singleNumberBlock).join('  ');
        const result = singleResult();
        const line = index + ' | ' + ram + ' | ' + result;
        console.log(line);
    }

    for await (let i of new Array(lines).fill(0)) {
        const pausingTime = randomNumber(2, 10);
        await $pause(pausingTime);
        singleLine();
    }

    console.log();
}

async function $items(lines = 10) {
    async function singleLine() {
        const colorFn = randomItem(['red', 'green', 'yellow', 'yellow', 'yellow']);
        let key = faker.lorem.word();
        key = key.substring(0, 9);
        key = key.padEnd(10);
        key = colors[colorFn](key);
        key = ' ' + key;

        let content = faker.lorem.sentence();
        content = content.substring(0, WINDOW_WIDTH - 10);
        content = colors.yellow(content);

        console.log(key + ' ' + content);
    }

    for await (let i of new Array(lines).fill(0)) {
        const pausingTime = randomNumber(20, 300);
        await $pause(pausingTime);
        await singleLine();
    }

    console.log();
}

async function $ls(lines = 10) {
    async function singleLine() {
        const permissions = [0, 0, 0, 0].map(() => randomItem(['r--', '-w-', '--x', 'rw-', 'r-x', 'rwx'])).join('');
        const name = faker.name.firstName();
        const size = randomNumber(10, 100000).toString().padStart(7);
        const date = randomNumber(0, 24).toString().padStart(2) + ':' + randomNumber(0, 24).toString().padEnd(3);
        const file = faker.system.filePath();

        console.log([
            colors.yellow(permissions),
            colors.yellow(name.padStart(10)),
            colors.cyan(size),
            date,
            colors.yellow(file)
        ].join(' '))
    }

    for await (let i of new Array(lines).fill(0)) {
        const pausingTime = randomNumber(20, 300);
        await $pause(pausingTime);
        await singleLine();
    }

    console.log();
}

async function $files(files = 5) {
    async function singleFile(level = 0, isLastFile = false) {
        const indent = '├' + '——'.repeat(level) + '  ';
        const file = faker.system.filePath();
        console.log(indent + colors.yellow(file));

        if (level < 3) {
            if (randomNumber(1, 9) < 4) {
                const numberOfSubfiles = randomNumber(4, 10);
                for await (let i of new Array(numberOfSubfiles).fill(0)) {
                    const pausingTime = randomNumber(20, 30);
                    await $pause(pausingTime);
                    await singleFile(level + 1);
                }
            }
        }
    }

    for await (let i of new Array(files).fill(0)) {
        const pausingTime = randomNumber(20, 30);
        await $pause(pausingTime);
        await singleFile(0);
    }

    console.log();
}

function $systemInfo() {

}

async function $pause(duration = 1000) {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            resolve();
        }, duration)
    })
}

async function $cursor(duration = 1000) {
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


/**
 * Main
 */
async function cyberpunk() {
    console.clear();
    const fns = [
        [$paragraph, 1, 3],
        [$matrix, 100, 300],
        [$progress, 4, 7],
        [$items, 50, 115],
        [$ls, 15, 30],
        [$files, 15, 50]
    ]


    async function afterEnteredSystem() {
        const fnAndArgs = randomItem(fns);
        const arg = randomNumber(fnAndArgs[1], fnAndArgs[2]);
        const pausingTime = randomNumber(500, 1500);
        await fnAndArgs[0](arg);
        await $separator();
        await $cursor(pausingTime);
        afterEnteredSystem();
    }

    const init = colors.yellow('Starting system...');
    const tasks = new Array(randomNumber(7, 12)).fill(0);

    console.log(init);
    console.log();
    afterEnteredSystem();
}

module.exports = cyberpunk;