$(function () {
    // 拦截所用的Ajax请求
    $.ajaxPrefilter(function (params) {
        params.url = 'http://ajax.frontend.itheima.net' + params.url

        // 对需要权限的接口配置信息
        // 以/my/开头
        if (params.url.indexOf("/my/") !== -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        // 拦截所有响应，判断身份认证信息
        params.complete = function (res) {
            var obj = res.responseJSON
            if (obj.status == 1 && obj.message == '身份认证失败！') {
                localStorage.removeItem('token')
                // 跳转到登录页面
                location.href = '/login.html'
            }
        }
    })

})