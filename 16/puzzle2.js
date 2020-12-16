const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputFile, 'utf-8');

const dataSets = data.split('\n\n');
const fieldData = dataSets[0].split('\n');
const yourTicket = dataSets[1].split('\n')[1];
const tickets = dataSets[2]
  .split('\n')
  .slice(1)
  .filter((line) => line.length > 0);

const fields = fieldData.map((field) => ({
  field: field.split(':')[0].trim(),
  ranges: field
    .split(':')[1]
    .trim()
    .split(' or ')
    .map((range) => range.split('-').map(Number)),
}));

const validTickets = tickets.filter((ticket) => {
  const values = ticket.split(',').map(Number);
  let valid = true;

  values.forEach((value) => {
    const valueIsValid = fields.some((field) =>
      field.ranges.some((range) => value >= range[0] && value <= range[1])
    );
    if (!valueIsValid) {
      valid = false;
    }
  });

  return valid;
});

validTickets.push(yourTicket);

const possibleFields = [];
fields.forEach(() => {
  const fieldList = [];
  fields.forEach((fieldToAdd) => fieldList.push(fieldToAdd));
  possibleFields.push(fields);
});

validTickets.forEach((ticket) => {
  const values = ticket.split(',').map(Number);
  values.forEach((value, index) => {
    const possibleFieldsForIndex = possibleFields[index];
    const stillPossibleFields = possibleFieldsForIndex.filter(
      (possibleField) => {
        const isPossible = possibleField.ranges.some(
          (range) => value >= range[0] && value <= range[1]
        );
        return isPossible;
      }
    );
    possibleFields[index] = stillPossibleFields;
  });
});

let madeChanges;

do {
  madeChanges = false;

  fields.forEach((field) => {
    const onlyPossibleIndex = possibleFields.findIndex(
      (list) => list.length === 1 && list[0] === field
    );
    if (onlyPossibleIndex > -1) {
      possibleFields.forEach((list, index) => {
        if (index === onlyPossibleIndex) {
          return;
        } else {
          const newPossibleFields = list.filter((item) => item !== field);
          const prevCount = possibleFields[index].length;
          const newCount = newPossibleFields.length;
          possibleFields[index] = newPossibleFields;
          if (prevCount !== newCount) {
            madeChanges = true;
          }
        }
      });
    }
  });
} while (madeChanges);

const departureIndexes = [];
possibleFields.forEach((list, index) => {
  if (list[0].field.includes('departure')) {
    departureIndexes.push(index);
  }
});

const yourTicketValues = yourTicket.split(',').map(Number);
const product = departureIndexes.reduce(
  (acc, index) => acc * yourTicketValues[index],
  1
);

console.log(`The prodcut of departure related values is ${product}`);
