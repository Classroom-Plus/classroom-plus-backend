const SERVER_URL = process.env.SERVER_URL; 

const signInButton = {
    type: 'account_link',
    url: `${SERVER_URL}/users/login`,
};

const signOutButton = { 
    type: 'account_unlink',
};

const createAccountMessage = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'button',
            text: 'Ready to do this?',
            buttons: [signInButton],
        },
    },
};

const signInSuccessMessage = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'button',
            text: 'Sign In Success',
            buttons: [signOutButton],
        },
    },
};

const signOutSuccessMessage = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'button',
            text: 'Sign Out Success',
            buttons: [signInButton],
        },
    },
};


module.exports = {
    createAccountMessage,
    signInSuccessMessage,
    signOutSuccessMessage,
}
