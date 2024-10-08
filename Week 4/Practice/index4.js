const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware for JSON
app.use(express.urlencoded({ extended: true })); // Middleware for URL-encoded data

// Route to handle POST requests
app.post('/todo/add', function (req, res) {
    console.log(req.body); // Log the received body
    const todo = req.body.todo; // Extract the todo from the body

    if (todo) {
        res.send(`Todo received: ${todo}`); // Send a response back
    } else {
        res.status(400).send('Todo is required'); // Handle missing todo
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
