$(function () {
    // 拦截所用的Ajax请求
    $.ajaxPrefilter(function (params) {
        params.url = 'http://ajax.frontend.itheima.net' + params.url
    })

})