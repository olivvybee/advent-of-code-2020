const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const lines = data.split('\n').filter((line) => line.length > 0);

const height = lines.length;
const width = lines[0].length;

const slopes = [
  { dx: 1, dy: 1 },
  { dx: 3, dy: 1 },
  { dx: 5, dy: 1 },
  { dx: 7, dy: 1 },
  { dx: 1, dy: 2 },
];

const trees = [];

slopes.forEach((slope) => {
  const { dx, dy } = slope;

  let x = 0;
  let y = 0;
  let slopeTrees = 0;

  do {
    const line = lines[y];
    const spot = line.charAt(x);

    if (spot === '#') {
      slopeTrees += 1;
    }

    x = (x + dx) % width;
    y += dy;
  } while (y < height);

  trees.push(slopeTrees);
});

const multiplied = trees.reduce((total, value) => total * value, 1);

console.log(`Encountered ${trees} trees.`);
console.log(`Multiplied together this gives ${multiplied}`);
