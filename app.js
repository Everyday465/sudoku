require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const validation = require('./functions/isValid');
const sudoku = require('./functions/getSudoku');

// let numbers = sudoku.createSudoku();

// let solved = false;

// const history = new Map(); 
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

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // You should set this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/public', express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log("1 Session contents:", JSON.stringify(req.session, null, 2));

    if (!req.session.numbers) {
        req.session.numbers = sudoku.createSudoku(); // Create a new Sudoku puzzle
        console.log(req.session.numbers);
        //req.session.history = new Map();//express-session serializes session data to JSON when storing it, and Map objects cannot be properly serialized to JSON.
        req.session.history = []; // Use an array instead of Map
        req.session.solved = true;
    }
    res.render('index', { data: { numbers: req.session.numbers, canUndo: req.session.history.length > 0, isSolved: req.session.solved } });
});

app.post('/', (req, res) => {
    console.log("2 Session contents:", JSON.stringify(req.session.numbers, null, 2));
    console.log("2 Session contents:", JSON.stringify(req.session.history, null, 2));
    console.log("2 Session contents:", JSON.stringify(req.session.solved, null, 2));

    console.log(req.body);
    const action = req.body.action;

    if (action === 'check') {
        Object.entries(req.body).forEach(([key, value]) => {
            const index = parseInt(key);     // Convert string key to number
            const input = parseInt(value);   // Convert value to number

            // Skip if not a number input or invalid index
            if (value === '' || isNaN(index) || isNaN(input)) {
                return;
            }

            if (value != '') {
                if (validation.isValidMove(req.session.numbers, index, input) == true) {

                    req.session.numbers[index] = input;
                    req.session.history.push({ index, value: input });
                }
            } else {
                return;
            };
        });
    };

    if (action === 'undo') {
        //for map object
        // const lastEntry = Array.from(req.session.history.entries()).pop(); // get last inserted [index, value]

        // if (lastEntry) {
        //     const [index, _] = lastEntry;
        //     req.session.numbers[index] = 0; // undo the move
        //     req.session.history.delete(index); // remove from history
        // };

        if (req.session.history.length > 0) {
            const lastMove = req.session.history.pop(); // Get last move
            req.session.numbers[lastMove.index] = 0; // Undo the move
        }
    };

    if (action === 'newGame') {
        req.session.solved = false;
        req.session.numbers = sudoku.createSudoku();
        req.session.history = [];
    };


    if (req.session.numbers.every(n => n !== 0)) {
        req.session.solved = true;
    };

    res.render('index', { data: { numbers: req.session.numbers, canUndo: req.session.history.length > 0, isSolved: req.session.solved } });
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
