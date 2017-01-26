var fs = require("fs");
var path = require('path');

var arguments = process.argv.splice(2);

if (arguments.length === 0) {
	console.log('missing `widgetName` name param');
	process.exit();
}

function firstUpperCase (text) {
	return text.toString()[0].toUpperCase() + text.toString().slice(1)
}

var page = arguments[0];
var dir = arguments[1] || '';
var directory = dir;
if (directory) {
	directory += '/';
}
if (dir) {
	dir = dir + '-';
}

var htmlTpl = `<div class="market-${dir}${page}-page">
	<div class="tac mt20">
		${page} Page is ready!
	</div>
</div>
`;

var styleTpl = `.market-${dir}${page}-page {
}
`;

var jsTpl = `import Control from 'static/js/controller.js'
import comtitle from 'widget/comtitle/comtitle.js'

let style = __inline('./${page}.less');
let tpl = __inline('./${page}.tpl');

require.loadCss({
    name: 'market-${dir}${page}-page-style',
    content: style
});


class ${firstUpperCase(page)}Control extends Control{

    constructor(data = {}){
        super(data);
    }

    init(data) {
        let me = this;
        new Vue({
            el: this.rootWrapper,
            template: tpl,
            ready: function () {
                me.pageLoaded();
            }
        });
    }
}

export default ${firstUpperCase(page)}Control;
`;

function writezRouteFile (filename , content){

	fs.open	(filename, 'r+', '0644', function (e, fd) {
	    
	    if(e) throw e;
	    var buffer = new Buffer(content);

		fs.write(fd, buffer,0,buffer.length,168, function (err, written, buffer) {
			console.log('write-buffer:' + buffer);
		 });
	});
}

function readFile (filename, callback) {
	fs.readFile(filename, function (err, data) {
	   if (err) {
	       console.error(err);
	       process.exit();
	   }
	   callback(data.toString());
	});
}

function mkdirSync (dir, mode) {
	mode = mode || 0755;

	if(!fs.existsSync(dir)) {
		fs.mkdirSync(dir, mode)
	} else {
		console.log('Directory [' + dir + '] has existed');
		process.exit();
	}
}

function writeFile (filename, content) {
	fs.open(filename, 'w', '0644', function (e, fd) {
	    
	    if(e) throw e;
	    
	    fs.write(fd, content, function(e){
	        if(e) throw e;
	        fs.closeSync(fd);
	    });
	});
}

var pagePath = 'controller/' + directory;

if(!fs.existsSync(pagePath)) {
	fs.mkdirSync(pagePath, 0755);
}

mkdirSync (pagePath + page);

writeFile (pagePath + page + '/' + page + '.less', styleTpl);
writeFile (pagePath + page + '/' + page + 'Control.js', jsTpl);
writeFile (pagePath + page + '/' + page + '.tpl', htmlTpl);

readFile('route/route.js' , function (fileContent) {
	var routeInfo =  `@require.async market:${pagePath}${page}/${page}Control.js`;
	fileContent = fileContent.replace('<!-- require resource map hook -->', `${routeInfo}\n * <!-- require resource map hook -->`);
	writeFile('route/route.js', fileContent);
});

console.log('Create Page Success!');
