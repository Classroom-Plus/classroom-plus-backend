const router = require('express').Router();
const auth = require('../controllers/auth');

router.get('/login', (req, res) => {

});

router.post('/login', auth.login);

router.get('/register', (req, res) => {

});

router.post('/register', auth.register);

module.exports = router;