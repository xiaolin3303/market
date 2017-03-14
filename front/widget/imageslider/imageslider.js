import Swipe from 'static/js/utils/swipe.js'
import Util from 'static/js/utils/util'


let style = __inline('./imageslider.inline.less');
let tpl = __inline('./imageslider.tpl');

require.loadCss({
    name: 'market-widget-imageslider-style',
    content: style
});
export default Vue.component('imageslider', {
	template: tpl,
	data: () => ({
		curIndex: 0 
    }),
	ready: function () {
		if (this.isReady) {
			this.render();
		}
	},
	props:{
		images: {
			type: Array,
			default: []
		},
		isReady: {
			type: Boolean,
			default: false
		},
		useThumbnail: {type: Boolean, default: false}
	},
	computed: {
		thumbnails: function () {
			if (this.useThumbnail) {
				return this.images.map(image => Util.thumbnail({
					width: 640,
					src: image
				})).slice(0, 10);
			} else {
				return this.images.slice(0, 10);
			}
		}
	},
	methods:{
		render: function () {
			let container = $(this.$el).find('.slider');
			let me = this;
			Vue.nextTick(function () {
				new Swipe(container.get(0), {
					auto: 3000,
					transitionEnd: (index) => {
						me.curIndex = index % me.thumbnails.length;
					},
					callback: function(index, element) {
						/*that.slideTab(index);*/
					},
					continuous: true,
				});
			});

			setTimeout(() => {
				container.css({opacity: 1});
			}, 1000);
		}
	},
	watch: {
		isReady: function (val) {
			let container = $(this.$el).find('.slider');
			let me = this;
			if (val === true) {
				this.render();
			}
		}
	}
})
