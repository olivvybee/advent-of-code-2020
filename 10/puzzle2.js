const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const adapters = data
  .split('\n')
  .filter((line) => line.length > 0)
  .map((line) => Number(line));

adapters.sort((a, b) => a - b);

const finalRating = adapters[adapters.length - 1] + 3;

// Solution found from https://www.reddit.com/r/adventofcode/comments/ka8z8x/2020_day_10_solutions/gfcxuxf/

const paths = {
  0: 1,
};

[0, ...adapters, finalRating].forEach((adapter) => {
  [adapter + 1, adapter + 2, adapter + 3]
    .filter((nextAdapter) => [...adapters, finalRating].includes(nextAdapter))
    .forEach((nextAdapter) => {
      if (paths[nextAdapter]) {
        paths[nextAdapter] += paths[adapter];
      } else {
        paths[nextAdapter] = paths[adapter];
      }
    });
});

console.log(`There are ${paths[finalRating]} combinations.`);
