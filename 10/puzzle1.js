const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const adapters = data
  .split('\n')
  .filter((line) => line.length > 0)
  .map((line) => Number(line));

adapters.sort((a, b) => a - b);

let rating = 0;

// Include an extra difference of 3 to account for the final adapter
const differences = [undefined, 0, 0, 1];

adapters.forEach((adapter) => {
  const difference = adapter - rating;
  differences[difference] += 1;
  rating = adapter;
});

console.log(
  `Number of ones multiplied by number of threes is ${
    differences[1] * differences[3]
  }.`
);
