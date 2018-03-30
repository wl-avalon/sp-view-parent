var LoginService = require("/../../../services/common/login.js");
var SchoolAdminApi = require('/../../../apis/SchoolAdmin.js');

Page({
  data: {
    userIcon: '',
    userName: '',
    classList: {},
  },

  onLoad: function(options){
    var loginParams = {
      successFunc: this.loginSuccess,
    };
    LoginService.checkLogin(loginParams);

    var getParams = {
      successFunc: this.setChildList,
    };
    SchoolAdminApi.getChildList(getParams);
  },
  setChildList: function (data) {
    console.log(data);
    var childList = data.childList;
    if (childList === undefined) {
      childList = [];
    }
    this.setData({
      childList: childList,
    });
  }
});