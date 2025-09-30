let numVar = 4;
let bigIntVar = 11111111111111111111111111111111n;
let stringVar = 'String';
let booleanVar = true;
let nullVar = null;
let undefinedVar;
let objectVar = {};
let symbolVar = Symbol('a');
let functionVar = function () {}

alert(`numVar is ${typeof(numVar)}\n` +
      `igIntVar is ${typeof(bigIntVar)}\n` +
      `stringVar is ${typeof(stringVar)}\n` +
      `booleanVar is ${typeof(booleanVar)}\n` +
      `nullVar is ${typeof(nullVar)}\n` +
      `undefinedVar is ${typeof(undefinedVar)}\n` +
      `objectVar is ${typeof(objectVar)}\n` +
      `symbolVar is ${typeof(symbolVar)}\n` +
      `functionVar is ${typeof(functionVar)}\n`);