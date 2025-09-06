const express = require('express');

const router = express.Router();

// Placeholder routes untuk consultations
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Consultations endpoint - Coming soon'
    });
});

module.exports = router;
