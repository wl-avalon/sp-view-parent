var LoginService = require("/../../../services/common/login.js");

Page({

  data: {
  
  },

  onLoad: function (options) {
    LoginService.checkLogin();
    var studentUuid = options.studentUuid;
    studentUuid = '845419812027887621';
    this.setData({
      studentUuid: studentUuid,
    });
  }
})