const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const lines = data.split('\n').filter((line) => line.length > 0);

const seatIds = [];

lines.forEach((line) => {
  const rowSteps = line.split('').slice(0, 7);
  const columnSteps = line.split('').slice(7);

  let possibleRows = [];
  for (let i = 0; i < 128; i++) {
    possibleRows.push(i);
  }

  rowSteps.forEach((step) => {
    const newLength = possibleRows.length / 2;
    if (step === 'F') {
      possibleRows = possibleRows.slice(0, newLength);
    }
    if (step === 'B') {
      possibleRows = possibleRows.slice(newLength);
    }
  });

  let possibleColumns = [];
  for (let i = 0; i < 8; i++) {
    possibleColumns.push(i);
  }

  columnSteps.forEach((step) => {
    const newLength = possibleColumns.length / 2;
    if (step === 'L') {
      possibleColumns = possibleColumns.slice(0, newLength);
    }
    if (step === 'R') {
      possibleColumns = possibleColumns.slice(newLength);
    }
  });

  const id = possibleRows[0] * 8 + possibleColumns[0];
  seatIds.push(id);
});

seatIds.sort();
for (let i = 1; i < seatIds.length; i++) {
  const left = seatIds[i - 1];
  const right = seatIds[i];

  if (left === right - 2) {
    console.log(`The seat ID is ${right - 1}`);
  }
}
