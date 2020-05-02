/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */

module.exports = {
  origin: 'Yrobot.mina-alivia',
  entry: '/HomePage',
  router: {
    HomePage: ['/HomePage'],
    ShowUrlPage: ['/ShowUrlPage'],
  },
  redirect: {
    notFound: 'HomePage',
    accessDenied: 'HomePage',
  },
  generate: {
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
    projectname: 'kbone-react-init',
    appid: 'wxe5c2e61483bc7682',
  },
}
