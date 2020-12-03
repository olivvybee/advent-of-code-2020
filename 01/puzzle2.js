const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const numbers = data.split('\n').map((line) => Number(line));

let found = false;
let index1 = 0;
let index2 = 1;
let index3 = 2;

while (!found) {
  if (numbers[index1] + numbers[index2] + numbers[index3] === 2020) {
    found = true;
  } else {
    index3 += 1;

    if (index3 >= numbers.length) {
      index2 += 1;
      index3 = 0;
    }

    if (index2 >= numbers.length) {
      index1 += 1;
      index2 = 0;
    }
  }
}

const num1 = numbers[index1];
const num2 = numbers[index2];
const num3 = numbers[index3];

console.log(`The numbers that sum to 2020 are ${num1}, ${num2}, and ${num3}.`);
console.log(`Multiplying them together gives ${num1 * num2 * num3}`);
