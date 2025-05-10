const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const validation = require('./functions/isValid');
const sudoku = require('./functions/getSudoku');

let numbers = sudoku.createSudoku();

let solved = false;

const history = new Map();
// let numbers = [
//   5, 3, 0, 0, 7, 8, 9, 1, 2,
//   6, 7, 2, 1, 0, 5, 3, 0, 0,
//   1, 0, 8, 0, 4, 0, 5, 0, 7,
//   0, 5, 0, 7, 6, 1, 4, 2, 3,
//   4, 2, 0, 8, 0, 0, 7, 0, 1,
//   7, 0, 3, 9, 2, 4, 0, 5, 0,
//   9, 0, 1, 0, 3, 0, 2, 8, 0,
//   2, 8, 0, 4, 1, 9, 0, 3, 5,
//   0, 4, 5, 2, 8, 6, 1, 7, 0
// ];


app.use('/public', express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', { data: { numbers: numbers, canUndo: history.size > 0 } });
});

app.post('/', (req, res) => {
    console.log(req.body);
    const action = req.body.action;

    if (action === 'check') {
        Object.entries(req.body).forEach(([key, value]) => {
            const index = parseInt(key);     // Convert string key to number
            const input = parseInt(value);   // Convert value to number
            if (value != '') {
                if (validation.isValidMove(numbers, index, input) == true) {
                    
                    numbers[index] = input;
                    history.set(index, input);
                }
            } else {
                return;
            };
        });
    };

    if (action === 'undo') {
        const lastEntry = Array.from(history.entries()).pop(); // get last inserted [index, value]

        if (lastEntry) {
            const [index, _] = lastEntry;
            numbers[index] = 0; // undo the move
            history.delete(index); // remove from history
        };
    };

    if (action === 'newGame') {
        solved = false;
        numbers = sudoku.createSudoku();
    };


    if (numbers.every(n => n !== 0)) {
        solved = true;
    };

    res.render('index', { data: { numbers: numbers, canUndo: history.size > 0, isSolved: solved } });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
