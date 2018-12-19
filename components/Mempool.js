const Utils = require('../utils');
const utils = new Utils();
const FIVE_MINUTES = 5 * 60 * 1000;

class Mempool {

	constructor() {
		this.validationRequests = {};
		this.validRequests = {};
	}

	addRequestValidation(address) {
		const timeStamp = utils.getCurrentTimeStamp();

		this.validationRequests[address] = {
			value: {
				walletAddress: address,
				requestTimeStamp: timeStamp,
				message: `${address}:${timeStamp}:starRegistry`,
			},
			timeout: setTimeout(() => this.removeRequestValidation(address), FIVE_MINUTES),
		};
	}

	addValidRequest(request) {
		const { walletAddress, ...rest } = request;

		this.validRequests[walletAddress] = {
			registerStar: true,
			status: {
				...rest,
				address: walletAddress,
				messageSignature: true,
			},
		};

		this.removeRequestValidation(walletAddress);
	}

	getRequestValidation(address) {
		const request = this.validationRequests[address];

		if (request) {
			return {
				...request.value,
				validationWindow: this.getTimeLeft(request.value.requestTimeStamp),
			};
		}

		return null;
	}

	getValidRequest(address){
		return this.validRequests[address];
	}

	removeRequestValidation(address) {
		const request = this.validationRequests[address];

		if (!request) return;

		clearTimeout(request.timeout);

		delete this.validationRequests[address];
	}

	getTimeLeft(previousTime) {
		const timeElapse = utils.getCurrentTimeStamp() - previousTime;
		return (FIVE_MINUTES / 1000) - timeElapse;
	}

}

module.exports = Mempool;