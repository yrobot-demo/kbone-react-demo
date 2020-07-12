/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */
const path = require('path')

module.exports = {
  origin: 'Yrobot.mina-alivia',
  entry: '/HomePage',
  router: {
    HomePage: ['/HomePage'],
    // ShowUrlPage: ['/ShowUrlPage'],
  },
  redirect: {
    notFound: 'HomePage',
    accessDenied: 'HomePage',
  },
  generate: {
		projectConfig: path.join(__dirname, '../build/mp'),
    appEntry: 'miniprogram-app',
    autoBuildNpm: 'npm',
    // subpackages: {
    //   dataPackge: ['DataPage']
    // }
  },
  app: {
    navigationBarTitleText: 'navigationBarTitleText',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
  global: {
    loadingText: '加载中',
    share: false,
    rem: true,
  },
  pages: {
    HomePage: {
      pullDownRefresh: true,
      share: true,
    },
  },
  optimization: {
    domSubTreeLevel: 10,
    elementMultiplexing: true,
    textMultiplexing: true,
    commentMultiplexing: true,
    domExtendMultiplexing: true,

    styleValueReduce: 5000,
    attrValueReduce: 5000,
  },
  projectConfig: {
    projectname: 'kbone-react-cloud-demo',
    appid: 'wx4f390180f4521a34',
    miniprogramRoot: 'miniprogram/', // 小程序根目录
    cloudfunctionRoot: 'cloudfunctions/', // 云函数根目录
  },
}
