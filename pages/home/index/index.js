var LoginService = require("/../../../services/common/login.js");
var SchoolAdminApi = require('/../../../apis/SchoolAdmin.js');

Page({
  data: {
    userIcon: '',
    userName: '',
    childList: [],
  },

  onLoad: function(options){
    var loginParams = {
      successFunc: this.loginSuccess,
    };
    LoginService.checkLogin(loginParams);
  },
  loginSuccess: function(){
    var getParams = {
      successFunc: this.setChildList,
    };
    SchoolAdminApi.getChildList(getParams);
  },
  setChildList: function (data) {
    var childList = data.childList;
    if (childList === undefined) {
      childList = [];
    }
    this.setData({
      childList: childList,
    });
  },
  jumpToHomeworkList: function(e){
    var touchChlidIndex = e.currentTarget.dataset.idx;
    var childInfo = this.data.childList[touchChlidIndex];
    var childUuid = childInfo.childUuid;
    wx.navigateTo({
      url: '/pages/home/homeworkList/homeworkList?childUuid=' + childUuid,
    })
  }
});