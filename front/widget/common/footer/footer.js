let style = __inline('./footer.inline.less');
let tpl = __inline('./footer.tpl');

require.loadCss({
    name: 'market-widget-common-footer-style',
    content: style
});

export default Vue.component('common-footer', {
 	template: tpl
});