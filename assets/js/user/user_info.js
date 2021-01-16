$(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 60) {
        return "昵称长度必须在 1 ~ 6 个字符之间！";
      }
    },
  });
  initUserInfo();
  // 初始化用户的基本信息
  function initUserInfo() {
    // 从服务器拿数据渲染到页面上 请求方式：get
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        // 没有token值的时候 或token值失败
        if (res.status != 0) {
          return layer.msg("获取用户信息失败");
          // alert("获取用户信息失败")
        }
        console.log(res);
        // 调用 form.val() 快速为表单赋值  第一个参数被赋值的表单：formUserInfo 第二个参数拿到后台data 里的数据
        form.val("formUserInfo", res.data);
      },
    });
  }
  $("#btnReset").on("click", function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault();

    // 调用一下初始化用户的基本信息
    initUserInfo();
  });

  $(".layui-form").on("submit", function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/userinfo",
      // 获取表单里提供的数据
      data: $(this).serialize(),

      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户失败！ ");
        }
        layer.msg("更新用户成功！");
        //   调用父页面的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo();
      },
    });
  });
});
