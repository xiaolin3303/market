import Control from 'static/js/controller.js'
import DataModel from 'static/js/utils/datamodel'
import ImageSlider from 'widget/common/imageslider/imageslider'
import Header from 'widget/common/header/header'
import Url from 'static/js/utils/url'

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
            data: () => ({
                detail: {
                    images: []
                },
                liked: false
            }),
            ready: function () {
                me.pageLoaded();
            },
            methods: {
                buy: function () {
                    Url.navigate({
                        url: 'buyinstruction'
                    });
                },
                like: function () {
                    if (this.liked === false) {
                        this.liked = true;
                        DataModel(COLLECTION_DETAIL(_APP_HASH.id), {}, {
                            type: 'PUT'
                        }).then((err, data) => {
                        });
                        this.detail.like = this.detail.like + 1;
                    }
                }
            },
            asyncData: function (resolve, reject) {
                let id = _APP_HASH.id;
                if (id) {                
                    DataModel(COLLECTION_DETAIL(id)).then((err, data) => {
                        if (err) {
                            me.pageLoadError();
                        } else {
                            data.images = data.images.map(image => {
                                return COLLECTION_IMAGE_PRIFIX + image;
                            });
                            resolve({detail: data});
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

export default DetailControl;
