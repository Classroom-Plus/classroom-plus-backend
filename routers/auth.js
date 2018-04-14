const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const authController = require('../controllers/auth');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/reset-password', authenticate.verifyToken, authController.resetPassword);

router
    .route('/group/:groupId')
    .post()
    .put()
    .delete();

module.exports = router;
