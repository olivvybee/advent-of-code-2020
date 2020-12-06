const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const groups = data.split('\n\n');

let total = 0;
groups.forEach((group) => {
  const people = group.split('\n').filter((line) => line.length > 0);

  people.sort((a, b) => b.length - a.length);
  const biggestSet = people[0];

  const validAnswers = biggestSet
    .split('')
    .filter((answer) => !people.some((person) => !person.includes(answer)));

  total += validAnswers.length;
});

console.log(`${total} questions were answered by everyone in their group.`);
