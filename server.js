const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors({
    origin: ['https://www.squareyards.com', 'https://stage-www.squareyards.com', 'https://redesign-v2.squareyards.com'],
    methods: ['GET'],
}));

// Enable compression for faster responses
app.use(compression());

// Serve static files from 'public' with no-cache headers
app.use(express.static(path.join(__dirname, 'public'), {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


// const express = require('express');
// const path = require('path');
// const app = express();

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Define the port (use Render's PORT environment variable or default to 3000)
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });