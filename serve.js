const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve index.html for all non-static routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 KeyLawCare.id running on http://localhost:${PORT}`);
});
