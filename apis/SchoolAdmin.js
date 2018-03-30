var uriConst = require('/../consts/request/uriConst.js');
var domain = require('/../consts/request/domain.js');
var CommonApi = require('/CommonApi.js');

var getStudentOfClass = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.GET_STUDENT_OF_CLASS;
  var postData = {
    'classUuid': params.classUuid,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

var bindStudentToParent = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.BIND_CHILD_TO_PARENT;
  var postData = {
    'childUuid': params.childUuid,
    'relation': params.relation,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

var getChildList = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.GET_CHILD_LIST;
  var postData = {};
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

module.exports.getStudentOfClass = getStudentOfClass;
module.exports.bindStudentToParent = bindStudentToParent;
module.exports.getChildList = getChildList;