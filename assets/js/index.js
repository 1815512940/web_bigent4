$(function () {
    // 1.获取用户信息
    getUserInof()

    // 2.退出
    $('#btnLogout').on('click', function () {
        layui.layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            //清空本地token
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })
})

// 获取用户信息
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) return console.log(res);

            renderAvatar(res.data)
        }
    })
}

// 封装用户头像和昵称
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html(name)

    if (user.user_pic !== null) {
        $('.layui-nav-img').prop('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var text = name[0].toUpperCase()
        $('.text-avatar').html(text).show()
        $('.layui-nav-img').hide()
    }
}