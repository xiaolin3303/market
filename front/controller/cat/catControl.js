import Control from 'static/js/controller.js';
import Header from 'widget/common/header/header'
import DataModel from 'static/js/utils/datamodel'

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
            },
            data: () => ({
                list: []
            }),
            asyncData: function (resolve, reject) {
                let cat = _APP_HASH.type;
                if (cat) {                
                    DataModel(COLLECTION_LIST(cat)).then((err, data) => {
                        if (err) {
                            me.pageLoadError();
                        } else {
                            resolve({
                                list: data.map(item => {
                                    item.image = COLLECTION_IMAGE_PRIFIX + item.images[0];
                                    return item;
                                })
                            });
                            me.pageLoaded();
                        }
                    });
                } else {
                    me.pageLoadError();
                }
            }            
        });
    }
}

export default CatControl;
