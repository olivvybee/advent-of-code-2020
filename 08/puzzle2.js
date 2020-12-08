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

const runProgram = (jmpToIgnore) => {
  let programCounter = 0;
  let accumulator = 0;

  const visitedInstructions = [];

  while (true) {
    if (visitedInstructions.includes(programCounter)) {
      break;
    }

    if (programCounter >= instructions.length) {
      break;
    }

    const instruction = instructions[programCounter];
    visitedInstructions.push(programCounter);

    const { opcode, operand } = parseInstruction(instruction);

    if (opcode === 'jmp') {
      if (programCounter !== jmpToIgnore) {
        programCounter += operand;
        continue;
      }
    }

    if (opcode === 'acc') {
      accumulator += operand;
    }

    programCounter += 1;
  }

  return {
    programCounter,
    accumulator,
    terminatedSuccessfully: programCounter >= instructions.length,
  };
};

const jmpInstructions = instructions.reduce((list, instruction, index) => {
  if (instruction.startsWith('jmp')) {
    return [...list, index];
  }
  return list;
}, []);

const result = jmpInstructions.reduce((result, jmpInstruction) => {
  if (result) {
    return result;
  }

  const { accumulator, terminatedSuccessfully } = runProgram(jmpInstruction);
  return terminatedSuccessfully ? accumulator : undefined;
}, undefined);

console.log(`The value in the accumulator is ${result}.`);
