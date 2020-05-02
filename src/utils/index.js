import React, { useState, useEffect } from 'react'
// import lodashGet from 'lodash.get'

export const getCurrentPage = () => {
  const pages = getCurrentPages() || []
  return pages[pages.length - 1]
}

/**
 * @description 将promise结束时，将数据传给子组件，类似于apollo-Query
 * @param {*} {
 * children, // 子组件
 * promise, // 要处理的promise
 * defaultConfig = {} //设置默认的loading和data
 * }
 */
export const PromiseView = ({
  children,
  promiseFunc,
  defaultConfig = {},
  skip = false,
  onComplete = () => {}
}) => {
  const config = { data: {}, loading: true } // 默认配置
  const { data, loading } = { ...config, ...defaultConfig }
  const [load, setload] = useState(loading)
  const [state, setState] = useState(data)

  const doQuery = (props = {}) => {
    if (promiseFunc) {
      promiseFunc(props).then(data => {
        setState(data)
        onComplete(data)
        setload(false)
      })
    } else {
      console.error(`PromiseView必须传入promiseFunc`)
      setload(false)
    }
  }

  useEffect(() => {
    if (!skip) doQuery()
  }, [])

  return children({
    loading: load,
    data: state,
    refresh: props => {
      setload(true)
      doQuery(props)
    }
  })
}

const wait = (doFunc, checkFunc, resolve, reject) => {
  if (checkFunc()) {
    resolve(doFunc())
  } else {
    console.log('wait 200ms')
    setTimeout(() => {
      wait(doFunc, checkFunc, resolve, reject)
    }, 200)
  }
}
/**
 * @description 当checkFunc返回true后执行doFunc
 * @param
 * doFunc // 符合条件后要执行的函数
 * checkFunc // 判断条件函数
 */
export const waitUntil = ({ doFunc = () => {}, checkFunc = () => true }) => {
  return new Promise((resolve, reject) => {
    wait(doFunc, checkFunc, resolve, reject)
  }).catch(err => {
    console.error(err)
  })
}

export const tryPageBack = path => {
  const pages = getCurrentPages() || []
  if (pages.length === 1) {
    //路由栈只有当前页
    window.redirectTo(path)
  } else {
    //当前页可以后退
    window.navigateBack()
  }
}

/**
 * @description 在组件中监听页面事件，在组件毁灭之前remove事件监听
 * @param {*} type 事件类型：String
 * @param {*} func 事件函数
 */
export const usePageListner = (type, func) => {
  useEffect(() => {
    window.addEventListener(type, func)
    return () => {
      window.removeEventListener(type, func)
    }
  }, [])
}

/**
 * @description 获取url中的的query数据
 * @param {*} key query的key
 */
export const getQueryVariable = key => {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == key) {
      return pair[1]
    }
  }
  return undefined
}
