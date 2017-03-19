let style = __inline('./header.inline.less');
let tpl = __inline('./header.tpl');

require.loadCss({
    name: 'market-widget-common-header-style',
    content: style
});

export default Vue.component('common-header', {
 	template: tpl
});