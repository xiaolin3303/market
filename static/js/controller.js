import Url from 'static/js/utils/url'

export default class Control{

 	constructor(data = {}){
        // set default
        this.rootWrapper = data.wrapper || '#page-wrapper';

        $(this.rootWrapper).removeClass();
        this._page_ = Url.getPage();
 		this.init  && this.init(data);
 	}

    _isCurrentPage () {
        return Url.getPage() === this._page_;
    }

    pageLoaded () {
        // must call this method when page is ready to hide loading animation
        // commonly when page data is ready to call
        if (this._isCurrentPage()) {
            $('#page-loading').hide();
        }
    }

    pageLoadError () {
        // call this method when error occurs on page loading
        // this method will append a page error tip and a retry mechanism
        // commonly when the interface is error to call
        if (this._isCurrentPage()) {
            $('#page-loading').hide();
            $('#page-wrapper').html('<div class="page-error">加载页面失败，点击重试</div>');
        }
    }
 }


