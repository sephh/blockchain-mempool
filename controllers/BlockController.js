const Blockchain = require('../components/BlockChain.js');
const Block = require('../components/Block.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

	/**
	 * Constructor to create a new BlockController, you need to initialize here all your endpoints
	 * @param {*} express
	 * @param {*} mempool
	 */
	constructor(express, mempool) {
		this.express = express;
		this.mempool = mempool;
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
				return res.send(block);
			}

			return res.status(404).send('Record not found');
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
			try {
				const { address, star } = req.body;

				if (!address || !star) {
					return res.status(500).send('Missing required field address or star');
				}

				const validRequest = this.mempool.getValidRequest(address);

				if (!validRequest) {
					return res.status(401).send('The address must be validated');
				}

				const starObject = JSON.parse(star);
				const { ra, dec, story } = starObject;

				if (!ra || !dec || !story) {
					return res.status(500).send('Missing star required field ra, dec or story');
				}

				const body = {
					address,
					star: {
						...starObject,
						story: new Buffer.from(story).toString('hex'),
					}
				};

				const blockAux = new Block(body);
				const block = await this.blockchain.addBlock(blockAux);

				if (block) {
					return res.send(block);
				}

				return res.status(500).send('Error on add block.');
			} catch (e) {
				console.log('Error: ', e);
				return res.status(500).send('Server internal error');
			}
		});
	}

	/**
	 * @name Get Star by Hash
	 * @route {Get} /stars/hash:hash
	 * @queryparam hash {String} the star block hash
	 * @response the block of the related hash
	 */
	getStarByHash() {
		const { blockchain } = this;

		this.express.get('/stars/hash::hash', async (req, res) => {
			try {
				const { hash } = req.params;
				const block = await blockchain.getBlockByHash(hash);

				if (block) {
					return res.send(this.decodeStarStory(block));
				}

				return res.status(404).send('Record not found');
			} catch (e) {
				console.log('Error: ', e);
				return res.status(500).send('Server internal error');
			}

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

	/**
	 * @description decode the hex string story and add to a new attribute storyDecoded
	 * @param block
	 * @return {Object}
	 */
	decodeStarStory(block) {
		return {
			...block,
			body: {
				...block.body,
				star: {
					...block.body.star,
					storyDecoded: new Buffer.from(block.body.star.story, 'hex').toString('utf8'),
				},
			}
		}
	}

}

/**
 * Exporting the BlockController class
 * @param {*} express
 * @param {*} mempool
 */
module.exports = (express, mempool) => {
	return new BlockController(express, mempool);
}