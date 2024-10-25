const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = 5000;
const path = require('path');
// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON data from requests
app.use(express.json());
// Endpoint to run the Python script
app.post('/run-script', (req, res) => {
    // Run the Python script using exec
    exec('python python/test.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: error.message });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).json({ error: stderr });
      }
      console.log(`Output: ${stdout}`);
      res.json({ output: stdout });
    });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});