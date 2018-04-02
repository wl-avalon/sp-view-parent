var LoginService = require("/../../../services/common/login.js");
var HomeworkApi = require('/../../../apis/Homework.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    childUuid: '',
    subjectArray: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
    notDone: [],
    hasDone: [],
    allDone: false,
    notAllDone: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var childUuid = options.childUuid;
    var loginParams = {
      successFunc: this.loginSuccess,
    };
    LoginService.checkLogin(loginParams);

    var getParams = {
      childUuid: childUuid,
      successFunc: this.setHomeworkList,
    };
    HomeworkApi.getChildHomeworkBrief(getParams);
    this.setData({
      childUuid: childUuid,
    });
  },
  setHomeworkList: function(data){
    var hasDone = [];
    for (var i = 0; i < data.hasDone.length; i++){
      hasDone.push({
        uuid: data.hasDone[i].uuid,
        subject: data.hasDone[i].subject,
        content: JSON.parse(data.hasDone[i].content)['content'],
      });
    }

    var notDone = [];
    for (var i = 0; i < data.notDone.length; i++) {
      notDone.push({
        uuid: data.notDone[i].uuid,
        subject: data.notDone[i].subject,
        content: JSON.parse(data.notDone[i].content)['content'],
      });
    }
    this.setData({
      hasDone: hasDone,
      notDone: notDone,
      allDone: notDone.length > 0 ? false : true,
      nothingDone: hasDone.length > 0 ? false : true,
    });
  },
  getHomeworkDetail: function(e){
    var idx = e.currentTarget.dataset.idx;
    var type = e.currentTarget.dataset.type;

    var homeworkList = [];
    if(type === 'notDone'){
      homeworkList = this.data.notDone;
    }else{
      homeworkList = this.data.hasDone;
    }
    var homeworkItem  = homeworkList[idx];

    if(type === 'hasDone'){
      wx.showModal({
        title: '作业内容',
        content: homeworkItem.content,
        showCancel: false,
      });
    }else{
      wx.navigateTo({
        url: '/pages/home/homeworkDetail/homeworkDetail?homeworkUuid=' + homeworkItem.uuid + '&homeworkContent=' + homeworkItem.content + '&childUuid=' + this.data.childUuid,
      })
    }
  }
})