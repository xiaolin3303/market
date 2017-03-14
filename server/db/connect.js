var MongoClient = require('mongodb').MongoClient;

module.exports = new Promise((resolve, reject) => {
	
	MongoClient.connect('mongodb://139.129.230.76:27017/market', function(err, db) {
		if (err) {
			reject(err);
		} else {		
			resolve(db);
		}
	});
});