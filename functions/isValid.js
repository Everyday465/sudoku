const positions = require('./getNumbers')


function isValidMove(numbers, index, value) {
    const num = parseInt(value);

    const rowIndexes = positions.getRow(index);
    const colIndexes = positions.getColumn(index);
    const boxIndexes = positions.getBox(index);

    const rowVals = rowIndexes.map(i => numbers[i]);
    const colVals = colIndexes.map(i => numbers[i]);
    const boxVals = boxIndexes.map(i => numbers[i]);

    return !rowVals.includes(num) && !colVals.includes(num) && !boxVals.includes(num);
}

module.exports = {
    isValidMove
}