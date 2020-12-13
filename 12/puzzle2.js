const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const instructions = data.split('\n').filter((line) => line.length > 0);

let shipX = 0;
let shipY = 0;
let waypointX = 10;
let waypointY = 1;

instructions.forEach((instruction) => {
  const direction = instruction.slice(0, 1);
  const distance = Number(instruction.slice(1));

  if (direction === 'N') {
    waypointY += distance;
  }
  if (direction === 'S') {
    waypointY -= distance;
  }
  if (direction === 'E') {
    waypointX += distance;
  }
  if (direction === 'W') {
    waypointX -= distance;
  }

  if (direction === 'F') {
    shipX += distance * waypointX;
    shipY += distance * waypointY;
  }

  if (direction === 'R') {
    switch (distance) {
      case 90:
        // 5, 10 => 10, -5
        const x = waypointX;
        waypointX = waypointY;
        waypointY = -x;
        break;

      case 180:
        waypointX = -waypointX;
        waypointY = -waypointY;
        break;

      case 270:
        const y = waypointY;
        waypointY = waypointX;
        waypointX = -y;
        break;
    }
  }
  if (direction === 'L') {
    switch (distance) {
      case 90:
        const y = waypointY;
        waypointY = waypointX;
        waypointX = -y;
        break;

      case 180:
        waypointX = -waypointX;
        waypointY = -waypointY;
        break;

      case 270:
        const x = waypointX;
        waypointX = waypointY;
        waypointY = -x;

        break;
    }
  }

  console.log(instruction, shipX, shipY, waypointX, waypointY);
});

console.log(
  `The ship's position is ${shipX}, ${shipY}. Manhattan distance = ${
    Math.abs(shipX) + Math.abs(shipY)
  }.`
);
