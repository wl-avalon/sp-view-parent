var RegisterService = require("/../../../services/common/register.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var classUuid = options.classUuid;
    classUuid = '845373327512956931';
    wx.setStorageSync('classUuid', classUuid);
    RegisterService.register();
  },
})