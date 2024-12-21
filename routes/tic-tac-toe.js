const express = require('express');
const router = express.Router();

// Game state
let board = Array(9).fill(null); // 9 empty spots for Tic-Tac-Toe
let currentPlayer = 'X'; // X starts the game

// Check for a winner
const checkWinner = (board) => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // 'X' or 'O' winner
        }
    }
    return null; // No winner yet
};

// Check for a draw
const checkDraw = (board) => {
    return board.every(cell => cell !== null);
};

// Game logic
router.get('/', (req, res) => {
    const position = parseInt(req.query.position, 10) - 1; // Convert to 0-indexed
    if (isNaN(position) || position < 0 || position > 8 || board[position] !== null) {
        return res.json({ message: "Invalid move, try again." });
    }

    // Make the move
    board[position] = currentPlayer;

    // Check for winner or draw
    const winner = checkWinner(board);
    if (winner) {
        res.json({
            message: `Player ${winner} wins!`,
            board: formatBoard(board),
        });
        // Reset the game
        resetGame();
        return;
    }

    if (checkDraw(board)) {
        res.json({
            message: "It's a draw!",
            board: formatBoard(board),
        });
        // Reset the game
        resetGame();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    res.json({
        message: `Player ${currentPlayer}'s turn`,
        board: formatBoard(board),
    });
});

// Format board for response
const formatBoard = (board) => {
    return [
        board.slice(0, 3),
        board.slice(3, 6),
        board.slice(6, 9),
    ];
};

// Reset the game
const resetGame = () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
};

module.exports = router;
