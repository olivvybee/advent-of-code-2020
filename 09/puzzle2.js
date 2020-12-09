const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const numbers = data
  .split('\n')
  .filter((line) => line.length > 0)
  .map((line) => Number(line));

let index = 25;
let target;

while (index < numbers.length) {
  const valueToCheck = numbers[index];

  const previous25 = [];
  for (let i = 1; i <= 25; i++) {
    previous25.push(numbers[index - i]);
  }

  const valid = previous25.some((first) =>
    previous25.some((second) => first + second === valueToCheck)
  );

  if (!valid) {
    target = valueToCheck;
    break;
  }

  index += 1;
}

let startIndex = 0;
let endIndex = 1;
let found = false;

while (!found) {
  let total = numbers[startIndex];

  while (total < target) {
    total += numbers[endIndex];
    if (total !== target) {
      endIndex += 1;
    }
  }

  if (total === target) {
    found = true;
    break;
  }

  startIndex += 1;
  endIndex = startIndex + 1;
}

const sumParts = [];
for (let i = startIndex; i <= endIndex; i++) {
  sumParts.push(numbers[i]);
}

sumParts.sort();

const smallest = sumParts[0];
const largest = sumParts[sumParts.length - 1];

console.log(
  `The sum of the smallest and largest values is ${smallest + largest}.`
);
