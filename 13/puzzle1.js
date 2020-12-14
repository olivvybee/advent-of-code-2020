const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const timestamp = Number(data.split('\n')[0]);
const buses = data
  .split('\n')[1]
  .split(',')
  .filter((bus) => bus !== 'x')
  .map(Number);

const closestDepartures = buses.map((bus) => {
  let time = 0;
  while (time < timestamp) {
    time += bus;
  }
  return { bus, time };
});

closestDepartures.sort((a, b) => a.time - b.time);

const chosenBus = closestDepartures[0];
const timeToWait = chosenBus.time - timestamp;

console.log(
  `Bus ID multiplied by time to wait is ${chosenBus.bus * timeToWait}`
);
