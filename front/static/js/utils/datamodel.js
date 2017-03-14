import { Promise } from 'static/js/promise.js';
import Util from 'static/js/utils/util'

let dataModel = (url, data, opts = {}) => {
    opts = $.extend({
        type: 'GET',
        timeout: 5000,
        headers: {}
    }, opts);

    let p = new Promise();

    $.ajax({
        url: url,
        data: data,
        type: opts.type,
        timeout : opts.timeout,
        dataType: 'json',
        cache: false,
        headers: opts.headers,
        beforeSend: function(xhr){
            // xhr.withCredentials = true;
        },
        success: (ret, textStatus, request) => {
            p.done(null, ret);
        },
        error: (xhr) => {
            let response = {};
            try {
                response = JSON.parse(xhr.responseText);
            } catch (e) {
                // TODO
            }
            let msg = response.message || '网络似乎有点问题，请重试';
            p.done(msg);
        }
    });

    return p;
}

export default dataModel;