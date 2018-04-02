var LoginService = require("/../../../services/common/login.js");
var HomeworkApi = require('/../../../apis/Homework.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeworkUuid: '',
    homeworkContent: '',
    minutes: '',
    childUuid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    LoginService.checkLogin();
    this.setData({
      childUuid: options.childUuid,
      homeworkUuid: options.homeworkUuid,
      homeworkContent: options.homeworkContent,
    });
  },

  saveInput: function(e){
    var minutes = e.detail.value;
    this.setData({
      minutes: minutes
    });
  },

  finishHomework: function(){
    var minutes       = this.data.minutes;
    var childUuid     = this.data.childUuid;
    var homeworkUuid  = this.data.homeworkUuid;
    HomeworkApi.finishHomework({
      minutes: minutes,
      childUuid: childUuid,
      homeworkUuid: homeworkUuid,
      successFunc: finishHomeworkSuccess,
      failedFunc: finishHomeworkFailed,
    });
  }
})

function finishHomeworkSuccess() {
  wx.showToast({
    title: "成功",
    icon: 'success',
    duration: 2000,
    mask: true,
    success: function () {
      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/home/index/index',
        });
      }, 2000);
    }
  });
}

function finishHomeworkFailed() {
  wx.showToast({
    title: "网络繁忙，请稍后再试",
    icon: 'none',
    duration: 2000,
    mask: true,
  });
}