const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

// To get around the builtin % function returning incorrect
// values for negative x
const mod = (x, y) => ((x % y) + y) % y;

// Solution adapted from
// https://gist.github.com/hamidazimy/56a8495aea39f79d6de9f372c259f7fe

const buses = data
  .split('\n')[1]
  .split(',')
  .map((bus, index) => {
    if (bus === 'x') {
      return undefined;
    }

    const period = Number(bus);
    const offset = mod(period - index, period);

    return {
      period,
      offset,
    };
  })
  .filter((bus) => bus !== undefined);

let result = 0;
let increment = 1;

buses.forEach(({ period, offset }) => {
  while (result % period !== offset) {
    result += increment;
  }
  increment *= period;
});

console.log(`The first matching timestamp is ${result}`);
