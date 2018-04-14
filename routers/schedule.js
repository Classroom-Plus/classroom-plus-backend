const router = require('express').Router();

router
    .route('/:scheduleId')
    .get()
    .post()
    .put()
    .delete();

module.exports = router;