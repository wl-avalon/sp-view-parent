var PassportApi = require("/../../apis/PassportApi.js");

var login = function (params) {
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: function (userData) { getInitUserInfoSuccess(userData, res.code, params.successFunc); },
          fail: function () { loginFailed(loginFailedReal); },
        });
      } else {
        loginFailed(loginFailedReal);
      }
    },
    fail: function () {
      loginFailed(loginFailedReal);
    }
  })
}
function getInitUserInfoSuccess(successData, code, successFunc) {
  var userData = {
    encryptedData: successData.encryptedData,
    iv: successData.iv,
    rawData: successData.rawData,
    signature: successData.signature,
    userInfo: successData.userInfo,
  };
  PassportApi.login(
    code,
    userData,
    function (response) { loginSuccess(response, successFunc) },
    function () { loginFailed(); }
  );
}

function loginSuccess(response, successFunc) {
  var returnCode = response.error.returnCode;
  var data = response.data;
  if (returnCode == 0 && data.accessToken && data.memberID) {
    wx.setStorageSync('accessToken', data.accessToken);
    wx.setStorageSync('memberID', data.memberID);
    wx.setStorageSync('isLogin', true);
    if (successFunc !== undefined) {
      successFunc();
    }
  } else {
    loginFailed();
  }
}

function loginFailed() {
  wx.removeStorageSync('accessToken');
  wx.removeStorageSync('memberID');
  wx.removeStorageSync('isLogin');
  wx.showToast({
    title: "网络繁忙,请稍后再试",
    icon: 'none',
    duration: 2000,
    mask: true,
  });
}

var checkLogin = function (params) {
  var isLogin = wx.getStorageSync('isLogin');
  if (!isLogin) {
    login(params);
  } else {
    if (params !== undefined && params.successFunc !== undefined) {
      params.successFunc();
    }
  }
}

module.exports.login = login;
module.exports.checkLogin = checkLogin;