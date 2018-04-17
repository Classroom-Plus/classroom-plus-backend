const router = require('express').Router();
const webhooks = require('./webhooks');
const account = require('./account');
const user = require('./user');
const course = require('./course');
const schedule = require('./schedule');

/* ----------  Route for fb-messenger  ---------- */
router.use('/webhook', webhooks);

/* ----------  Route for api  ---------- */
router.use('/api/account', account);
router.use('/api/user', user);
router.use('/api/course', course);
router.use('/api/schedule', schedule);

module.exports = router;