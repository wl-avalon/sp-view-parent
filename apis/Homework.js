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

var getChildHomeworkBrief = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.GET_CHILD_HOMEWORK_BRIEF;
  var postData = {
    childUuid: params.childUuid,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

var finishHomework = function (params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.FINISH_HOMEWORK;
  var postData = {
    childUuid: params.childUuid,
    homeworkUuid: params.homeworkUuid,
    minutes: params.minutes,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

var getStudentFinishDetail = function(params) {
  var url = domain.STUDY_PALACE_HOST + uriConst.GET_STUDENT_FINISH_DETAIL;
  var postData = {
    studentUuid: params.studentUuid,
    weekIndex: params.weekIndex,
    subject: params.subject,
  };
  CommonApi.requestPost(url, postData, params.successFunc, params.failedFunc);
}

module.exports.finishHomework = finishHomework;
module.exports.getChildHomeworkBrief = getChildHomeworkBrief;
module.exports.getStudentFinishDetail = getStudentFinishDetail;