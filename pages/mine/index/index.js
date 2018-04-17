var LoginService = require("/../../../services/common/login.js");
var SchoolAdminApi = require('/../../../apis/SchoolAdmin.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    childList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var loginParams = {
      successFunc: this.loginSuccess,
    };
    LoginService.checkLogin(loginParams);
  },
  setUserIcon: function (res) {
    var classUuid = wx.getStorageSync('classUuid');
    var showBindButton = false;
    if(classUuid !== undefined && classUuid !== ''){
      showBindButton = true;
    }
    this.setData({
      userIcon: res.userInfo.avatarUrl,
      userName: res.userInfo.nickName,
      showBindButton: showBindButton,
      classUuid: classUuid,
    });
  },
  jumpToBindChildPage: function () {
    if (this.data.classUuid !== undefined && this.data.classUuid !== '') {
      wx.navigateTo({
        url: '../bindChild/bindChild?classUuid=' + this.data.classUuid,
      })
    }
  },
  loginSuccess: function () {
    wx.getUserInfo({
      lang: 'zh_CN',
      success: this.setUserIcon,
    })

    var getParams = {
      successFunc: this.setChildList,
    };
    SchoolAdminApi.getChildList(getParams);
  },
  setChildList: function(data){
    var childList = data.childList;
    if(childList === undefined){
      childList = [];
    }
    this.setData({
      childList: childList,
    });
  },
  jumpToFinishDetail: function(e){
    var touchClassIndex = e.currentTarget.dataset.idx;
    var childInfo = this.data.childList[touchClassIndex];
    var childUuid = childInfo.childUuid;
    wx.navigateTo({
      url: '../controlJump/controlJump?studentUuid=' + childUuid,
    });
  },
})