import Control from 'static/js/controller.js';
import Header from 'widget/common/header/header'

let style = __inline('./cat.less');
let tpl = __inline('./cat.tpl');

require.loadCss({
    name: 'market-cat-page-style',
    content: style
});


class CatControl extends Control{

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

export default CatControl;
