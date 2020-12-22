const faker = require('faker');
const colors = require('colors');

// local library
const randomNumber = require('./utils/random-number');
const randomItem = require('./utils/random-array-item');

const tabWidth = ' ';
const tabWidthUnit = 2;
colors.purple = colors.magenta;

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

const O = ['+', '-', '*', '/', '%', '&&', '||'];

function $$getValueString(type) {
    let value = undefined;

    switch (type) {
        case 'string':
            value = "'" + colors.yellow(faker.lorem.word()) + "'";
            break;
        case 'number':
            value = colors.green(Math.round(Math.random() * 100000).toString());
            break;
        case 'null':
        case 'undefined':
            value = colors.blue(type);
            break;
        case 'object':
            value = colors.purple('{ ') + colors.blue(faker.lorem.word()) + ': ' + colors.yellow(`"${faker.lorem.paragraph()}"`) + colors.purple('}');
            break;
        case 'async':
        case 'function': {
            const objectName = colors.cyan(faker.lorem.word());
            const functionName = colors.yellow(faker.lorem.word());
            const argumentType = randomItem(T);
            const argument = $$getValueString(argumentType);
            value = objectName + '.' + functionName + colors.cyan('(') + argument + colors.cyan(')');
            if (type === 'async') {
                value = colors.purple('await') + ' ' + value;
            }
            break;
        }
        case 'instance': {
            const rawClassName = faker.lorem.word();
            const className = colors.green(rawClassName.charAt(0).toUpperCase() + rawClassName.substring(1));
            const argumentType = randomItem(T);
            const argument = $$getValueString(argumentType);
            value = colors.blue('new') + ' ' + colors.green(className) + colors.yellow('(') + argument + colors.yellow(')');
            break;
        };
    }

    return value;
}

function $variables(indent = 0, variableServesFor = 'function') {
    const linesNumber = randomNumber(3, 25);
    const lines = [];
    const tabSpace = tabWidth.repeat(indent);

    let promise;

    for (let i = 0; i < linesNumber; i++) {
        const key = colors.cyan(faker.lorem.word());
        const type = randomItem(T);
        const value = $$getValueString(type)

        if (variableServesFor === 'class') {
            lines.push(`${K.public} ${key}${colors.green(': ' + type)} = ${value}`);
        } else if (variableServesFor === 'object') {
            lines.push(`${key}${colors.green(': ' + type)}: ${value}`);
        } else {
            lines.push(`${K.const} ${key}${colors.green(': ' + type)} = ${value}`);
        }
    }

    return lines.map(line => (tabSpace + line + ';'));
}

function $equations(indent = 0) {
    let lines = new Array(randomNumber(5, 10)).fill(0);
    const tabSpace = tabWidth.repeat(indent);

    return lines.map((line) => {
        const key = colors.cyan(faker.lorem.word());
        const type = randomItem([...T, 'function', 'instance']);
        return tabSpace + key + ' = ' + $$getValueString(type) + ';';
    })
}

function $forloop(indent = 0) {
    let lines = [];

    const bundary = randomNumber(10, 20);
    const equations = $equations(indent + tabWidthUnit);
    const tabSpace = tabWidth.repeat(indent);

    lines = [
        colors.purple('for (') + colors.blue('let ') + colors.cyan('i') + ' = ' + colors.green(0) + '; ' + colors.cyan('i') + ' < ' + colors.green(bundary) + '; ' + colors.purple('i') + '++' + colors.purple(') {'),
        ...equations,
        colors.purple('}')
    ].map(line => (tabSpace + line));

    return lines;
}

function $switchCase(indent = 0) {

}

function $operations(indent = 0) {
    const values = new Array(randomNumber(2, 5)).fill(0).map(() => {
        const type = randomItem([...T, 'function']);
        return $$getValueString(type);
    });

    const key = colors.blue(faker.lorem.word());

    return key + ' = ' + values.join(' ' + randomItem(O) + ' ') + ';';
}

function $arrayAPIs(indent = 0) {
    let lines = [];

    const variable = colors.cyan(faker.lorem.word());
    const methods = ['reduce', 'forEach', 'filter', 'find', 'findIndex', 'map', 'filter', 'every'];
    const method = colors.yellow(randomItem(methods));
    const tabSpace = tabWidth.repeat(indent);

    lines.push(variable + '.' + method + colors.yellow('(') + '(' + faker.lorem.word() + ') => ' + colors.purple('{'));
    lines = lines.concat($variables(indent + tabWidthUnit));
    lines.push('\n');
    lines = lines.concat($equations(indent + tabWidthUnit));
    lines.push('\n');
    lines.push(tabWidth.repeat(indent + tabWidthUnit) + colors.purple('return') + ' ' + colors.cyan(faker.lorem.word()));

    lines.push(colors.purple('}') + colors.yellow(')') + ';');

    return lines.map((line) => (tabSpace + line));
}

function $function(indent = 0, isAsync = false, isClass = false) {
    let lines = [];
    let decleration = colors.blue(isAsync ? 'async function' : 'function');
    const functionName = faker.lorem.word();
    const tabSpace = tabWidth.repeat(indent);

    lines = lines.concat($variables(indent + tabWidthUnit));
    lines.push('\n');
    lines = lines.concat($equations(indent + tabWidthUnit));

    if (randomNumber(0, 9) < 6) {
        lines.push('\n');
        lines = lines.concat($forloop(indent + tabWidthUnit));
    }

    if (randomNumber(0, 9) < 6) {
        lines.push('\n');
        lines = lines.concat($arrayAPIs(indent + tabWidthUnit));
    }

    if (isClass) {
        decleration = colors.purple('public');
        if (isAsync) {
            decleration = colors.blue('async') + ' ' + decleration;
        }
    }

    lines = [
        decleration + ' ' + colors.yellow(functionName + '() {'),
        ...lines,
        '\n',
        tabSpace + colors.purple('return') + ' ' + $operations(indent + tabWidthUnit) + ';',
        colors.yellow('}')
    ].map(line => (tabSpace + line))

    return lines;
}

function $class(indent = 0) {
    let lines = [];
    let functionNumber = randomNumber(1, 8);
    let className = faker.lorem.word();
    const tabSpace = tabWidth.repeat(indent);

    className = className.charAt(0).toUpperCase() + className.substring(1);

    lines = lines.concat($variables(indent + tabWidthUnit, 'class'));
    lines.push('\n');

    for (let i = 0; i < functionNumber; i++) {
        const isAsync = Math.random() > 0.5;
        lines = lines.concat($function(indent + tabWidthUnit, isAsync, true));
        lines.push('\n');
    }

    lines = [
        colors.blue('class') + ' ' + colors.green(className) + ' ' + colors.yellow('{'),
        ...lines,
        colors.yellow('}')
    ].map(line => (tabSpace + line));

    return lines;
}

async function coding() {
    const content = $class(0);

    printWord = async (line) => {
        const words = line.split(' ');

        await words.reduce(async (previousPromise, word) => {
            const pausingTime = randomNumber(100, 225);
            await previousPromise;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    process.stdout.write(word);
                    process.stdout.write(' ');
                    resolve();
                }, pausingTime);
            });
        }, Promise.resolve());

        console.log();

        return true
    }

    let promise = content.reduce(async (previousPromise, line) => {
        const pausingTime = randomNumber(300, 500);
        await previousPromise;
        return printWord(line);
    }, Promise.resolve());

    promise.then(() => {
        setTimeout(() => {
            coding();
        }, 1500)
    })
}


module.exports = coding;