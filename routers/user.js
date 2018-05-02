const router = require('express').Router();
const { verifyToken } = require('../middlewares/authenticate');
const user = require('../controllers/user');

router
    .route('/')
    .get(verifyToken, user.getUserInfo)
    .put(verifyToken, user.updateUserInfo);

module.exports = router;
