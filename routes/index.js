const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Welcome page...
router.get('/', (req, res) => res.render('first'));

router.get('/dashboard', (req, res) => {
    User.find((err, docs) => {
        if (err) {
            console.log('Errror in get data ');
        }
        else {
            // console.log(' here    ',docs)
            res.render('dashboard', { users: docs });
        }
    });
});

module.exports = router;
