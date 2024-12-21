const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const ticTacToeRoute = require('./routes/tic-tac-toe');

// Middleware
app.use(express.json());

// Routes
app.use('/api/tic-tac-toe', ticTacToeRoute);

// Root endpoint
app.get('/', (req, res) => {
    res.send("Welcome to the Tic-Tac-Toe API! Use /api/tic-tac-toe to play.");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
