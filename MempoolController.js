/**
 * Controller definition to encapsulate Mempool express routes
 */
class MempoolController {

	constructor(express) {
		this.express = express;
		this.requestValidation();
		this.validateMessage();
	}

	/**
	 * @name Request Validation
	 * @route {POST} /requestValidation
	 * @bodyparam address {String} the user wallet address
	 * @response walletAddress {String} the user wallet address
	 * @response requestTimeStamp {String} timestamp of request
	 * @response message {String} [walletAddress]:[timeStamp]:starRegistry
	 * @response validationWindow {Number} the request time in milliseconds
	 */
	requestValidation() {
		this.express.post('/requestValidation', (req, res) => {
			//TODO
		});
	}

	/**
	 * @name Validate Message Signature
	 * @route {POST} /message-signature/validate
	 * @bodyparam address {String} the user wallet address
	 * @bodyparam signature {String} the user wallet address
	 * @response registerStar {Boolean} if the is start is registered
	 * @response status {Object} the request data
	 */
	validateMessage() {
		this.express.post('/message-signature/validate', (req, res) => {
			//TODO
		});
	}

}

module.exports = MempoolController;