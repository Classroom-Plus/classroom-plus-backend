const castArray = require('lodash/castArray');
const isEmpty = require('lodash/isEmpty');

const api = require('./api');
const message = require('./messages');

const typingOn = (recipientId) => {
	return {
		recipient: {
			id: recipientId,
		},
		sender_action: 'typing_on',
	};
};

const typingOff = (recipientId) => {
	return {
		recipient: {
			id: recipientId,
		},
		sender_action: 'typing_off',
	};
};

const sendReadReceipt = (recipientId) => {
	const messageData = {
		recipient: {
			id: recipientId,
		},
		sender_action: 'mark_seen',
	};

	api.callMessagesAPI(messageData);
};

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
		typingOn(recipientId),
		...messagePayloadArray,
		typingOff(recipientId),
	]);
};

const sendSignOutSuccessMessage = (recipientId) =>
	sendMessage(recipientId, message.signOutSuccessMessage);

const sendSignInSuccessMessage = (recipientId, username) => {
	sendMessage(recipientId, message.signInSuccessMessage);
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
	sendReadReceipt,
	sendSignOutSuccessMessage,
	sendSignInSuccessMessage,
	sendTestMessage,
};