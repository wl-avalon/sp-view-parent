var LoginService = require("/../../../services/common/login.js");

Page({

  data: {
    studentUuid: '',
  },

  onLoad: function (options) {
    LoginService.checkLogin();
    var studentUuid = options.studentUuid;
    this.setData({
      studentUuid: studentUuid,
    });
  },
  jumpToFinishDetail: function(){
    wx.navigateTo({
      url: '../finishDetail/finishDetail?studentUuid=' + this.data.studentUuid,
    });
  },
  jumpToClassFinish: function(){
    wx.navigateTo({
      url: '../classFinishDetail/classFinishDetail?studentUuid=' + this.data.studentUuid,
    });
  },
})