const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const instructions = data.split('\n').filter((line) => line.length > 0);

const parseInstruction = (instruction) => {
  const [opcode, operandString] = instruction.split(' ');
  const operand = parseInt(operandString);

  return { opcode, operand };
};

const runProgram = () => {
  let programCounter = 0;
  let accumulator = 0;

  const visitedInstructions = [];

  while (true) {
    if (visitedInstructions.includes(programCounter)) {
      break;
    }

    const instruction = instructions[programCounter];
    visitedInstructions.push(programCounter);

    const { opcode, operand } = parseInstruction(instruction);

    if (opcode === 'jmp') {
      programCounter += operand;
      continue;
    }

    if (opcode === 'acc') {
      accumulator += operand;
    }

    programCounter += 1;
  }

  return {
    programCounter,
    accumulator,
  };
};

const { accumulator } = runProgram();
console.log(`The value in the accumulator is ${accumulator}.`);
