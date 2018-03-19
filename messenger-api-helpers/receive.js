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
            break;
        case 'unlinked':
            break;
        default:
            break;
    }
}

module.exports = {
    handleReceiveMessage,
    handleReceiveAccountLink
};