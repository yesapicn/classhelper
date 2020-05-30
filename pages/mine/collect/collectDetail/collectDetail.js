import S_request from '../../../../utils/requestService.js';
import * as utils from '../../../../utils/util.js';
import CONFIG from '../../../../config.js';
let yesapi = require('../../../../utils/yesapi.js')
import * as echarts from '../../../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['40%', '60%'],
      data: [{
        value: 0,
        name: 'A'
      }, {
        value: 0,
        name: 'B'
      }, {
        value: 0,
        name: 'C'
      }, {
        value: 0,
        name: 'D'
      }]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {

    ec: {
      // onInit: initChart
    },
    aNum: 0,
    bNum: 0,
    cNum: 0,
    dNum: 0,
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.getNum(options)

  },

  getNum: function(e){
    let params = {
      s: "App.Table.FreeAF", // 必须，待请求的接口服务名称
      model_name: "classhelperAnswer",
      op_fun: "COUNT",
      op_field: "answer",
      group_filed: "answer",
      where: "[[\"questionId\",\"=\",\"" + e.id + "\"]]",
    };
    //插入登录的用户的相关信息到数据库
    wx.request({
      header: utils.requestHeader(),
      url: getApp().globalData.yesApiHost,
      data: yesapi.enryptData(params),
      success: (res) => {
        console.log(res.data.data.items)
        let items = res.data.data.items
        let aNum,bNum,cNum,dNum = 0;
        items.forEach((item, index, array) => {
          if(item.answer == 'A'){
            aNum = item.total_num
            this.setData({
              aNum: aNum,
            });
          } else if (item.answer == 'B') {
            bNum = item.total_num
            this.setData({
              bNum: bNum,
            });
          } else if (item.answer == 'C') {
            cNum = item.total_num
            this.setData({
              cNum: cNum,
            });
          } else if (item.answer == 'D') {
            dNum = item.total_num
            this.setData({
              dNum: dNum,
            });
          }
        })
        
        this.setData({
          ec: {
            onInit:this.initData
          }
        })
      },
      fail: function (err) {
        console.log('error', err);
      }
    });
  },

  initData: function (canvas, width, height, dpr){
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

    var option = {
      backgroundColor: "#ffffff",
      color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
      series: [{
        label: {
          normal: {
            fontSize: 14
          }
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['40%', '60%'],
        data: [{
          value: this.data.aNum,
          name: 'A:' + this.data.aNum
        }, {
            value: this.data.bNum,
            name: 'B:' + this.data.bNum
        }, {
            value: this.data.cNum,
            name: 'C:' + this.data.cNum
        }, {
            value: this.data.dNum,
            name: 'D:' + this.data.dNum
        }]
      }]
    };

    chart.setOption(option);
    return chart;
  }
});
