const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

let grid = data
  .split('\n')
  .filter((line) => line.length > 0)
  .map((line) => line.split(''));

const height = grid.length;
const width = grid[0].length;

const firstVisibleSeat = (x, y, dx, dy) => {
  let seat;
  let i = x;
  let j = y;
  while (seat !== '#' && seat !== 'L') {
    i += dx;
    j += dy;
    if (i < 0 || j < 0 || i >= width || j >= height) {
      break;
    }
    seat = grid[j][i];
  }
  return seat;
};

const checkSeat = (x, y) => {
  const seat = grid[y][x];
  if (seat === '.') {
    return {
      newState: '.',
      changed: false,
    };
  }

  let occupiedNeighbours = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i !== 0 || j !== 0) {
        const visibleSeat = firstVisibleSeat(x, y, i, j);
        if (visibleSeat === '#') {
          occupiedNeighbours += 1;
        }
      }
    }
  }

  if (seat === 'L' && occupiedNeighbours === 0) {
    return {
      newState: '#',
      changed: true,
    };
  }

  if (seat === '#' && occupiedNeighbours >= 5) {
    return {
      newState: 'L',
      changed: true,
    };
  }

  return {
    newState: seat,
    changed: false,
  };
};

let hasChanges = false;
do {
  hasChanges = false;

  // Deep copy the nested array
  const newGrid = JSON.parse(JSON.stringify(grid));

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const { newState, changed } = checkSeat(x, y);
      hasChanges = hasChanges || changed;
      newGrid[y][x] = newState;
    }
  }

  grid = newGrid;
} while (hasChanges);

let occupiedSeats = 0;
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    if (grid[y][x] === '#') {
      occupiedSeats += 1;
    }
  }
}

console.log(`The stable state has ${occupiedSeats} occupied seats.`);
