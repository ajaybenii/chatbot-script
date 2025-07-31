require('dotenv').config(); // Load .env file
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'], // Allow POST for potential future use
}));

// Enable compression for faster responses
app.use(compression());

// Serve static files from the root directory with no-cache headers
app.use(express.static(path.join(__dirname), {
    maxAge: 0, // Disable caching to ensure immediate updates
    setHeaders: (res, path) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    },
}));

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// // Config endpoint to serve API keys
// app.get('/config', (req, res) => {
//     res.json({
//         CITY_API_KEY: process.env.CITY_API_KEY || 'default_city_key', // Fallback for safety
//         SUBMIT_API_KEY: process.env.SUBMIT_API_KEY || 'default_submit_key' // Fallback for safety
//     });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});