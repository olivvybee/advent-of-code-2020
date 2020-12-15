const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const numbers = data
  .split(',')
  .filter((item) => item.length > 0)
  .map(Number);

const targetIndex = 30000000;

// Solution taken from
// https://gist.github.com/warriordog/8eb6e0eb19d191af162b915fc1c6ba52
//
// Knew what to do but couldn't implement it correctly

const memory = new Map();
numbers.forEach((n, i) => memory.set(n, i));

let lastNumber = numbers[numbers.length - 1];
let lastNumberIndex = numbers.length - 1;
let lastNumberLastIndex = undefined;

for (let i = numbers.length; i < targetIndex; i++) {
  let thisNumber;
  if (lastNumberLastIndex !== undefined) {
    // number has been seen before
    thisNumber = lastNumberIndex - lastNumberLastIndex;
  } else {
    // number has never been seen before
    thisNumber = 0;
  }

  lastNumber = thisNumber;
  lastNumberIndex = i;
  lastNumberLastIndex = memory.get(thisNumber);

  memory.set(thisNumber, i);

  if (i % 100 === 0) {
    console.log(i, '/', targetIndex);
  }
}

console.log(`The ${targetIndex}th number spoken is ${lastNumber}`);
