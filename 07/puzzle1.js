const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const rules = data.split('\n').filter((line) => line.length > 0);

const canHoldShinyGold = [];

let prevLength = -1;

do {
  prevLength = canHoldShinyGold.length;

  rules.forEach((rule) => {
    const container = rule.slice(0, rule.indexOf('bag')).trim();
    const canContain = rule
      .split('contain')[1]
      .split(',')
      .map((item) => item.trim().split(' ').slice(1, 3).join(' '));

    ['shiny gold', ...canHoldShinyGold].forEach((bag) => {
      if (canContain.includes(bag) && !canHoldShinyGold.includes(container)) {
        canHoldShinyGold.push(container);
      }
    });
  });
} while (canHoldShinyGold.length !== prevLength);

console.log(`${canHoldShinyGold.length} bags can hold a shiny gold bag.`);
