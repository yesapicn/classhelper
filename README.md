# 项目介绍
方同学的毕业设计做的是一个基于果创后端云的答题微信小程序，除了正常的出题、答题功能，还有echart饼状图显示答题情况、地理位置授权获取用户经纬度、动态放大轮播图等功能。

# 快速部署指南

## 打开微信公众平台配置域名
下载好源码之后需配置服务器域名

+ 登录微信公众号平台https://mp.weixin.qq.com/

+ 设置 - 开发设置 - 服务器域名，修改request合法域名，修改为自己的果创云域名（如：https://hn216.api.okayapi.com/，注意加https后面的s）

+ 开发 - 开发设置 - 开发者ID，获取AppID与AppSecret用于待会的程序部署（出于安全考虑，AppSecret不再被明文保存）


## 登录果创后端云平台http://open.yesapi.cn（TODO：需要知道建表）

## 使用微信开发者工具打开源码，并修改源码/pages/login/login.js文件里面第31行与第74行的appid和secret，换成自己微信开发者工具的AppID和AppSecret
## 修改根目录/app.js第84，85，86行的yesApiHost，yesApiAppKey，yesApiAppSecret，换成自己在果创云后端的域名等参数

# 快速使用指南

## 该系统登录后，如该用户未曾绑定姓名，会跳到绑定信息页面进行绑定操作。
## 出题操作点击首页右上角加号进行表单填写，填写后会返回题号。
## 答题操作需要用户将返回的题号输入到搜索框进行搜索，答题时会有modal确认框和地理位置授权操作。
## 出题者可在 我的 - 出题记录 查看出题记录与答题情况饼状图。

# 运行效果

![](http://cdn7.okayapi.com/yesyesapi_20200530163951_7656031bf98443c5fc7e9b1406d1ca8f.jpg)  

![](http://cdn7.okayapi.com/yesyesapi_20200530164042_63170d7079a8b9ff77c900dd3b2fa4a7.jpeg)  

