const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Only declare this once
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

// Load environment variables
require('dotenv').config();
require('./Models/db');

// Set the port to use either the environment variable or 8080
const PORT = process.env.PORT || 8080;

// API Routes
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Simple ping route to test server
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Serve static files from the React app (production build)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    // The catch-all handler for React routing (works with React Router)
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
