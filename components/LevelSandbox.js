/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

	constructor() {
		this.db = level(chainDB);
	}

	// Get data from levelDB with key (Promise)
	getLevelDBData(key) {
		let self = this;
		return new Promise(function (resolve, reject) {
			self.db.get(key, function (err, value) {
				// if (err) {
				// 	console.log('Record not found', err);
				// }

				resolve(value);
			})
		});
	}

	// Add data to levelDB with key and value (Promise)
	addLevelDBData(key, value) {
		let self = this;
		return this.getLevelDBData(key)
			.then((block) => {
				return new Promise(function (resolve, reject) {
					if (block) {
						reject('Block already exists');
					}

					self.db.put(key, value, function (err) {
						if (err) {
							console.log('Block ' + key + ' submission failed', err);
							reject(err);
						}
						resolve(value);
					});
				})
			});
	}

	// Method that return the height
	getBlocksCount() {
		let self = this;

		return new Promise(function (resolve, reject) {
			let count = 0;
			self.db.createReadStream()
				.on('data', function () {
					count++;
				})
				.on('error', function (err) {
					reject(err);
				})
				.on('close', function () {
					resolve(count)
				});
		});
	}

	/**
	 * @description get block by hash
	 * @param hash
	 * @return {Promise<Block>}
	 */
	getBlockByHash(hash) {
		let self = this;
		let block = null;

		return new Promise(function (resolve, reject) {

			self.db.createReadStream()
				.on('data', function (data) {
					const auxBlock = JSON.parse(data.value);
					if (auxBlock && auxBlock.hash === hash) {
						block = auxBlock;
					}
				})
				.on('error', function (err) {
					reject(err);
				})
				.on('close', function () {
					resolve(block)
				});
		});
	}

	/**
	 * @description get blocks by address
	 * @param address
	 * @return {Promise<Block[]>}
	 */
	getBlocksByAddress(address) {
		let self = this;
		let blocks = [];

		return new Promise(function (resolve, reject) {

			self.db.createReadStream()
				.on('data', function (data) {
					const auxBlock = JSON.parse(data.value);
					if (auxBlock.body && auxBlock.body.address === address) {
						blocks.push(auxBlock);
					}
				})
				.on('error', function (err) {
					reject(err);
				})
				.on('close', function () {
					resolve(blocks)
				});
		});
	}


}

module.exports = LevelSandbox;