const faker = require('faker');
const colors = require('colors');

const randomNumber = require('./utils/random-number.js');

const warnings = {
    "@typescript-eslint/adjacent-overload-signatures": "Require that member overloads be consecutive",
    "@typescript-eslint/array-type": "Requires using either `T[]` or `Array<T>` for arrays",
    "@typescript-eslint/await-thenable": "Disallows awaiting a value that is not a Thenable",
    "@typescript-eslint/ban-ts-comment": "Bans `@ts-<directive>` comments from being used or requires descriptions after directive",
    "@typescript-eslint/ban-tslint-comment": "Bans `// tslint:<rule-flag>` comments from being used",
    "@typescript-eslint/ban-types": "Bans specific types from being used",
    "@typescript-eslint/class-literal-property-style": "Ensures that literals on classes are exposed in a consistent style",
    "@typescript-eslint/consistent-indexed-object-style": "Enforce or disallow the use of the record type",
    "@typescript-eslint/consistent-type-assertions": "Enforces consistent usage of type assertions",
    "@typescript-eslint/consistent-type-definitions": "Consistent with type definition either `interface` or `type`",
    "@typescript-eslint/consistent-type-imports": "Enforces consistent usage of type imports",
    "@typescript-eslint/explicit-function-return-type": "Require explicit return types on functions and class methods",
    "@typescript-eslint/explicit-member-accessibility": "Require explicit accessibility modifiers on class properties and methods",
    "@typescript-eslint/explicit-module-boundary-types": "Require explicit return and argument types on exported functions' and classes' public class methods",
    "@typescript-eslint/member-delimiter-style": "Require a specific member delimiter style for interfaces and type literals",
    "@typescript-eslint/member-ordering": "Require a consistent member declaration order",
    "@typescript-eslint/method-signature-style": "Enforces using a particular method signature syntax.",
    "@typescript-eslint/naming-convention": "Enforces naming conventions for everything across a codebase",
    "@typescript-eslint/no-base-to-string": "Requires that `.toString()` is only called on objects which provide useful information when stringified",
    "@typescript-eslint/no-confusing-non-null-assertion": "Disallow non-null assertion in locations that may be confusing",
    "@typescript-eslint/no-confusing-void-expression": "Requires expressions of type void to appear in statement position",
    "@typescript-eslint/no-dynamic-delete": "Disallow the delete operator with computed key expressions",
    "@typescript-eslint/no-empty-interface": "Disallow the declaration of empty interfaces",
    "@typescript-eslint/no-explicit-any": "Disallow usage of the `any` type",
    "@typescript-eslint/no-extra-non-null-assertion": "Disallow extra non-null assertion",
    "@typescript-eslint/no-extraneous-class": "Forbids the use of classes as namespaces",
    "@typescript-eslint/no-floating-promises": "Requires Promise-like values to be handled appropriately",
    "@typescript-eslint/no-for-in-array": "Disallow iterating over an array with a for-in loop",
    "@typescript-eslint/no-implicit-any-catch": "Disallow usage of the implicit `any` type in catch clauses",
    "@typescript-eslint/no-inferrable-types": "Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean",
    "@typescript-eslint/no-invalid-void-type": "Disallows usage of `void` type outside of generic or return types",
    "@typescript-eslint/no-misused-new": "Enforce valid definition of `new` and `constructor`",
    "@typescript-eslint/no-misused-promises": "Avoid using promises in places not designed to handle them",
    "@typescript-eslint/no-namespace": "Disallow the use of custom TypeScript modules and namespaces",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "Disallows using a non-null assertion after an optional chain expression",
    "@typescript-eslint/no-non-null-assertion": "Disallows non-null assertions using the `!` postfix operator",
    "@typescript-eslint/no-parameter-properties": "Disallow the use of parameter properties in class constructors",
    "@typescript-eslint/no-require-imports": "Disallows invocation of `require()`",
    "@typescript-eslint/no-this-alias": "Disallow aliasing `this`",
    "@typescript-eslint/no-type-alias": "Disallow the use of type aliases",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "Flags unnecessary equality comparisons against boolean literals",
    "@typescript-eslint/no-unnecessary-condition": "Prevents conditionals where the type is always truthy or always falsy",
    "@typescript-eslint/no-unnecessary-qualifier": "Warns when a namespace qualifier is unnecessary",
    "@typescript-eslint/no-unnecessary-type-arguments": "Enforces that type arguments will not be used if not required",
    "@typescript-eslint/no-unnecessary-type-assertion": "Warns if a type assertion does not change the type of an expression",
    "@typescript-eslint/no-unnecessary-type-constraint": "Disallows unnecessary constraints on generic types",
    "@typescript-eslint/no-unsafe-assignment": "Disallows assigning any to variables and properties",
    "@typescript-eslint/no-unsafe-call": "Disallows calling an any type value",
    "@typescript-eslint/no-unsafe-member-access": "Disallows member access on any typed variables",
    "@typescript-eslint/no-unsafe-return": "Disallows returning any from a function",
    "@typescript-eslint/no-var-requires": "Disallows the use of require statements except in import statements",
    "@typescript-eslint/prefer-as-const": "Prefer usage of `as const` over literal type",
    "@typescript-eslint/prefer-enum-initializers": "Prefer initializing each enums member value",
    "@typescript-eslint/prefer-for-of": "Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated",
    "@typescript-eslint/prefer-function-type": "Use function types instead of interfaces with call signatures",
    "@typescript-eslint/prefer-includes": "Enforce `includes` method over `indexOf` method",
    "@typescript-eslint/prefer-literal-enum-member": "Require that all enum members be literal values to prevent unintended enum member name shadow issues",
    "@typescript-eslint/prefer-namespace-keyword": "Require the use of the `namespace` keyword instead of the `module` keyword to declare custom TypeScript modules",
    "@typescript-eslint/prefer-nullish-coalescing": "Enforce the usage of the nullish coalescing operator instead of logical chaining",
    "@typescript-eslint/prefer-optional-chain": "Prefer using concise optional chain expressions instead of chained logical ands",
    "@typescript-eslint/prefer-readonly": "Requires that private members are marked as `readonly` if they're never modified outside of the constructor",
    "@typescript-eslint/prefer-readonly-parameter-types": "Requires that function parameters are typed as readonly to prevent accidental mutation of inputs",
    "@typescript-eslint/prefer-reduce-type-parameter": "Prefer using type parameter when calling `Array#reduce` instead of casting",
    "@typescript-eslint/prefer-regexp-exec": "Enforce that `RegExp#exec` is used instead of `String#match` if no global flag is provided",
    "@typescript-eslint/prefer-string-starts-ends-with": "Enforce the use of `String#startsWith` and `String#endsWith` instead of other equivalent methods of checking substrings ",
    "@typescript-eslint/prefer-ts-expect-error": "Recommends using `@ts-expect-error` over `@ts-ignore`",
    "@typescript-eslint/promise-function-async": "Requires any function or method that returns a Promise to be marked async",
    "@typescript-eslint/require-array-sort-compare": "Requires `Array#sort` calls to always provide a `compareFunction`",
    "@typescript-eslint/restrict-plus-operands": "When adding two variables, operands must both be of type number or of type string",
    "@typescript-eslint/restrict-template-expressions": "Enforce template literal expressions to be of string type",
    "@typescript-eslint/strict-boolean-expressions": "Restricts the types allowed in boolean expressions",
    "@typescript-eslint/switch-exhaustiveness-check": "Exhaustiveness checking in switch with union type",
    "@typescript-eslint/triple-slash-reference": "Sets preference level for triple slash directives versus ES6-style import declarations",
    "@typescript-eslint/type-annotation-spacing": "Require consistent spacing around type annotations",
    "@typescript-eslint/typedef": "Requires type annotations to exist",
    "@typescript-eslint/unbound-method": "Enforces unbound methods are called with their expected scope",
    "@typescript-eslint/unified-signatures": "Warns for any two overloads that could be unified into one by using a union or an optional/rest parameter",
    "@typescript-eslint/brace-style": "Enforce consistent brace style for blocks",
    "@typescript-eslint/comma-dangle": "Require or disallow trailing comma",
    "@typescript-eslint/comma-spacing": "Enforces consistent spacing before and after commas",
    "@typescript-eslint/default-param-last": "Enforce default parameters to be last",
    "@typescript-eslint/dot-notation": "enforce dot notation whenever possible",
    "@typescript-eslint/func-call-spacing": "Require or disallow spacing between function identifiers and their invocations",
    "@typescript-eslint/indent": "Enforce consistent indentation",
    "@typescript-eslint/init-declarations": "require or disallow initialization in variable declarations",
    "@typescript-eslint/keyword-spacing": "Enforce consistent spacing before and after keywords",
    "@typescript-eslint/lines-between-class-members": "Require or disallow an empty line between class members",
    "@typescript-eslint/no-array-constructor": "Disallow generic `Array` constructors",
    "@typescript-eslint/no-dupe-class-members": "Disallow duplicate class members",
    "@typescript-eslint/no-duplicate-imports": "Disallow duplicate imports",
    "@typescript-eslint/no-empty-function": "Disallow empty functions",
    "@typescript-eslint/no-extra-parens": "Disallow unnecessary parentheses",
    "@typescript-eslint/no-extra-semi": "Disallow unnecessary semicolons",
    "@typescript-eslint/no-implied-eval": "Disallow the use of `eval()`-like methods",
    "@typescript-eslint/no-invalid-this": "Disallow `this` keywords outside of classes or class-like objects",
    "@typescript-eslint/no-loop-func": "Disallow function declarations that contain unsafe references inside loop statements ",
    "@typescript-eslint/no-loss-of-precision": "Disallow literal numbers that lose precision",
    "@typescript-eslint/no-magic-numbers": "Disallow magic numbers",
    "@typescript-eslint/no-redeclare": "Disallow variable redeclaration",
    "@typescript-eslint/no-shadow": "Disallow variable declarations from shadowing variables declared in the outer scope",
    "@typescript-eslint/no-throw-literal": "Disallow throwing literals as exceptions",
    "@typescript-eslint/no-unused-expressions": "Disallow unused expressions",
    "@typescript-eslint/no-unused-vars": "Disallow unused variables",
    "@typescript-eslint/no-use-before-define": "Disallow the use of variables before they are defined",
    "@typescript-eslint/no-useless-constructor": "Disallow unnecessary constructors",
    "@typescript-eslint/quotes": "Enforce the consistent use of either backticks, double, or single quotes",
    "@typescript-eslint/require-await": "Disallow async functions which have no `await` expression",
    "@typescript-eslint/return-await": "Enforces consistent returning of awaited values",
    "@typescript-eslint/semi": "Require or disallow semicolons instead of ASI",
    "@typescript-eslint/space-before-function-paren": "Enforces consistent spacing before function parenthesis",
    "@typescript-eslint/space-infix-ops": "This rule is aimed at ensuring there are spaces around infix operators.",
}

function tslint() {
    // Step One
    // output "src/somepath/somefile.js"
    const paths = [
        faker.system.directoryPath(),
        'src',
        faker.lorem.word(),
        faker.system.commonFileName().split('.')[0] + '.js'
    ]
    console.log(paths.join('/'));

    // Step Two
    // output "Line 9:23:  <warning message>  <lint-plugin-name>"
    const repeats = Math.random() > 0.7 ? randomNumber(5, 12) : randomNumber(0, 3);
    const warningKeys = Object.keys(warnings);
    const warningIndex = randomNumber(0, warningKeys.length - 1);
    const warningKey = warningKeys[warningIndex];
    const warningMessage = warnings[warningKey];
    for (let i = 0; i <= repeats; i++) {
        const line = '  Line ' + i + ':' + randomNumber(i * 2, i * 4);
        console.log(
            line.padEnd(15) +
            warningMessage.padEnd(warningMessage.length + 3) +
            colors.yellow(warningKey)
        )
    }

    // Step Three
    // new line
    console.log('');
    const cooldownMilliSecond = Math.random() > 0.8 ? randomNumber(1000, 3000) : randomNumber(100, 500);
    setTimeout(tslint, cooldownMilliSecond);
}

module.exports = tslint;