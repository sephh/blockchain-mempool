class Utils {

	getCurrentTimeStamp() {
		return new Date().getTime().toString().slice(0, -3);
	}

}

module.exports = Utils;