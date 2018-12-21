const Utils = require('../utils');
const utils = new Utils();
const FIVE_MINUTES = 5 * 60 * 1000;
const THIRTY_MINUTES = 30 * 60 * 1000;

class Mempool {

	constructor() {
		this.validationRequests = {};
		this.validRequests = {};
	}

	/**
	 * @description add a requestValidation to the validationRequests object
	 * @param address
	 */
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

	/**
	 * @description add a valid request to the validRequests object
	 * @param request
	 */
	addValidRequest(request) {
		const { walletAddress, ...rest } = request;

		this.validRequests[walletAddress] = {
			value: {
				registerStar: true,
				status: {
					...rest,
					address: walletAddress,
					messageSignature: true,
				},
			},
			timeout: setTimeout(() => this.removeValidRequest(walletAddress), THIRTY_MINUTES),
		};

		this.removeRequestValidation(walletAddress);
	}

	/**
	 * @description get a request validation by address
	 * @param address
	 * @return {*}
	 */
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

	/**
	 * @description get a valid request by address
	 * @param address
	 * @return {*}
	 */
	getValidRequest(address) {
		const request = this.validRequests[address];

		if (request) {
			return request.value;
		}

		return null;
	}

	/**
	 * @description remove a request validation and clean the timeout
	 * @param address
	 */
	removeRequestValidation(address) {
		const request = this.validationRequests[address];

		if (!request) return;

		clearTimeout(request.timeout);

		delete this.validationRequests[address];
	}

	/**
	 * @description remove a valid request and clean the timeout
	 * @param address
	 */
	removeValidRequest(address) {
		const request = this.validRequests[address];

		if (!request) return;

		clearTimeout(request.timeout);

		delete this.validRequests[address];
	}

	/**
	 * @description a helper function to get the validation window of requests
	 * @param previousTime
	 * @return {number}
	 */
	getTimeLeft(previousTime) {
		const timeElapse = utils.getCurrentTimeStamp() - previousTime;
		return (FIVE_MINUTES / 1000) - timeElapse;
	}

}

module.exports = Mempool;