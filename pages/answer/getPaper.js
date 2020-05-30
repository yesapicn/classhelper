
/**
 * 诗词的服务js
 */
const app = getApp();

//根据下标获取对应的诗词
function getAnswers(index, cb) {
  if (!index) {
    index = 0;
  }

  var question = data[index].question;
  var answers = data[index].answers;
  var prefix = ["A", "B", "C", "D", "E", "F", "G"];
  answers.sort(function () {
    return 0.5 - Math.random();
  });
  for (var i in answers) {
    var item = answers[i];
    item.title = prefix[i] + ". " + item.answer;
  }
  return { question: question, answers: answers };

}

//获取服务器端数据的时候
function getDataFromServer(cb) {
  //异步请求的
  wx.request({
    url: app.REQ_SERVER + 'xcx/rest/getSc.htm',
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res.data)
      }
    }
  })
}

//服务器端的数据库（mysql）
var data = [
  {
    question: { title: "锄禾日当午", content: "锄禾日当午，汗滴禾下土，谁知盘中餐，粒粒皆辛苦" },
    answers: [
      { id: 0, answer: "汗滴禾下土", answerType: "primary", resultFlag: false },
      { id: 1, answer: "汉滴禾下土", answerType: "warn", resultFlag: false },
      { id: 2, answer: "汗滴禾吓土", answerType: "warn", resultFlag: false },
      { id: 3, answer: "汗滴禾下图", answerType: "warn", resultFlag: false },
      { id: 4, answer: "汗弟禾下图", answerType: "warn", resultFlag: false }
    ]
  },

  {
    question: { title: "床前明月光", content: "床前明月光，疑是地上霜，举头望明月，低头思故乡" },
    answers: [
      { id: 0, answer: "疑是地尚霜", answerType: "warn", resultFlag: false },
      { id: 1, answer: "疑是第尚霜", answerType: "warn", resultFlag: false },
      { id: 2, answer: "疑似地尚霜", answerType: "warn", resultFlag: false },
      { id: 3, answer: "疑是地上霜", answerType: "primary", resultFlag: false }
    ]
  },

  {
    question: { title: "白日依山尽", content: "白日依山尽，黄河入海流。欲穷千里目，更上一层楼 " },
    answers: [
      { id: 0, answer: "黄河入海流", answerType: "primary", resultFlag: false },
      { id: 1, answer: "黄水入海流", answerType: "warn", resultFlag: false },
      { id: 2, answer: "黄河入海留", answerType: "warn", resultFlag: false },
      { id: 3, answer: "皇河入海流", answerType: "warn", resultFlag: false }
    ]
  },

  {
    question: { title: "夜来风雨声", content: "春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。" },
    answers: [
      { id: 0, answer: "话落知多少", answerType: "warn", resultFlag: false },
      { id: 1, answer: "花罗知多少", answerType: "warn", resultFlag: false },
      { id: 2, answer: "花落值多少", answerType: "warn", resultFlag: false },
      { id: 3, answer: "花落知多少", answerType: "primary", resultFlag: false }
    ]
  },

  {
    question: { title: "白毛浮绿水", content: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。" },
    answers: [
      { id: 0, answer: "红章拨清波", answerType: "warn", resultFlag: false },
      { id: 1, answer: "红掌波清波", answerType: "warn", resultFlag: false },
      { id: 2, answer: "红掌拨青波", answerType: "warn", resultFlag: false },
      { id: 3, answer: "红掌拨清波", answerType: "primary", resultFlag: false }
    ]
  }

];

module.exports = {
  getAnswers: getAnswers
}
