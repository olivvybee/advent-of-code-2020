const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const dataSets = data.split('\n\n');
const rules = dataSets[0].split('\n');
const tickets = dataSets[2]
  .split('\n')
  .slice(1)
  .filter((line) => line.length > 0);

const validRanges = rules.map((rule) =>
  rule
    .split(':')[1]
    .trim()
    .split(' or ')
    .map((range) => range.split('-').map(Number))
);

const invalidValues = [];

tickets.forEach((ticket) => {
  const values = ticket.split(',').map(Number);

  values.forEach((value) => {
    const valid = validRanges.some((pair) =>
      pair.some((range) => value >= range[0] && value <= range[1])
    );
    if (!valid) {
      invalidValues.push(value);
    }
  });
});

const sum = invalidValues.reduce((acc, val) => acc + val, 0);

console.log(`The sum of invalid values is ${sum}`);
