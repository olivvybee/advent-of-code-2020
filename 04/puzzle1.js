const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const entries = data.split('\n\n').filter((line) => line.length > 0);

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let valid = 0;
entries.forEach((entry) => {
  const invalid = requiredFields.some((field) => !entry.includes(`${field}:`));
  if (!invalid) {
    valid += 1;
  }
});

console.log(`${valid} passports are valid.`);
