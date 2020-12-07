const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const rules = data.split('\n').filter((line) => line.length > 0);

const toCheck = [{ count: 1, bag: 'shiny gold' }];
let total = 0;

do {
  const { count, bag } = toCheck.pop();

  const rule = rules.find((rule) => rule.startsWith(bag));
  const contains = rule
    .split('contain')[1]
    .split(',')
    .map((item) => item.trim().split(' ').slice(0, 3).join(' '))
    .map((item) => ({
      count: Number(item.split(' ', 1)[0]),
      bag: item.slice(item.indexOf(' ')).trim(),
    }));

  contains.forEach((innerBag) => {
    if (!isNaN(innerBag.count)) {
      innerBag.count *= count;
      total += innerBag.count;
      toCheck.push(innerBag);
    }
  });
} while (toCheck.length > 0);

console.log(`A shiny gold bag holds ${total} other bags.`);
