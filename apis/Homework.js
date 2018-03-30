var uriConst = require('/../consts/request/uriConst.js');
var domain = require('/../consts/request/domain.js');
var CommonApi = require('/CommonApi.js');

var commitHomework = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.COMMIT_TODAY_HOMEWORK;
  var postData = {
    subject: params.subject,
    homeworkList: JSON.stringify(params.homeworkList),
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

module.exports.commitHomework = commitHomework;