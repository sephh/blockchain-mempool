const api = require('./server');

class App {

	constructor(){
		this.api = new api();
	}

	init(){
		this.api.init();
	}

}

const app = new App();

app.init();