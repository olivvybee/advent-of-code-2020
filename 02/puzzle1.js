const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');
const lines = data.split('\n');

let valid = 0;

lines
  .filter((line) => line.length > 0)
  .forEach((line) => {
    const [policy, password] = line.split(':');
    const [count, letter] = policy.split(' ');
    const [min, max] = count.split('-').map((value) => Number(value));

    const letterCount = password.split(letter).length - 1;
    if (letterCount >= min && letterCount <= max) {
      valid += 1;
    }
  });

console.log(`${valid} of the passwords are valid.`);
