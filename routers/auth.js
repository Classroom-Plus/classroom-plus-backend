const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/reset_password');

router
    .route('/group/:groupId')
    .post()
    .put()
    .delete();

module.exports = router;
