const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const numbers = data
  .split(',')
  .filter((item) => item.length > 0)
  .map(Number);

const spokenNumbers = [...numbers];

for (let i = numbers.length; i < 2020; i++) {
  const lastNumber = spokenNumbers[spokenNumbers.length - 1];
  const previousIndex = spokenNumbers.lastIndexOf(
    lastNumber,
    spokenNumbers.length - 2
  );

  if (previousIndex === -1) {
    spokenNumbers.push(0);
  } else {
    spokenNumbers.push(spokenNumbers.length - 1 - previousIndex);
  }
}

console.log(`The 2020th number spoken is ${spokenNumbers[2020 - 1]}`);
