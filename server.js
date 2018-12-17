const express = require('express');
const bodyParser = require('body-parser');

class APIServer {

	constructor() {
		this.server = express();
	}

	init() {
		this.initExpress();
		this.initExpressMiddleWare();
		this.initControllers();
		this.startServer();
	}

	initExpress() {
		this.server.set('port', 8000);
	}

	initExpressMiddleWare() {
		this.server.use(bodyParser.urlencoded({ extended: true }));
		this.server.use(bodyParser.json());
	}

	initControllers() {
		require('./BlockController.js')(this.server);
	}

	startServer() {
		this.server.listen(this.server.get('port'), () => {
			console.log(`Server Listening for port: ${this.server.get('port')}`);
		});
	}

}

module.exports = APIServer;