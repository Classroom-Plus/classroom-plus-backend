const router = require('express').Router();
const { verifyToken } = require('../middlewares/authenticate');

router
    .route('/:scheduleId')
    .get(verifyToken, )
    .post(verifyToken, )
    .put(verifyToken, )
    .delete(verifyToken, );

module.exports = router;