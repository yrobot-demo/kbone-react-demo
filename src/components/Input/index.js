import React, { useState, useEffect, useRef } from 'react'
import './index.less'

const WXInput = ({ class: className, onChange = () => {}, ...props }) => {
  const input = useRef()
  useEffect(() => {
    // input.current.addEventListener('input', onChange)
    return () => {
      // input.current.removeEventListener('input', onChange)
    }
  }, [input.current])
  return (
    <input
      {...props}
      onChange={e => onChange(e.target.value)}
      // placeholder={props.placeholder}
      password={!!props.password ? 'true' : ''} // 必须传入string表示true
      // type={props.type}
      // value={props.value}
      className={'whale-input ' + (className || '')}
      placeholder-class="whale-input-placeholder"
      ref={input}
    />
  )
}

const Input = props => {
  return <WXInput {...props} />
}

export default Input
