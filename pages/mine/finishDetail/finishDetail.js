var LoginService = require("/../../../services/common/login.js");
var HomeworkApi = require('/../../../apis/Homework.js');
import * as echarts from '/../../../ec-canvas/echarts';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentUuid: '',
    subject: 0,
    weekIndex: 0,
    studentFinishDetail: [],
    subjectArray: ['无', '语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治', '其他'],
    subject: 0,
    startDate: '',
    endDate: '',
    ec: {
      lazyLoad: true,
    },
    ecConst: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var studentUuid = options.studentUuid;
    this.setData({
      studentUuid: studentUuid,
      startDate: getStartDate(this.data.weekIndex),
      endDate: getEndDate(this.data.weekIndex),
    });
    var loginParams = {};
    LoginService.checkLogin(loginParams);
  },

  onReady: function() {
    this.ecComponent = this.selectComponent('#finish-detail-echart');
    this.initEchart();
  },

  initEchart: function(){
    this.ecComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.chart = chart;
      return chart;
    });
  },

  getStudentFinishDetail: function(){
    var studentUuid = this.data.studentUuid;
    var subject = this.data.subject;
    var weekIndex = this.data.weekIndex;
    if(subject == 0){
      wx.showToast({
        title: "请选择科目",
        icon: 'none',
        duration: 2000,
        mask: true,
      });
      return;
    }

    var requestParams = {
      studentUuid: studentUuid,
      subject: subject,
      weekIndex: weekIndex,
      successFunc: this.setStudentFinishDetail,
    };
    HomeworkApi.getStudentFinishDetail(requestParams);
  },
  setStudentFinishDetail: function(data){
    var studentFinishDetail = data.studentDetail;
    var classDetail = data.classDetail;
    this.updateDetailEchart(studentFinishDetail, classDetail);
  },
  bindPickerChange: function (e) {
    this.setData({
      subject: e.detail.value
    })
  },
  moveLeftWeek: function(){
    var weekIndex = this.data.weekIndex;
    weekIndex++;
    this.setData({
      weekIndex: weekIndex,
      startDate: getStartDate(weekIndex),
      endDate: getEndDate(weekIndex),
    });
  },
  moveRightWeek: function(){
    var weekIndex = this.data.weekIndex;
    weekIndex--;
    if(weekIndex < 0){
      weekIndex = 0;
    }
    this.setData({
      weekIndex: weekIndex,
      startDate: getStartDate(weekIndex),
      endDate: getEndDate(weekIndex),
    });
  },
  updateDetailEchart: function (studentDetail, classDetail){
    var startTime = getStartTime(this.data.weekIndex);
    var xAxis = [];
    var seriesStudent = [];
    var seriesClass = [];
    for (var i = 0; i < 7; i++) {
      var date = new Date(startTime + i * 86400000);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      xAxis.push(month + '月' + day + '日');
      seriesStudent.push(studentDetail[i].averageTime);
      seriesClass.push(classDetail[i].averageTime);
    }
    var chart = this.data.ec;
    var option = {
      title: {
        text: '周内完成耗时统计',
        padding: [
          10,  // 上
          10, // 右
          5,  // 下
          10, // 左
        ]
      },
      tooltip: {},
      legend: {
        data: ['您的耗时', '班级平均耗时'],
        top: '20rpx',
        right: '30rpx',
      },
      xAxis: {
        name: '日期',
        nameGap: 1,
        data: xAxis,
        axisLabel: { interval: 0, rotate: 45 },
        axisTick: { interval: 0, alignWithLabel: true },
      },
      yAxis: {
        name: '耗时,分钟',
        nameGap: 10,
      },
      series: [
        {
          name: '您的耗时',
          type: 'line',
          data: seriesStudent
        },
        {
          name: '班级平均耗时',
          type: 'line',
          data: seriesClass
        },
      ]
    };
    this.chart.setOption(option);
  },
})

function getStartDate(weekIndex){
  var nowDate = new Date();
  var nowDay = nowDate.getDay();
  var nowTime = nowDate.getTime();
  var startTime = (nowTime - (nowDay - 1) * 86400000) - (weekIndex * 7 * 86400000);
  var startDate = new Date(startTime);
  var startYear = startDate.getFullYear();
  var startMonth = startDate.getMonth() + 1;
  var startDay = startDate.getDate();
  return startYear + '年' + startMonth + '月' + startDay + '日';
}

function getEndDate(weekIndex){
  var nowDate = new Date();
  var nowDay = nowDate.getDay();
  var nowTime = nowDate.getTime();
  var endTime = (nowTime + (7 - nowDay) * 86400000) - (weekIndex * 7 * 86400000);
  var endDate = new Date(endTime);
  var endYear = endDate.getFullYear();
  var endMonth = endDate.getMonth() + 1;
  var endDay = endDate.getDate();
  return endYear + '年' + endMonth + '月' + endDay + '日';
}

function getStartTime(weekIndex) {
  var nowDate = new Date();
  var nowDay = nowDate.getDay();
  var nowTime = nowDate.getTime();
  var startTime = (nowTime - (nowDay - 1) * 86400000) - (weekIndex * 7 * 86400000);
  var startDate = new Date(startTime);
  var startYear = startDate.getFullYear();
  var startMonth = startDate.getMonth() + 1;
  var startDay = startDate.getDate();
  return +new Date(startYear + '/' + startMonth + '/' + startDay);
}

function getEndTime(weekIndex) {
  var nowDate = new Date();
  var nowDay = nowDate.getDay();
  var nowTime = nowDate.getTime();
  var endTime = (nowTime + (7 - nowDay) * 86400000) - (weekIndex * 7 * 86400000);
  var endDate = new Date(endTime);
  var endYear = endDate.getFullYear();
  var endMonth = endDate.getMonth() + 1;
  var endDay = endDate.getDate();
  return +new Date(endYear + '/' + endMonth + '/' + endDay);
}