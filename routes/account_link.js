const router = require('express').Router()
const uuid = require('uuid');
const database = require('../utils/database');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { username, password, redirectURI } = req.body;
    let user;

    try {
        await database.connect();
        user = await User.findOne({ username: username });
        if (!user || password !== user.password) {
            res.render('login', {
                redirectURI,
                username,
                password,
                errorMessage: !user
                    ? 'Uh oh. That username doesn’t exist.'
                    : 'Oops. Incorrect password',
                errorInput: !user ? 'username' : 'password',
            });
        } else {
            const authCode = uuid();
            const redirectURISuccess = `${redirectURI}&authorization_code=${authCode}`;

            await User.findOneAndUpdate({ username: username }, { messenger_id: authCode });
            res.redirect(redirectURISuccess);
        }
    } catch (error) {
        console.log(error);
    }
}

/*
router.get('/register', (req, res) => {
    const accountLinkingToken = req.query.account_linking_token;
    const redirectURI = req.query.redirect_uri;

    res.render('create-account', { accountLinkingToken, redirectURI });
});

router.post('/register', (req, res) => {
    const { username, password, password2, redirectURI } = req.body;
    if (UserStore.has(username)) {
        res.render(
            'create-account',
            {
                username,
                password,
                password2,
                redirectURI,
                errorMessage: `Sorry! '${username}' has already been taken.`,
                errorInput: 'username',
            },
        );
    } else {
        UserStore.insert(username, password);

        if (redirectURI) {
            linkAccountToMessenger(res, username, redirectURI);
        } else {
            res.render('create-account-success', { username });
        }
    }
});
*/

router.get('/login', (req, res) => {
    const accountLinkingToken = req.query.account_linking_token;
    const redirectURI = req.query.redirect_uri;

    res.render('login', { accountLinkingToken, redirectURI });
});

router.post('/login', login);

router.post('/addUserTest', async (req, res) => {
    const { username, password, email, age, messenger_id} = req.body;
    let isCreate;
    try {
        await database.connect();
        isCreate = User.create({
            username: username,
            password: password,
            email: email,
            age: age,
            messenger_id: messenger_id
        });
        res.send(isCreate);
    } catch(error) {
        console.log(error);
    }
})

module.exports = router;