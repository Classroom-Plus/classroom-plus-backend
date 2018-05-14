const router = require('express').Router();
const schedule = require('../controllers/schedule');
const { verifyToken } = require('../middlewares/authenticate');

router
    .route('/')
    .get(verifyToken, schedule.getSchedule)
    .post(verifyToken, schedule.createSchedule)
    .put(verifyToken, schedule.updateSchedule)
    .delete(verifyToken, schedule.deleteSchedule);

module.exports = router;