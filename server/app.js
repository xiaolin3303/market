// create an express app
var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path'),
	port = 80;

app.use('/static', express.static('/home/market/market-product/static'));

// main entry file
const mainEntry = path.join('/home/market/market-product/static');

// route handler for GET /
app.get('/', function(req, res) {
	fs.readFile(mainEntry, function(err, data) {
		if (err) {
			console.error(err);
			res.writeHead(500, {
				'Content-Type': 'text/html'
			});
			res.end('500 server error');
		} else {
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});
			res.end(data);
		}
	});
});

app.listen(port);

console.log('server started on port %s', port);