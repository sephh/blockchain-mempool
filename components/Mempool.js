const Utils = require('../utils');
const utils = new Utils();
const FIVE_MINUTES = 5 * 60 * 1000;

class Mempool {

	constructor() {
		this.validationRequests = {};
		this.validationTimeouts = {};
		this.validRequests = {};
	}

	addRequestValidation(address) {
		const timeStamp = utils.getCurrentTimeStamp();

		this.validationRequests[address] = {
			walletAddress: address,
			requestTimeStamp: timeStamp,
			message: `${address}:${timeStamp}:starRegistry`,
		};

		this.validationTimeouts[address] = setTimeout(() => this.removeRequestValidation(address), FIVE_MINUTES);
	}

	removeRequestValidation(address) {
		if (!this.validationRequests[address]) return;

		clearTimeout(this.validationTimeouts[address]);

		delete this.validationRequests[address];
		delete this.validationTimeouts[address];
	}

	getRequestValidation(address) {
		const request = this.validationRequests[address];

		if (request) {
			return {
				...request,
				validationWindow: this.getTimeLeft(request.requestTimeStamp),
			};
		}

		return null;
	}

	getTimeLeft(previousTime) {
		const timeElapse = utils.getCurrentTimeStamp() - previousTime;
		return (FIVE_MINUTES / 1000) - timeElapse;
	}

}

module.exports = Mempool;