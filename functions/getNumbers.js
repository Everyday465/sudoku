//eg index 20
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

function getRow(index){
    const rowStart = Math.floor((index) / 9)*9; //find which row
    return Array.from({length:9}, (_,i) => (rowStart)+i)
};

function getColumn(index){
    const columnStart = index % 9 
    return Array.from({length:9},(_,i)=>columnStart + i * 9)
}

function getBox(index) {
    const row = Math.floor(index / 9); //which row (2)
    const col = index % 9;  //which column (2)

    const boxRowStart = Math.floor(row / 3) * 3; // If you're in row 2 → Math.floor(2 / 3) = 0 → 0 * 3 = 0 → box starts at row 0
    const boxColStart = Math.floor(col / 3) * 3; // (0)

    const positions = [];
    for (let r = 0; r < 3; r++) {
        //r=0
        //r=2
        for (let c = 0; c < 3; c++) {
            //0+0 * 9  + 0 + 0 = 0
            // 0+0 * 9 + 0 + 1 = 1
            // 0+0 * 9 + 0 + 2 = 2

            //0+1 * 9 + 0 + 0 = 9
            //...
            positions.push((boxRowStart + r) * 9 + (boxColStart + c));
        }
    }
    return positions;
}

module.exports = {
    getRow,
    getColumn,
    getBox
};