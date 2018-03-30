var uriConst  = require('/../consts/request/uriConst.js');
var domain    = require('/../consts/request/domain.js');

var getRandomQuestion = function (selectedCondition, successFunc){
  var url = domain.STUDY_PALACE_HOST + uriConst.GET_ONE_RANDOM_QUESTION;
  var postData = {
    grade: selectedCondition.grade ? selectedCondition.grade : 0,
    subject: 11,//selectedCondition.subject ? selectedCondition.subject : 0,
    version: selectedCondition.version ? selectedCondition.version : 0,
    module: selectedCondition.module ? selectedCondition.module : 0,
    nodeID: selectedCondition.nodeID ? selectedCondition.nodeID : 0,
  };
  wx.request({
    url: url,
    data: postData,
    header:{
      'content-type': 'application/json'
    },
    method: "POST",
    success: function(res) {
      successFunc(res);
    }
  })
}

module.exports.getRandomQuestion = getRandomQuestion;