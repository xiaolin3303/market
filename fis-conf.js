/**
 * @file fis config file
 */

/*******************************************
set namespace ; require file by modular way
********************************************/

fis.config.set('namespace', 'market');

/************************************
set domain to make sure that you
can get back files from corect position
*************************************/


// fis.media('product').match('*', {
//   domain: '/'
// });

// set 为覆盖不是叠加
fis.set('project.ignore', fis.get('project.ignore').concat(['createPage.js', 'createWidget.js', 'server/**']));

/**********************
     parse files
**********************/

fis.match('*.tmpl', {
    rExt: '.js',
    parser: fis.plugin('bdtmpl')
});

fis.match('*.less', {
    rExt: '.css',
    parser: fis.plugin('less-2.x')
});

// fis parse es6 to es5
fis.match('/widget/**.js', {
    parser: fis.plugin('babel', {
        blacklist: ["useStrict"]
    })
});
fis.match('/{controller,model,route,config}/**.js', {
    parser: fis.plugin('babel')
});

fis.match('static/js/**.js', {
    parser: fis.plugin('babel', {
        compact: false
    })
});

/**********************
     optimize files
**********************/
fis.match('*.{css,less}', {
    optimizer: fis.plugin('clean-css')
});
// fis.match('*.js', {
//     optimizer: fis.plugin('uglify-js')
// });
fis.match('*.png', {
    optimizer: fis.plugin('png-compressor', {
      type : 'pngquant'
    })
});


// 启用 fis-spriter-csssprites 插件
// fis.match('::package', {
//     spriter: fis.plugin('csssprites')
// });
// fis.config.set('settings.spriter.csssprites', {
//     scale: 0.5
// });


/**********************
     pack files
**********************/

fis.match('::package', {
    packager: fis.plugin('map', {
        '/static/core-lib-pkg.js': [
          '/static/lib/**.js',
          '/config/**.js'
        ],
        '/static/common-lib-pkg.js': [
          '/static/js/*.js',
          '/route/route.js',
          '/static/js/utils/url.js'
        ],
        '/static/util-lib-pkg.js': [
          '/static/js/utils/iscroll.js',
          '/static/js/utils/swipe.js',
          '/static/js/utils/util.js',
          '/static/js/utils/datamodel.js',
        ]
    })
});

/**********************
     Modular files
**********************/

fis.match('/{controller,widget,model}/**.js', {
    isMod: true
});

fis.match('/static/js/**.js', {
    isMod: true
});

/**********************
    release directory
**********************/

// fis.match('{controller,widget,model,config,static,route}/**', {
//     release : '/$0'
// });


/**********************
     preload plugin
**********************/
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
});
fis.config.set('settings.postpackager.autoload.beautyResourceMap', true);

fis.match('*.{js,css,png}', {
    useHash: true
});

fis.match('*.png', {
    useMap : true
});

fis.hook('commonjs');

fis.config.set('project.watch.usePolling', true);

