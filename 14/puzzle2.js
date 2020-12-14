const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const instructions = data.split('\n').filter((line) => line.length > 0);

let mask = undefined;
const memory = {};

const applyFloatingIndex = (addresses, index) => {
  const newAddresses = [];
  while (addresses.length) {
    const address = addresses.pop();
    const with0 = address.substr(0, index) + '0' + address.substr(index + 1);
    const with1 = address.substr(0, index) + '1' + address.substr(index + 1);
    newAddresses.push(with0, with1);
  }
  return newAddresses;
};

const applyMask = (mask, value) => {
  const binary = value.toString(2).split('');

  while (binary.length < mask.length) {
    binary.unshift('0');
  }

  let floatingIndexes = [];
  mask.split('').forEach((bit, index) => {
    if (bit === 'X') {
      binary[index] = 'X';
      floatingIndexes.push(index);
    }
    if (bit === '1') {
      binary[index] = '1';
    }
  });

  const maskedAddress = binary.join('');
  let addresses = [maskedAddress];

  floatingIndexes.forEach((index) => {
    addresses = applyFloatingIndex(addresses, index);
  });

  return addresses.map((address) => parseInt(address, 2));
};

instructions.forEach((instruction, index) => {
  if (instruction.startsWith('mask')) {
    mask = instruction.split('=')[1].trim();
  }

  if (instruction.startsWith('mem')) {
    const addressStart = instruction.indexOf('[') + 1;
    const addressEnd = instruction.indexOf(']');
    const address = Number(instruction.slice(addressStart, addressEnd));

    const value = Number(instruction.split('=')[1].trim());

    const addressesToStore = applyMask(mask, address);
    addressesToStore.forEach((addressToStore) => {
      memory[addressToStore] = value;
    });
  }
});

const sum = Object.values(memory).reduce((acc, val) => acc + val, 0);

console.log(`The sum of values in memory is ${sum}`);
