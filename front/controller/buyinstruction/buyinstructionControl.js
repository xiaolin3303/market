import Control from 'static/js/controller.js'
import Header from 'widget/common/header/header'

let style = __inline('./buyinstruction.less');
let tpl = __inline('./buyinstruction.tpl');

require.loadCss({
    name: 'market-buyinstruction-page-style',
    content: style
});


class BuyinstructionControl extends Control{

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

export default BuyinstructionControl;
