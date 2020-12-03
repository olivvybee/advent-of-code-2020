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
    const [positions, letter] = policy.split(' ');
    const [first, second] = positions.split('-').map((value) => Number(value));

    const firstLetterMatches = password.trim().charAt(first - 1) === letter;
    const secondLetterMatches = password.trim().charAt(second - 1) === letter;

    if (
      (firstLetterMatches || secondLetterMatches) &&
      firstLetterMatches !== secondLetterMatches
    ) {
      valid += 1;
    }
  });

console.log(`${valid} of the passwords are valid.`);
