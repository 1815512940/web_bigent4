$(function () {
    // 1. 切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 2.自定义验证规则
    var form = layui.form
    form.verify({
        pwd:[
            /^[\S]{6,16}$/
            ,'密码必须6到16位，且不能出现空格'
          ] ,
          // 比较两次密码是否输入不一致
          rePwd: function (value) {
              var pwd = $('.reg-box [name=password]').val()
              if (value !== pwd) return '两次密码输入不一致！'
          }
    })

    // 3.注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 清空 form 表单
                $('#form_reg')[0].reset()
                // 自动触发切换按钮
                $('#link_login').click()
            }
        })
    })

    // 4.登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 保存tokan 到本地
                localStorage.setItem('token', res.token)
                // 跳转到后台首页
                location.href = '/index.html'
            }
        })
    })
})