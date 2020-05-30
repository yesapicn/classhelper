// pages/shici/shici.js
var sc = require("./getPaper.js");
const app = getApp();
import * as utils from '../../utils/util.js';

let yesapi = require('../../utils/yesapi.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex: 0,
    finishedFlag: false,
    question: [],
    answers: [],
    questionId:0,
    openId:"",//老师的openId
    prefix: getApp().globalData.prefix
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData(options);
  },

  initData: function (e) {
    //一般是从服务器取；

    //获取题号的题
    let params = {
      s: "App.Table.Get", // 必须，待请求的接口服务名称
      model_name: "classhelperQuestion",
      id: e.id,
    };
    //插入登录的用户的相关信息到数据库
    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),
      success:(res)=> {
        let data = res.data.data.data
        console.log(data)
        if(!!!data){
          wx.showModal({
            title:'没有这道题哦',
            showCancel: false,
            success (res) {
              wx.navigateBack({
                complete: (res) => {
                  
                },
              })
            }
          })
        }
        var obj = [
          {
            question: { title: data.title, content: "高校师生互动系统" },
            answers: [
              { id: 0, answer: "A."+data.answerA, answerType: "primary", resultFlag: false },
              { id: 1, answer: "B."+data.answerB, answerType: "warn", resultFlag: false },
              { id: 2, answer: "C."+data.answerC, answerType: "warn", resultFlag: false },
              { id: 3, answer: "D."+data.answerD, answerType: "warn", resultFlag: false }
            ]
          },
        ];
        var answers = obj[0].answers;
        let question = obj[0].question;
        var that = this
        that.setData({
          showIndex: e.id,
          question: question,
          answers: answers,
          openId: data.openId,
        });
      },
      fail: function (err) {
        console.log('error', err);
      }
    });

  },

  //按钮点击
  handleClick: function (e) {
    var id = e.currentTarget.dataset.id;
    var at = e.currentTarget.dataset.at;
    var answer = e.currentTarget.dataset.answer;
    var item = this.getSelectAnswer(id);

    wx.showModal({
      title: '答题成功',
      content: "确认选择"+answer+"?",
      showCancel: true,
      success:(res)=> {
        if (res.confirm) {
          wx.getLocation({
            type: 'wgs84',
            success:(res)=> {
              const latitude = res.latitude
              const longitude = res.longitude
              var that = this

              let params = {
                s: "App.Table.Create", // 必须，待请求的接口服务名称
                model_name: "classhelperAnswer",
                data: "{\"latitude\": \"" + latitude +
                  "\",\"longitude\": \""  + longitude +
                  "\",\"studentOpenId\": \"" + getApp().globalData.openid +
                  "\",\"studentUserename\": \"" + getApp().globalData.username +
                  "\",\"studentSchoolNumber\": \"" + getApp().globalData.schoolNumber +
                  "\",\"answer\": \"" + answer.slice(0,1) + //todo
                  "\",\"openId\": \"" + that.data.openId + //todo
                  "\",\"questionId\": \"" + that.data.showIndex +
                  "\"}",
              };
              wx.request({
                header: utils.requestHeader(),
                url: getApp().globalData.yesApiHost,
                data: yesapi.enryptData(params),
                success: function (res) {
                  wx.showToast({
                    title: "答题成功！",
                    success: function () {
                      setTimeout(function () {
                        wx.navigateBack({
                        })
                      }, 1000);
                    }
                  })
                },
                fail: function (err) {
                  console.log('error', err);
                }
              });
            }
          })
        }
      }
    })
    // var answerResult = "回答正确";
    // if (at === "warn") {//错误答案
    //   item.resultFlag = true;
    //   answerResult = "回答错误";
    //   this.setData({
    //     failure: true
    //   });
    // } else {
    //   var that = this;
    //   var cursorIndex = that.data.cursorIndex;
    //   if (!cursorIndex) {
    //     cursorIndex = 0;
    //   }

    //   //5道题全部答对就算通过；
    //   if (cursorIndex === app.ALL_PASS_COUNT) {
    //     wx.showToast({
    //       title: '您已经通关！',
    //       icon: 'success',
    //       duration: 3000
    //     });
    //     //当修改了前端展示的数据的时候，就必须要setData一下，让数据生效
    //     this.setData({
    //       finishedFlag: true,
    //       answers: this.data.answers,
    //       answerResult: answerResult
    //     });
    //     return;
    //   }

    //   var content = this.data.question.content;
    //   wx.showModal({
    //     title: '答题成功',
    //     content: content,
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         that.setData({
    //           cursorIndex: cursorIndex + 1
    //         });
    //         that.initData();
    //       }
    //     }
    //   })
    // }
    // //当修改了前端展示的数据的时候，就必须要setData一下，让数据生效
    // this.setData({
    //   finishedFlag: true,
    //   answers: this.data.answers,
    //   answerResult: answerResult
    // });
  },

  //根据id获取选择的答案
  getSelectAnswer: function (id) {
    var tmpItem = null;
    var answers = this.data.answers;
    for (var i = 0; i < answers.length; i++) {
      var item = answers[i];
      if (item.answerType === "primary") {
        item.resultFlag = true;
      }
      if (item.id === id) {
        tmpItem = item;
      }
    }
    return tmpItem;
  },

  //重新回答
  reAnswer: function () {
    this.initData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})