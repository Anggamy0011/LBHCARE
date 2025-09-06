const express = require('express');

const router = express.Router();

// Placeholder routes untuk articles
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Articles endpoint - Coming soon'
    });
});

module.exports = router;
