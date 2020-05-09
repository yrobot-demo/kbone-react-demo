import { getCurrentPage, getURLQuery } from '@/utils'

const AnalysysAgent = wx.AnalysysAgent

const PAGE_INIT_TIME = new Date().getTime()
let PAGE_ONSHOW_TIME = new Date().getTime()
let PAGE_VIEW_TIME_COUNT = 0

const countPageViewTime = () => {
  PAGE_VIEW_TIME_COUNT += new Date().getTime() - PAGE_ONSHOW_TIME
}

// 覆盖易观方舟默认点数据
AnalysysAgent.appProperty({
  title: window.location.pathname,
  url: getCurrentPage().route
})

// 全局监听，触发埋点
document.addEventListener('click', e => {
  const eventTrack = JSON.parse(e.target.getAttribute('eventTrack') || null)
  if (eventTrack) {
    // do something
    const { pathname, search, hostname, href, origin } = window.location
    console.log({ pathname, search, hostname, href, origin })
    console.log(eventTrack)
  }
})

window.onShareAppMessage = function(data) {
  return AnalysysAgent.share({
    title: 'test title',
    path: window.location.pathname
  })
}

// console.log(window.location.pathname)
// console.log(getCurrentPage().route)

// 页面show
window.addEventListener('wxshow', () => {
  PAGE_ONSHOW_TIME = new Date().getTime()
})
// 页面show
window.addEventListener('wxhide', () => {
  countPageViewTime()
})
// 页面渲染完成
window.addEventListener('wxready', () => {
  AnalysysAgent.track('page_ready', {
    render_time: new Date().getTime() - PAGE_INIT_TIME
  })
})
// 页面关闭
window.addEventListener('wxunload', () => {
  countPageViewTime()
  AnalysysAgent.track('page_close', {
    view_time: PAGE_VIEW_TIME_COUNT
  })
})

/**
 * @description 根据keys打PV的点
 * @param {*} keys query的keys
 */
wx.AnalysysAgent.myPageView = (getProps = () => ({})) => {
  wx.AnalysysAgent.pageView(window.location.pathname, {
    ...getProps(getURLQuery()),
    url_search: window.location.search
  })
}
