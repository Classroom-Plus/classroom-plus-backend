const sendApi = require('./send');

const handleReceiveMessage = (event) => {
    const senderId = event.sender.id;
    const message = event.message;

    if(message.text){
        sendApi.sendTestMessage(senderId, message.text);
    }
}

module.exports = {
    handleReceiveMessage
};