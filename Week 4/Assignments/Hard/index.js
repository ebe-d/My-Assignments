// index.js
const express = require('express');
const dotenv = require('dotenv');
const todoRoutes = require('../Hard/routes/todo'); // Import your router

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Mount the router on the `/todos` path
app.use('/todos', todoRoutes);

const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
