const faker = require('faker');
const colors = require('colors');

const randomNumber = require('./utils/random-number.js');
const randomItem = require('./utils/random-array-item.js');

const languages = [
    'css', 'scss', 'less',
    'file',
    'html', 'xml',
    'javascript', 'typescript', 'json'
]

function webpack() {
    // One
    const language = randomItem(languages);
    console.log('Child ' + colors.bold(`vs/language/${language}/${language}Worker:`));
    console.log(
        '   ' +
        colors.bold('Asset'.padStart(25)) +
        colors.bold('Size'.padStart(10)) +
        colors.bold('Chunks'.padStart(8)) +
        ' '.padEnd(10) +
        colors.bold('Chunk Names')
    )
    console.log(
        '   ' +
        colors.green((language + '.worker.js').padStart(25)) +
        (randomNumber(500, 1200) + ' KiB').padStart(10) +
        'main'.padStart(8) +
        ' '.padEnd(10) +
        'main'
    )
    console.log(
        '   ' +
        colors.green((language + '.worker.js.map').padStart(25)) +
        (randomNumber(500, 1200) + ' KiB').padStart(10) +
        'main'.padStart(8) +
        colors.green('  [dev]'.padEnd(10)) +
        'main'
    )
    console.log(
        '   Entrypoint ' +
        colors.bold('main') +
        ' = ' +
        colors.green(language + '.worker.js') +
        ' ' +
        colors.green(language + 'worker.js.map')
    )


    // Two
    const length = randomNumber(12, 16);
    for (let i = 0; i <= length; i++) {
        const t = '/node_modules/' + language + '-editor/esm/vs/base/common/' + faker.lorem.word() + '.js';
        console.log(
            '   ' +
            '[.' + t + '] ' +
            colors.bold('.' + t + ' ')
            + randomNumber(1, 15) + '.' + randomNumber(1, 99) + ' KiB ' +
            `{${colors.yellow('main')}} ` +
            colors.green('built')
        )
    }

    // new line
    const cooldownMilliSecond = randomNumber(100, 500);
    setTimeout(webpack, cooldownMilliSecond);

}

module.exports = webpack;