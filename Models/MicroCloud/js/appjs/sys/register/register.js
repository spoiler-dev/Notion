$(document).ready(function () {
        validateRule();
});
function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
  $("#registerForm").validate({
      rules: {
      	userName: {
              required: true
          },
          name: {
              required: true
          },
          mobile: {
              required: true
          },
          orgName: {
              required: true 
          },
          password: {
              required: true
          },
          passwordConfirm: {
              required: true
          },
      },
      messages: {
          username: {
              required: icon + "请输入邮箱，作为您的账户",
          },
          name: {
              required: icon + "请输入您的姓名",
          },
          mobile: {
              required: icon + "请输入您的联系方式",
          },
          orgName: {
              required: icon + "请输入您的公司名称", 
          },
          password: {
              required: icon + "请设置您的密码",
          },
          passwordConfirm: {
              required: icon + "请确认您的密码",
          },
      }
  })
}