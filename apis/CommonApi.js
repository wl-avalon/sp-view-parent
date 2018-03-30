var loginService  = require("/../services/common/login.js");
var requestPost   = function(url, postData, successFunc, failedFunc) {
  postData.memberID     = wx.getStorageSync('memberID') + '';
  postData.accessToken  = wx.getStorageSync('accessToken') + '';
  wx.request({
    url: url,
    data: postData,
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    success: function (res) {success(res, successFunc, failedFunc);},
    fail: function (res) { failed(failedFunc); },
  })
}

function success(res, successFunc, failedFunc){
  if (res.statusCode != 200) {
    failed(failedFunc);
    return;
  }
  if (res.data.error === undefined || res.data.error.returnCode === undefined) {
    failed(failedFunc);
    return;
  }
  var error = res.data.error;
  var data  = res.data.data;
  switch(error.returnCode){
    case 403:{
      wx.removeStorageSync('accessToken');
      wx.removeStorageSync('memberID');
      wx.removeStorageSync('isLogin');
      loginService.login();
      return;
    }
    case 0:{
      successFunc(data);
      return;
    }
    default:{
      wx.showToast({
        title: error.returnUserMessage,
        icon: 'none',
        duration: 2000,
        mask: true,
      });
      return;
    }
  }
}

function failed(failedFunc){
  failedFunc();
}

module.exports.requestPost = requestPost;