var uriConst = require('/../consts/request/uriConst.js');
var domain = require('/../consts/request/domain.js');

var login = function (code, userData, successFunc, failedFunc) {
  var url = domain.STUDY_PALACE_HOST + uriConst.LOGIN;
  var postData = {
    code: code,
    userData: JSON.stringify(userData),
    registerFrom: 2,
  };
  wx.request({
    url: url,
    data: postData,
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    success: function (res) {
      console.log(res.data);
      var response = res.data;
      successFunc(response);
    },
    fail: failedFunc,
  })
}

var register = function (code, userData, successFunc, failedFunc) {
  var url = domain.STUDY_PALACE_HOST + uriConst.REGISTER;
  var postData = {
    code: code,
    userData: JSON.stringify(userData),
    registerFrom: 2,
  };
  wx.request({
    url: url,
    data: postData,
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    success: function (res) {
      console.log(res.data);
      var returnCode = res.data.error.returnCode;
      var data = res.data.data;
      if (returnCode == 0 && data.accessToken && data.memberID) {
        successFunc(data.accessToken, data.memberID);
      } else {
        failedFunc();
      }
    },
    fail: failedFunc,
  })
}

module.exports.login = login;
module.exports.register = register;