let app = getApp();
import CONFIG from '../../config.js';
import * as utils from '../../utils/util.js';
let yesapi = require('../../utils/yesapi.js');

Page({
  data: {
    openid: '',
  },
  onLoad: function() {
    var that = this;
    var code = '',
      openid = '';
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({

            success: function(res) {

              //传入用户信息
              app.globalData.userInfo = res.userInfo
              wx.login({
                //获取code
                success: function(res) {
                  code = res.code //返回code

                  wx.request({
                    //换成自己的小程序的openid以及密码
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9dd79889b1348c3a&secret=6118ea3894d8b4ca1e170a063583a248&js_code=' + code + '&grant_type=authorization_code',
                    data: {},
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function(res) {
                      openid = res.data.openid //返回openid
                      app.globalData.openid = openid
                      that.setData({
                        openid: openid,
                      });
                      
                      //用户已经授权过
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    },
                    fail: function(err) {
                      console.log('error', err);
                    }
                  })
                }
              })

            }
          });
        }
      }
    })
  },

  bindGetUserInfo: function(e) {

    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      var code = '',openid='';
      wx.login({
        //获取code
        success: function(res) {
          code = res.code //返回code

          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9dd79889b1348c3a&secret=6118ea3894d8b4ca1e170a063583a248&js_code=' + code + '&grant_type=authorization_code',
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              openid = res.data.openid //返回openid

              app.globalData.openid = openid

              that.setData({
                openid: openid,
              });
              let params = {
                s: "App.Table.CheckCreate", // 必须，待请求的接口服务名称
                model_name: "classhelperUser",
                check_field: "openId",
                //Jason格式传入的写法
                data: "{\"nickName\": \"" + e.detail.userInfo.nickName + "\",\"openId\": \"" + that.data.openid + "\"}",
              };
              //插入登录的用户的相关信息到数据库
              wx.request({
                header: utils.requestHeader(),
                url: getApp().globalData.yesApiHost,
                data: yesapi.enryptData(params),
                success: function (res) {
                  console.log(that.data.openid)
                  
                //授权成功后，跳转进入小程序首页
                wx.switchTab({
                  url: '/pages/index/index'
                })
                },
                fail: function (err) {
                  console.log('error', err);
                }
              });
            },
            fail: function(err) {
              console.log('error', err);
            }
          })
        }
      })

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },


})
