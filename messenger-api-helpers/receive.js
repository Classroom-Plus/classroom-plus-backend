const sendApi = require('./send');

const handleReceiveMessage = (event) => {
    const senderId = event.sender.id;
    const message = event.message;

    sendApi.sendReadReceipt(senderId);
    if (message.text) {
        sendApi.sendTestMessage(senderId, message.text);
    }
}

const handleReceiveAccountLink = (event) => {
    const senderId = event.sender.id;
    const status = event.account_linking.status;
    const authCode = event.account_linking.authorization_code;

    switch (status) {
        case 'linked':
            sendApi.sendSignInSuccessMessage(senderId, linkedUser.username);
            break;
        case 'unlinked':
            sendApi.sendSignOutSuccessMessage(senderId);
            break;
        default:
            break;
    }
}

module.exports = {
    handleReceiveMessage,
    handleReceiveAccountLink
};