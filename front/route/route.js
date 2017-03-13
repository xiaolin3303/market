/**
 * 此处需要声明 require.async所有的可能值
 * @require.async market:controller/detail/detailControl.js
 * <!-- require resource map hook -->
 */

import Url from 'static/js/utils/url.js'

class Router {

    constructor(){
        this.DEFUALT_PAGE = 'main';
    }
    /**
    *  route init
    **/
    init() {
        var me = this;
        this.navigation();

        listener.on('page', 'reload', function() {
            me.navigation();
        });

        window.addEventListener('hashchange', function () {
            listener.trigger('hash', 'change');
            me.navigation();
        }, false);
    }

    navigation() {
        let uri = location.hash.split('?');
        uri = uri[0].replace(/^#/, '');
        uri = '/' + uri;

        let currentPage = Url.getPage();
        $('#page-loading').show();
        let me = this;
        let page = Url.getPage() || this.DEFUALT_PAGE;
        let pageParam = page.split('_');
        let controller = pageParam.pop();
        let dir = pageParam.join('/');
        dir = dir ? dir + '/' : '';

        let path = `market:controller/${dir}${controller}/${controller}Control.js`;

        listener.trigger('page', 'change');

        _APP_HASH = Url.urlToJSON();
        require.async(path, function (controller) {
            if (Url.getPage() === currentPage) {
                try {
                    new controller();
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }
}
