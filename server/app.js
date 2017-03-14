// create an express app
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 80;
var bodyParser = require('body-parser');
var router = require('./router/router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// compress static files
app.use(express.compress());

// static files
app.use('/static', express.static('/home/market/market-product'));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// main entry file
const mainEntry = path.join('/home/market/market-product/index.html');

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