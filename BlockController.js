const Blockchain = require('./BlockChain.js');
const Block = require('./Block.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

	/**
	 * Constructor to create a new BlockController, you need to initialize here all your endpoints
	 * @param {*} express
	 */
	constructor(express) {
		this.express = express;
		this.blockchain = new Blockchain();
		this.getBlockByHeight();
		this.postNewBlock();
		this.getStarByHash();
		this.getStarsByAddress();
	}

	/**
	 * @name Get Block by Height
	 * @route {Get} /block/:height
	 * @queryparam hash {String} the star block height
	 * @response the block of the related height
	 */
	getBlockByHeight() {
		const { blockchain } = this;

		this.express.get('/block/:height', async (req, res) => {
			const { height } = req.params;
			const block = await blockchain.getBlock(height);

			if (block) {
				res.send(block);
			} else {
				res.status(404).send('Record not found');
			}
		});
	}

	/**
	 * @name Star Registration
	 * @route {POST} /block
	 * @bodyparam address {String} the user wallet address
	 * @bodyparam star {{dec {String}, ra {String}, story {String}}} the start data
	 * @response block {Block} the block with the start data
	 */
	postNewBlock() {
		this.express.post('/block', async (req, res) => {
			//TODO
			// const body = req.body;
			//
			// if(!body || !body.body){
			// 	res.status(500).send('Missing required field "body"');
			// 	return;
			// }
			//
			// const blockAux = new Block(body.body);
			// const block = await this.blockchain.addBlock(blockAux);
			//
			// if (block) {
			// 	res.send(block);
			// } else {
			// 	res.status(500).send('Error on add block.');
			// }
		});
	}

	/**
	 * @name Get Star by Hash
	 * @route {Get} /stars/:hash
	 * @queryparam hash {String} the star block hash
	 * @response the block of the related hash
	 */
	getStarByHash() {
		this.express.get('/stars/:hash', async (req, res) => {
			//TODO
			// const body = req.body;
			//
			// if(!body || !body.body){
			// 	res.status(500).send('Missing required field "body"');
			// 	return;
			// }
			//
			// const blockAux = new Block(body.body);
			// const block = await this.blockchain.addBlock(blockAux);
			//
			// if (block) {
			// 	res.send(block);
			// } else {
			// 	res.status(500).send('Error on add block.');
			// }
		});
	}

	/**
	 * @name Get Starts by Address
	 * @route {Get} /stars/:address
	 * @queryparam hash {String} the star block hash
	 * @response the block of the related hash
	 */
	getStarsByAddress() {
		this.express.get('/stars/:address', async (req, res) => {
			//TODO
			// const body = req.body;
			//
			// if(!body || !body.body){
			// 	res.status(500).send('Missing required field "body"');
			// 	return;
			// }
			//
			// const blockAux = new Block(body.body);
			// const block = await this.blockchain.addBlock(blockAux);
			//
			// if (block) {
			// 	res.send(block);
			// } else {
			// 	res.status(500).send('Error on add block.');
			// }
		});
	}

}

/**
 * Exporting the BlockController class
 * @param {*} express
 */
module.exports = (express) => {
	return new BlockController(express);
}