
import * as utils from '../../utils/util.js';

let yesapi = require('../../utils/yesapi.js');

Page({
  formSubmit: function (e) {
    //在绑定前判断表单内容
    let form = e.detail.value
    //@1先判定题目
    if (form.title == '') {
      wx.showToast({
        title: "请输入题目",
      })

      //@2再判定选项
    } else if (form.answerA == "") {
      wx.showToast({
        title: "请输入选项A",
      })
    } else if (form.answerB == "") {
      wx.showToast({
        title: "请输入选项B",
      })
    } else if (form.answerC == "") {
      wx.showToast({
        title: "请输入选项C",
      })
    } else if (form.answerD == "") {
      wx.showToast({
        title: "请输入选项D",
      })
    } else if (form.answer == "") {
      wx.showToast({
        title: "请输入正确答案",
      })
    } else {
      let params = {
        s: "App.Table.Create", // 必须，待请求的接口服务名称
        model_name: "classhelperQuestion",
        data: "{\"title\": \"" + form.title +
          "\",\"answerA\": \"" + form.answerA +
          "\",\"answerB\": \"" + form.answerB +
          "\",\"answerC\": \"" + form.answerC +
          "\",\"answerD\": \"" + form.answerD +
          "\",\"answer\": \""  + form.answer +
          "\",\"openId\": \""  + getApp().globalData.openid +
          "\"}",
      };
      let prefix = getApp().globalData.prefix
      //插入登录的用户的相关信息到数据库
      wx.request({
        header: utils.requestHeader(),
        url: getApp().globalData.yesApiHost,
        data: yesapi.enryptData(params),
        success: function (res) {
          console.log(res)
          wx.showModal({
            title: "您的题号为" + prefix + res.data.data.id,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                })
              }, 500);
            }
          })
        },
        fail: function (err) {
          console.log('error', err);
        }
      });
    }

  },
})