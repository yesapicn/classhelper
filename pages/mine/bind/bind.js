
import * as utils from '../../../utils/util.js';

let yesapi = require('../../../utils/yesapi.js');

Page({
  formSubmit: function (e) {
    //在绑定前判断表单内容
    let form = e.detail.value
    //@1先判定姓名
    if (form.username == ''){
      wx.showToast({
        title: "请输入姓名",
      })

    //@2再判定学号
    } else if (!form.switch && form.schoolNumber == ""){
      wx.showToast({
        title: "请输入学号",
      })
    } else{
        //@3更新数据库 老师账号默认学号910
        if(form.schoolNumber == ""){
          form.schoolNumber = 910;
        }
        getApp().globalData.username = form.username
        getApp().globalData.schoolNumber = form.schoolNumber
        let params = {
          s: "App.Table.FreeUpdate", // 必须，待请求的接口服务名称
          model_name: "classhelperUser",
          where: "[[\"openId\",\"=\",\"" + getApp().globalData.openid + "\"]]",
          data: "{\"username\": \"" + form.username +
            "\",\"schoolNumber\": \"" + form.schoolNumber +
            "\"}",
        };
        //插入登录的用户的相关信息到数据库
        wx.request({
          header: utils.requestHeader(),
          url: getApp().globalData.yesApiHost,
          data: yesapi.enryptData(params),
          success: function (res) {
              wx.showToast({
                title: "绑定成功！",
              })

              setTimeout(function () {
                wx.navigateBack({
                })
              }, 1000);
          },
          fail: function (err) {
            console.log('error', err);
          }
        });
      }

  },
})