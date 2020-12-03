const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const lines = data.split('\n').filter((line) => line.length > 0);

const height = lines.length;
const width = lines[0].length;

let x = 0;
let y = 0;
let trees = 0;

do {
  const line = lines[y];
  const spot = line.charAt(x);

  if (spot === '#') {
    trees += 1;
  }

  x = (x + 3) % width;
  y += 1;
} while (y < height);

console.log(`Encountered ${trees} trees.`);
