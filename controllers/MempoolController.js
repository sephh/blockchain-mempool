const bitcoinMessage = require('bitcoinjs-message');

const Mempool = require('../components/Mempool');

/**
 * Controller definition to encapsulate Mempool express routes
 */
class MempoolController {

	constructor(express) {
		this.express = express;
		this.mempool = new Mempool();
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
			const { address } = req.body;

			if (!address) {
				res.status(500).send('Missing required field "address"');
			}

			const request = this.mempool.getRequestValidation(address);

			if (!request) {
				this.mempool.addRequestValidation(address);
			}

			res.send(this.mempool.getRequestValidation(address));
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
			const { address, signature } = req.body;

			if (!address || !signature) {
				res.status(500).send('Missing required field "address" or "signature"');
			}

			const request = this.mempool.getRequestValidation(address);

			if (!request) {
				res.status(404).send('Wallet not found. Please, add a wallet to validation.');
			}

			const { message, validationWindow } = request;

			if (validationWindow <= 0) {
				res.status(500).send('Sorry, the validation expired.');
			}

			const isValid = bitcoinMessage.verify(message, address, signature);

			if (!isValid) {
				res.status(401).send('Invalid signature.');
			}

			this.mempool.addValidRequest(request);

			res.send(this.mempool.getValidRequest(address));
		});
	}

}

module.exports = (express) => {
	return new MempoolController(express);
}
