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


// fis.match('*.{js,css,png,gif}', {
//     domain: 'http://webmap1.map.bdstatic.com/' + fis.get('namespace')
// });

/*******************************************
deploy file to remote machine
demo : fis3 relase -w
********************************************/

// fis.media('fang').match('*', {
//     deploy: fis.plugin('http-push', {
//         receiver: 'http://cq01-rdqa-dev050.cq01.baidu.com:8008/webmap/receiver.php',
//         to: '/home/users/wangjiapeng/superman/lighttpd/htdocs/jinbao'
//     }),
//     domain: '/' + fis.get('namespace')
// });

// release
// fis release --optimize --dest ../output


fis.media('product').match('*', {
  deploy: fis.plugin('local-deliver', {
    to: '../gpjh5/apps/vue/static/vue/'
  }),
  url: '/static/vue$0'
});
fis.media('product').match('*.html', {
  deploy: fis.plugin('local-deliver', {
    to: '../gpjh5/apps/vue/templates/vue/'
  })
});

// set 为覆盖不是叠加
fis.set('project.ignore', fis.get('project.ignore').concat(['createPage.js', 'createWidget.js']));

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
          '/static/js/utils/auth.js',
          '/static/js/utils/cookie.js',
          '/static/js/utils/dialog.js',
          '/static/js/utils/geo.js',
          '/static/js/utils/util.js',
          '/static/js/utils/store.js',
          '/static/js/utils/stat.js',
          '/static/js/utils/vindexnav.js',
          '/static/js/utils/vue.lazyimg.js',
          '/static/js/utils/zepto.lazyload.js',
          '/static/js/utils/datamodel.js',
          '/static/js/utils/datamodelv2.js',
          '/static/js/utils/callna.js',
          '/static/js/utils/IDValidator.js'
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

