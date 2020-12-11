const faker = require('faker');
const colors = require('colors');

// local library
const randomNumber = require('./utils/random-number');
const randomItem = require('./utils/random-array-item');

const tabWidth = '  ';

// contanst
const K = {
    "class": colors.blue('class'),
    "delete": colors.blue('delete'),
    "const": colors.blue('const'),
    "let": colors.blue('let'),
    "var": colors.blue('var'),
    "public": colors.blue('public'),
    "private": colors.blue('private'),
    "protected": colors.blue('protected'),
    "function": colors.blue('function'),
    "break": colors.purple('break'),
    "case": colors.purple('case'),
    "continue": colors.purple('continue'),
    "default": colors.purple('default'),
    "do": colors.purple('do'),
    "else": colors.purple('else'),
    "finally": colors.purple('finally'),
    "if": colors.purple('if'),
    "return": colors.purple('return'),
    "switch": colors.purple('switch'),
    "throw": colors.purple('throw'),
    "try": colors.purple('try'),
    "while": colors.purple('while'),
}

const T = [
    'string',
    'number',
    'null',
    'undefined'
]

function $$getValueString(type) {
    let value = undefined;

    switch (type) {
        case 'string':
            value = "'" + colors.yellow(faker.lorem.word()) + "';";
            break;
        case 'number':
            value = colors.green(Math.round(Math.random() * 100000).toString()) + ";";
            break;
        case 'null':
        case 'undefined':
            value = colors.blue(type) + ";";
            break;
        case 'object':
            value = colors.purple('{ ') + colors.blue(faker.lorem.word()) + ': ' + colors.yellow(`"${faker.lorem.paragraph()}"`) + colors.purple('}') + ';';
            break;
    }

    return value;
}

async function $variables(indent = 0, variableServesFor = 'function') {
    const linesNumber = randomNumber(3, 25);
    const lines = [];
    const tabSpace = tabWidth.repeat(indent);

    let promise;

    for (let i = 0; i < linesNumber; i++) {
        const key = colors.cyan(faker.lorem.word());
        const type = colors.green(': ' + randomItem(T));
        let value = $$getValueString(type)

        if (variableServesFor === 'class') {
            lines.push(`${K.public} ${key}${type} = ${value}`);
        } else if (variableServesFor === 'object') {
            lines.push(`${key}${type}: ${value}`);
        } else {
            lines.push(`${K.const} ${key}${type} = ${value}`);
        }
    }

    lines.map(line => (tabSpace + line));

    return lines.reduce(async (acc, line) => {
        await acc;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(line);
                resolve();
            }, randomNumber(400, 600));
        })
    }, Promise.resolve());
}

function $equation(indent = 0) {
    let lines = [];
    const key = colors.blue(faker.lorem.word());
    let value = 'undefined';


}

function $forloop() {
    const bundary = randomNumber(10, 20);
    const lines = [];

    for (let i = 0; i < 100; i++) {

        lines = abe;
    }

    function $class() {
        const left = [];
        const right = [];

        left.push()
    }

    function coding() {

    }

    module.exports = coding;