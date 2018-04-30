const router = require('express').Router();
const webhooks = require('./webhooks');
const account = require('./account');
const user = require('./user');
const course = require('./course');
const schedule = require('./schedule');
const topic = require('./topic');

/* ----------  Route for fb-messenger  ---------- */
router.use('/webhook', webhooks);

/* ----------  Route for api  ---------- */
router.use('/api/account', account);
router.use('/api/user', user);
router.use('/api/course', course);
router.use('/api/schedule', schedule);
router.use('/api/topic', topic);
module.exports = router;