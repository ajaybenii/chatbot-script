// require('dotenv').config(); // Load .env file
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
    maxAge: 0,
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

app.use((req, res, next) => {
    if (req.url.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
    } else if (req.url.endsWith('.mp3')) {
        res.setHeader('Content-Type', 'audio/mpeg');
    }
    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});