const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const accountController = require('../controllers/account');

router.post('/signIn', accountController.signIn);

router.post('/signUp', accountController.signUp);

router.post('/reset/password', authenticate.verifyToken, accountController.resetPassword);

router
    .route('/group/:groupId')
    .post()
    .put()
    .delete();

module.exports = router;
