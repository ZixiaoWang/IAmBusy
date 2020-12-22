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
        const key = colors.blue(faker.lorem.word());
        const type = randomItem([...T, 'function', 'instance']);
        return tabSpace + colors.blue(key) + ' = ' + $$getValueString(type) + ';';
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

function $operations(indent = 0) {
    const values = new Array(randomNumber(2, 5)).fill(0).map(() => {
        const type = randomItem([...T, 'function']);
        return $$getValueString(type);
    });

    const key = colors.blue(faker.lorem.word());

    // TODO
    return key + ' = ' + values.join(' ' + randomItem(O) + ' ') + ';';
}

function $arrayFunctions(indent = 0) {

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

    if (isClass) {
        decleration = colors.purple('public');
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

function $class() {
    const left = [];
    const right = [];

    left.push()
}

function coding() {
    const content = [
        ...$variables(2), '\n',
        ...$equations(2), '\n',
        ...$forloop(2), '\n',
        ...$function(4)
    ].join('\n');

    console.log(content);
}


module.exports = coding;