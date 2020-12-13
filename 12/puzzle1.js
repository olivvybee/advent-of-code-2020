const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const instructions = data.split('\n').filter((line) => line.length > 0);

let x = 0;
let y = 0;
let heading = 90;

instructions.forEach((instruction) => {
  let direction = instruction.slice(0, 1);
  const distance = Number(instruction.slice(1));

  if (direction === 'F') {
    switch (heading) {
      case 0:
        direction = 'N';
        break;
      case 90:
        direction = 'E';
        break;
      case 180:
        direction = 'S';
        break;
      case 270:
        direction = 'W';
        break;
    }
  }

  if (direction === 'N') {
    y += distance;
  }
  if (direction === 'S') {
    y -= distance;
  }
  if (direction === 'E') {
    x += distance;
  }
  if (direction === 'W') {
    x -= distance;
  }

  if (direction === 'R') {
    heading = (distance + heading) % 360;
  }
  if (direction === 'L') {
    heading = heading - distance;
    if (heading < 0) {
      heading += 360;
    }
  }
});

console.log(
  `The ship's position is ${x}, ${y}. Manhattan distance = ${
    Math.abs(x) + Math.abs(y)
  }.`
);
