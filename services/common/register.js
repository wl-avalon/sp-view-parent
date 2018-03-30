var PassportApi = require("/../../apis/PassportApi.js");

var register = function () {
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: function (userData) { getInitUserInfoSuccess(userData, res.code); },
          fail: registerFailed,
        });
      } else {
        registerFailed();
      }
    },
    fail: function () {
      registerFailed();
    }
  })
}

function getInitUserInfoSuccess(successData, code){
  var userData = {
    encryptedData: successData.encryptedData,
    iv: successData.iv,
    rawData: successData.rawData,
    signature: successData.signature,
    userInfo: successData.userInfo,
  };
  PassportApi.register(code, userData, registerSuccess, registerFailed);
}

function registerSuccess(accessToken, memberID) {
  wx.setStorageSync('accessToken', accessToken);
  wx.setStorageSync('memberID', memberID);
  wx.setStorageSync('isLogin', true);
  wx.showToast({
    title: "注册成功",
    icon: 'success',
    duration: 2000,
    mask: true,
    success: function () {
      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/mine/index/index',
        });
      }, 2000);
    }
  });
}

function registerFailed() {
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

module.exports.register = register;