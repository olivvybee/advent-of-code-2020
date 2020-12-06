const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const groups = data.split('\n\n').filter((line) => line.length > 0);

let total = 0;

groups.forEach((group) => {
  const answers = group.replace(/\s/g, '');

  const uniqueAnswers = answers.split('').reduce((uniques, answer) => {
    if (uniques.includes(answer)) {
      return uniques;
    } else {
      return [...uniques, answer];
    }
  }, []);

  total += uniqueAnswers.length;
});

console.log(`${total} unique questions were answered in total.`);
