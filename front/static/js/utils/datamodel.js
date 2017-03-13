import { Promise } from 'static/js/promise.js';
import Auth from 'static/js/utils/auth'
import Util from 'static/js/utils/util'

let clearUnvalidToken = (expireToken) => {
    if (expireToken === Auth.getToken()) {
        Auth.setToken('');
    }
};

let dataModel = (url, data, opts = {}) => {
    opts = $.extend({
        type: 'POST',
        timeout: 5000,
        headers: {}
    }, opts);

    if (opts.headers.Authorization && opts.headers.Authorization.trim() === 'JWT') {
        // invalid JWT token
        delete opts.headers.Authorization;
    }
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
            xhr.withCredentials = true;
        },
        success: (ret, textStatus, request) => {
            clearUnvalidToken(ret['gpj.expire_token']);
            if(ret.status === 'success'){
                p.done(null, ret.result || ret.data, ret);
            } else {
                if (ret.login_required === 'yes') {
                    Util.login({ type: 'direct' });
                } else {
                    p.done(ret.message || ret.msg || '服务似乎有点问题，请重试');
                }
            }
        },
        error: (request) => {
            p.done('网络似乎有点问题，请重试');
        }
    });

    return p;
}

export default dataModel;