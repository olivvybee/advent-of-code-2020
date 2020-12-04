const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const entries = data.split('\n\n').filter((line) => line.length > 0);

let valid = 0;

entries.forEach((entry) => {
  const record = entry
    .replace(/\n/g, ' ')
    .split(' ')
    .filter((field) => field.length > 0)
    .reduce((record, field) => {
      const [key, value] = field.split(':');
      return {
        ...record,
        [key]: value.trim(),
      };
    }, {});

  const birthYear = Number(record.byr);
  if (isNaN(birthYear) || birthYear < 1920 || birthYear > 2002) {
    return;
  }

  const issueYear = Number(record.iyr);
  if (isNaN(issueYear) || issueYear < 2010 || issueYear > 2020) {
    return;
  }

  const expirationYear = Number(record.eyr);
  if (isNaN(expirationYear) || expirationYear < 2020 || expirationYear > 2030) {
    return;
  }

  const height = record.hgt || '';
  if (height.endsWith('cm')) {
    const value = Number(height.slice(0, -2));
    if (isNaN(value) || value < 150 || value > 193) {
      return;
    }
  } else if (height.endsWith('in')) {
    const value = Number(height.slice(0, -2));
    if (isNaN(value) || value < 59 || value > 76) {
      return;
    }
  } else {
    return;
  }

  const hairColour = record.hcl || '';
  if (!hairColour.match(/^#[0-9a-f]{6}$/)) {
    return;
  }

  const eyeColour = record.ecl || '';
  const eyeColourValid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(
    (colour) => eyeColour === colour
  );
  if (!eyeColourValid) {
    return;
  }

  const passportId = record.pid || '';
  if (!passportId.match(/^[0-9]{9}$/)) {
    return;
  }

  valid += 1;
});

console.log(`${valid} passports are valid.`);
