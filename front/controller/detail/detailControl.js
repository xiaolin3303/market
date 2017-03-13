import Control from 'static/js/controller.js'

let style = __inline('./detail.less');
let tpl = __inline('./detail.tpl');

require.loadCss({
    name: 'market-detail-page-style',
    content: style
});


class DetailControl extends Control{

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

export default DetailControl;
