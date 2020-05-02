import { ENV, REQUEST_ENV_URLS, TOKEN_STORAGE_KEY } from '@/config'
import { freshUser, getToken } from '@/utils'

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
        Authorization: auth ? getToken() : ''
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

function setWXPageConfig() {
  try {
    getApp()
      .variable.get('global.WXPageConfig')
      .then(WXPageConfig => {
        const { common, pages } = WXPageConfig
        const path = window.location.pathname
        const config = { ...common, ...(pages[path] || {}) }
        const { navigationText, navigationColor } = config
        wx.setNavigationBarTitle({
          title: navigationText
        })
        wx.setNavigationBarColor(navigationColor)
      })
  } catch (error) {
    console.log(error)
  }
}

function AuthCheckAndFresh() {
  if (getApp().firstInApp || !getToken()) {
    freshUser()
    getApp().firstInApp = false
  }
}

const freshVariable = () => {
  getApp().variable.get('')
}

window.addEventListener('wxload', AuthCheckAndFresh)
window.addEventListener('wxload', setWXPageConfig)
window.addEventListener('wxshow', freshVariable)
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

// 最低基础库提示
function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

if (compareVersion(wx.getSystemInfoSync().SDKVersion, '2.9.0') < 0) {
  wx.showModal({
    title: '提示',
    content: '当前微信版本过低，无法使用小程序，请升级到最新微信版本后重试。'
  })
  window.redirectTo('/UpdateSDKPage')
}
