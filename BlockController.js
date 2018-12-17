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
		this.getBlockByIndex();
		this.postNewBlock();
	}

	/**
	 * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
	 */
	getBlockByIndex() {
		const { blockchain } = this;

		this.express.get('/block/:index', async (req, res) => {
			const { index } = req.params;
			const block = await blockchain.getBlock(index);

			if (block) {
				res.send(block);
			} else {
				res.status(404).send('Record not found');
			}
		});
	}

	/**
	 * Implement a POST Endpoint to add as new Block, url: "/api/block"
	 */
	postNewBlock() {
		this.express.post('/block', async (req, res) => {
			const body = req.body;

			if(!body || !body.body){
				res.status(500).send('Missing required field "body"');
				return;
			}

			const blockAux = new Block(body.body);
			const block = await this.blockchain.addBlock(blockAux);

			if (block) {
				res.send(block);
			} else {
				res.status(500).send('Error on add block.');
			}
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