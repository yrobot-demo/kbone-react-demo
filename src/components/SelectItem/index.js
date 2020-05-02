import React, { useState, useEffect, useContext } from 'react'
import WXPicker from '@/components/WXPicker'
import Icon from '@/components/Icon'
import './index.less'

const SelectItem = ({
  list = [],
  value,
  onChange = () => {},
  placeholder = '请选择'
}) => {
  return (
    <WXPicker
      onChange={e => {
        onChange(list[e.detail.value])
      }}
      value={value ? list.indexOf(value) : 0}
      range={list}
      key={value}
    >
      <div className="select-item">
        {value ? (
          <span>{value}</span>
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}
        <Icon type="iconcommon_arrowright" className="right-icon" />
      </div>
    </WXPicker>
  )
}

export default SelectItem
