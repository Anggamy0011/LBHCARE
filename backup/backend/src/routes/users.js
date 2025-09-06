const express = require('express');

const router = express.Router();

// Placeholder routes untuk users
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Users endpoint - Coming soon'
    });
});

module.exports = router;
