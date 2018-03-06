import sendApi from './send';
import UserStore from '../stores/user_store';

const handleReceiveAccountLink = (event) => {
    const senderId = event.sender.id;
    const status = event.account_linking.status;
    const authCode = event.account_linking.authorization_code;

    console.log('Received account link event with for user %d with status %s ' +
        'and auth code %s ', senderId, status, authCode);

    switch (status) {
        case 'linked':
            const linkedUser = UserStore.replaceAuthToken(authCode, senderId);
            sendApi.sendSignInSuccessMessage(senderId, linkedUser.username);
            break;
        case 'unlinked':
            UserStore.unlinkMessengerAccount(senderId);
            sendApi.sendSignOutSuccessMessage(senderId);
            break;
        default:
            break;
    }
};

const handleReceivePostback = (event) => {
    const { type } = JSON.parse(event.postback.payload);
    const senderId = event.sender.id;

    // Perform an action based on the type of payload received.
    switch (type) {
        case 'GET_STARTED':
            sendApi.sendWelcomeMessage(senderId);
            break;
        default:
            console.error(`Unknown Postback called: ${type}`);
            break;
    }
};

const handleReceiveMessage = (event) => {
    const message = event.message;
    const senderId = event.sender.id;

    sendApi.sendReadReceipt(senderId);
    if (message.text) {
        sendApi.sendWelcomeMessage(senderId);
    }
};

export default {
    handleReceiveAccountLink,
    handleReceiveMessage,
    handleReceivePostback,
};