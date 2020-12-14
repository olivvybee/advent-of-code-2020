const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const instructions = data.split('\n').filter((line) => line.length > 0);

let mask = undefined;
const memory = {};

const applyMask = (mask, value) => {
  const binary = value.toString(2).split('');

  while (binary.length < mask.length) {
    binary.unshift('0');
  }

  mask.split('').forEach((bit, index) => {
    if (bit === '0') {
      binary[index] = 0;
    }
    if (bit === '1') {
      binary[index] = 1;
    }
  });

  return parseInt(binary.join(''), 2);
};

instructions.forEach((instruction) => {
  if (instruction.startsWith('mask')) {
    mask = instruction.split('=')[1].trim();
  }

  if (instruction.startsWith('mem')) {
    const addressStart = instruction.indexOf('[') + 1;
    const addressEnd = instruction.indexOf(']');
    const address = Number(instruction.slice(addressStart, addressEnd));

    const value = Number(instruction.split('=')[1].trim());

    const valueToStore = applyMask(mask, value);
    memory[address] = valueToStore;
  }
});

const sum = Object.values(memory).reduce((acc, value) => acc + value, 0);

console.log(`The sum of values in memory is ${sum}`);
