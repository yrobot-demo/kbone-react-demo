import React from 'react'
import './index.less'
const toC = name => (name ? ' ' + name : '')

const Icon = ({ type, class: className, ...props }) => {
  // console.log(`iconfont${toC(type)}${toC(className)}`)
  return <span className={`iconfont${toC(type)}${toC(className)}`} {...props} />
}

export default Icon
