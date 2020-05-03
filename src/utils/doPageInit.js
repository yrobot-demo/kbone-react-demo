import { ENV, REQUEST_ENV_URLS } from '@/config'
// import { getToken } from '@/utils'

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

// 全局注入请求
window.request = ({
  host = REQUEST_ENV_URLS[ENV],
  pathname = '',
  header = {},
  auth = true,
  ...options
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      url: host + pathname,
      header: {
        ...header,
        // Authorization: auth ? getToken() : ''
      },
      success: response => {
        resolve(response.data)
      },
      fail: reject
    })
  }).then(res => {
    const { data, errno, errmsg } = res
    if (errno != 10000) {
      wx.showToast({
        title: errmsg,
        icon: 'none',
        duration: 2000
      })
      throw new Error(errmsg)
    }
    return res
  })
}

window.addEventListener('pulldownrefresh', () => {
  setTimeout(() => {
    wx.stopPullDownRefresh()
  }, 200)
})

// 适配css rem
window.onload = function() {
  if (process.env.isMiniprogram) {
    // 小程序
    document.documentElement.style.fontSize =
      getApp().systemInfo.screenWidth / 375 + 'px'
  } else {
    // Web 端
    document.documentElement.style.fontSize =
      document.documentElement.getBoundingClientRect().width / 375 + 'px'
  }
}

// 注入跳转方式
window.navigateTo = url => {
  if (process.env.isMiniprogram) {
    // 小程序
    // const [path, search] = url.split('?')
    // wx.navigateTo({
    //   url: `/pages${path}/index${search ? '?' + search : ''}`
    // })
    window.open(window.location.origin + url)
  } else {
    // Web 端
    window.open(window.location.origin + url)
  }
}
window.redirectTo = url => {
  if (process.env.isMiniprogram) {
    // 小程序
    // const [path, search] = url.split('?')
    // wx.redirectTo({
    //   url: `/pages${path}/index${search ? '?' + search : ''}`
    // })
    window.location.href = url
  } else {
    // Web 端
    window.location.href = url
  }
}
window.navigateBack = props => {
  if (process.env.isMiniprogram) {
    // 小程序
    // wx.navigateBack(props)
    window.close()
  } else {
    // Web 端
    window.close()
  }
}

Promise.prototype.finally = function(callback) {
  let P = this.constructor

  return this.then(
    value => P.resolve(callback()).then(() => value),

    reason =>
      P.resolve(callback()).then(() => {
        throw reason
      })
  )
}

Date.prototype.format = function(fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}
