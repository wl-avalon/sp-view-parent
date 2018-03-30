var SchoolAdminApi = require('/../../../apis/SchoolAdmin.js');
var LoginService = require("/../../../services/common/login.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classUuid: '',
    selectedIndex: 0,
    studentList: [],
    studentNameList: [],
    studentListCount: 0,
    relationList: ['无', '爸爸', '妈妈', '姥姥', '姥爷', '爷爷', '奶奶'],
    selectedRelationIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    LoginService.checkLogin();
    var classUuid = options.clasUuid;
    classUuid = '845373327512956931';
    this.setData({
      classUuid: classUuid,
    });
  },

  onShow: function(){
    var inputParams = {
      classUuid: this.data.classUuid,
      successFunc: this.getStudentListSuccess,
      failedFunc: this.getStudentListFailed,
    };
    SchoolAdminApi.getStudentOfClass(inputParams);
  },

  getStudentListSuccess: function (data) {
    var studentList = data.studentList;
    studentList.unshift({
      'studentUuid': 0,
      'studentName': '无',
    });
    var studentNameList = [];
    for (var i = 0; i < studentList.length; i++){
      studentNameList.push(studentList[i].studentName);
    }
    this.setData({
      studentList: studentList,
      studentNameList: studentNameList,
      studentListCount: studentList.length,
    });
  },
  getStudentListFailed: function () {
    wx.showToast({
      title: "网络繁忙，请稍后再试",
      icon: 'none',
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
  },
  bindPickerChange: function (e) {
    this.setData({
      selectedIndex: e.detail.value
    })
  },
  bindRelationPickerChange: function (e) {
    this.setData({
      selectedRelationIndex: e.detail.value
    })
  },
  bindChild: function(){
    var selectedChild = this.data.studentList[this.data.selectedIndex];
    if(selectedChild === undefined || selectedChild.studentUuid == 0){
      wx.showToast({
        title: "请选择儿女姓名",
        icon: 'none',
        duration: 2000,
        mask: true,
      });
      return;
    }
    if (this.data.selectedRelationIndex === undefined || this.data.selectedRelationIndex == 0) {
      wx.showToast({
        title: "请选择亲属关系",
        icon: 'none',
        duration: 2000,
        mask: true,
      });
      return;
    }
    var studentUuid = selectedChild.studentUuid;
    var selectedRelationIndex = this.data.selectedRelationIndex;

    var bindParams = {
      childUuid: studentUuid,
      relation: selectedRelationIndex,
      successFunc: bindSuccess,
      failedFunc: bindFailed,
    };
    SchoolAdminApi.bindStudentToParent(bindParams);
  }
})

function bindSuccess(){
  wx.showToast({
    title: "成功",
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

function bindFailed(){
  wx.showToast({
    title: "绑定失败，请稍后重试",
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