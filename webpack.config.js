const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    entry: './script.js', // Path to your original script.js
    output: {
        filename: 'script.js', // Output file
        path: path.resolve(__dirname), // Output to root directory
    },
    mode: 'production', // Minifies and optimizes the output
    plugins: [
        new Dotenv({
            path: './.env', // Path to .env file
            systemvars: true, // Load system environment variables if present
        }),
    ],
};