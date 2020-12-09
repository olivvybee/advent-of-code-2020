const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const numbers = data
  .split('\n')
  .filter((line) => line.length > 0)
  .map((line) => Number(line));

let index = 25;

while (index < numbers.length) {
  const valueToCheck = numbers[index];

  const previous25 = numbers.slice(index - 25, index);

  const valid = previous25.some((first) =>
    previous25.some((second) => first + second === valueToCheck)
  );

  if (!valid) {
    console.log(`The first invalid number is ${valueToCheck}.`);
    break;
  }

  index += 1;
}
