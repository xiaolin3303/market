import Control from 'static/js/controller.js'
import ImageSlider from 'widget/common/imageslider/imageslider'
import Header from 'widget/common/header/header'
import Footer from 'widget/common/footer/footer'

let style = __inline('./main.less');
let tpl = __inline('./main.tpl');

require.loadCss({
    name: 'market-main-page-style',
    content: style
});


class MainControl extends Control{

    constructor(data = {}){
        super(data);
    }

    init(data) {
        let me = this;
        new Vue({
            el: this.rootWrapper,
            template: tpl,
            data: () => ({
                bannerImages: [
                    `${COLLECTION_IMAGE_PRIFIX}1.png`,
                    `${COLLECTION_IMAGE_PRIFIX}4.png`,
                    `${COLLECTION_IMAGE_PRIFIX}5.png`,
                    `${COLLECTION_IMAGE_PRIFIX}9.png`,
                    `${COLLECTION_IMAGE_PRIFIX}22.png`,
                    `${COLLECTION_IMAGE_PRIFIX}28.png`
                ],
                catList: []
            }),
            ready: function () {
                me.pageLoaded();
                this.catList = this.processCat(CAT);
            },
            methods: {
                processCat: function (data) {
                    let result = [];
                    for (let i in data) {
                        if (data.hasOwnProperty(i)) {
                            let tmp = $.extend(true, {}, data[i]);
                            tmp.key = i;
                            result.push(tmp);
                        }
                    }

                    return result;
                }
            }
        });
    }
}

export default MainControl;
