import './app.less'

import AnalysysAgent from 'ans-wechat-sdk'

AnalysysAgent.debugMode = 1
AnalysysAgent.appkey = '77a52s552c892bn442v721' //APPKEY
AnalysysAgent.uploadURL = 'https://alivia.develop.meetwhale.com/graphql'
AnalysysAgent.autoShare = true

App({
  onLaunch(options) {},
  onShow(options) {
    // // 获取当前页面实例
    // const currentPage = getCurrentPage()
    // // 获取当前页面的 window 对象和 document 对象
    // if (currentPage) {
    //   console.log(currentPage.window)
    //   console.log(currentPage.document)
    // }
  },
  onHide() {},
  onError(err) {},
  onPageNotFound(options) {},

  systemInfo: wx.getSystemInfoSync(),
})
