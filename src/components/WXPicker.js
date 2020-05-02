import React, { useEffect, useRef } from 'react'

const WXPicker = ({ children, onChange = () => {}, value, range, key }) => {
  const picker = useRef()
  // kbone 的辣鸡监听不到组件onChange事件，只能用addEventListener做
  useEffect(() => {
    picker.current.addEventListener('change', onChange)
    return () => {
      picker.current.removeEventListener('change', onChange)
    }
  }, [picker.current])
  return (
    <wx-picker ref={picker} value={value} range={range} key={key}>
      {children}
    </wx-picker>
  )
}

export default WXPicker
