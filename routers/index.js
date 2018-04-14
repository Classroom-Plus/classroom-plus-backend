const router = require('express').Router();
const webhooks = require('./webhooks');
const auth = require('./auth');
const user = require('./user');
const course = require('./course');
const schedule = require('./schedule');

/* ----------  Route for fb-messenger  ---------- */
router.use('/webhook', webhooks);

/* ----------  Route for api  ---------- */
router.use('/api', auth);
router.use('/api/user', user);
router.use('/api/course', course);
router.use('/api/schedule', schedule);

module.exports = router;