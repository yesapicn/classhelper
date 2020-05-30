
import * as utils from '../../utils/util.js';

let yesapi = require('../../utils/yesapi.js');

Page({
  data: {
    addflag: true,  //判断是否显示搜索框右侧部分
    addimg: '../../resource/images/activity_add.png',
    searchstr: '',
    secondSwiperIndex: 0,
    isBind:false,//是否绑定学号姓名

    secondSwiperData: [
      '../../resource/images/swiperSec.png',
      '../../resource/images/swiperFirst.png',
      '../../resource/images/scnu.png',
    ],
  },
  onLoad() {
//检测是否绑定学号、姓名
    this.checkUserNameAndNum()
  },
  onShow() {

  },

  tap(e) {

  },

  // 搜索框右侧 事件
  addhandle() {
    wx.navigateTo({
      url: "/pages/addQues/addQues"
    })
  },

  //搜索框输入时触发
  searchList(ev) {
    let e = ev.detail;
    this.setData({
      searchstr: e.detail.value
    })
  },
  //搜索回调
  endsearchList(e) {
    let strId = this.data.searchstr
    strId = strId.substring(9)//去除前缀
    wx.navigateTo({
      url: "/pages/answer/answer?id=" + strId
    })
  },
  // 取消搜索
  cancelsearch() {
    this.setData({
      searchstr: ''
    })
  },
  //检测openid是否绑定用户名和学号
  checkUserNameAndNum() {
    let params = {
      s: "App.Table.FreeQuery", // 必须，待请求的接口服务名称
      model_name: "classhelperUser",
      where: "[[\"openId\",\"=\",\"" + getApp().globalData.openid + "\"]]",
    };
    
    console.log(getApp().globalData.openid)
    //插入登录的用户的相关信息到数据库
    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),
      success: function (res) {
        let user = res.data.data.list[0]
        getApp().globalData.username     = user.username
        getApp().globalData.schoolNumber = user.schoolNumber
        if (user.username == "" || user.schoolNumber == "") {
          wx.showToast({
            title: "请绑定姓名",
          })

          setTimeout(function () {
            wx.navigateTo({
              url: "/pages/mine/bind/bind"
            })
          }, 1000);
        }
      },
      fail: function (err) {
        console.log('error', err);
      }
    });
  },
  //清空搜索框
  activity_clear(e) {

    this.setData({
      searchstr: ''
    })
  },
  secondSwiperChange(e) {
    const that = this;
    that.setData({
      secondSwiperIndex: e.detail.current,
    })
  },


})