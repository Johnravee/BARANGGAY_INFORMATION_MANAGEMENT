const express = require('express');
const router = express.Router()


router.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.redirect("/login")
        }
    });
});

module.exports = router