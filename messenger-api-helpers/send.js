const api = require('./api');
const message = require('./messages');
const castArray = require('lodash/castArray');

// Wraps a message JSON object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
	return {
		recipient: {
			id: recipientId,
		},  
		message: messagePayload,
	};
};

// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
	const messagePayloadArray = castArray(messagePayloads)
		.map((messagePayload) => messageToJSON(recipientId, messagePayload));

	api.callMessagesAPI([
		...messagePayloadArray
	]);
};

const sendTestMessage = (recipientId, messagePayload) => {
	const messageData = {
		recipient: {
			id: recipientId,
		},
		message: {
			text: `You sent the message: "${messagePayload}"`,
		},
	};

	api.callMessagesAPI(messageData);
};

module.exports = {
	sendMessage,
	sendTestMessage,
};