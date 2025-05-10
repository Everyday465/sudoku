// [ 0  1  2 | 3  4  5 | 6  7  8 ]
// [ 9 10 11 |12 13 14 |15 16 17 ]
// [18 19 20 |21 22 23 |24 25 26 ]
// -----------------------------
// [27 28 29 |30 31 32 |33 34 35 ]
// [36 37 38 |39 40 41 |42 43 44 ]
// [45 46 47 |48 49 50 |51 52 53 ]
// -----------------------------
// [54 55 56 |57 58 59 |60 61 62 ]
// [63 64 65 |66 67 68 |69 70 71 ]
// [72 73 74 |75 76 77 |78 79 80 ]

const validation = require('./isValid');

function fillSudoku(grid, index = 0) {
    if (index >= 81) return true; // Done!

    if (grid[index] !== 0) {
        return fillSudoku(grid, index + 1); // Skip filled cells
    }

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5); // Shuffle for randomness
    console.log("index: " + index + " numbers: " + numbers);

    for (let num of numbers) {
        //if not valid it will go next number
        if (validation.isValidMove(grid, index, num)) {
            console.log("num: " + num + "number: " + numbers);
            grid[index] = num; //update list
            if (fillSudoku(grid, index + 1)) return true; // go next index
            grid[index] = 0; // Backtrack
        }
    }
    return false; // No valid number found
}

function removeNumbers(sudoku, removeCount) {
    const indices = Array.from({ length: 81 }, (_, i) => i);

    console.log("indices"+indices);
    // Shuffle the indices
    indices.sort(() => Math.random() - 0.5);

    // Set the first `removeCount` indices to 0
    for (let i = 0; i < removeCount; i++) {
        sudoku[indices[i]] = 0;
    }

    return sudoku;
}

function createSudoku() {
    const emptySudoku = new Array(81).fill(0);
    fillSudoku(emptySudoku);
    removeNumbers(emptySudoku,25);
    return emptySudoku;
}

/* skips if cannot find solution
function createPuzzle() {
    let emptyPuzzle = [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    for (let row = 0; row < 9; row++) {
        for (let indexRow = 0; indexRow < 9; indexRow++) { 
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
            console.log("numbers"+numbers)
            for (const num of numbers) {
                console.log("num"+num);
                let temp = emptyPuzzle.slice();
                const index = indexRow + row * 9;
                console.log("index"+index);
                if (validation.isValidMove(temp, index, num) == true) {
                    console.log("added to list");
                    emptyPuzzle[index] = num;
                    break;
                };
            };
        };
    };
    console.log(emptyPuzzle);
    return emptyPuzzle;
};
*/

module.exports = {
    createSudoku
}