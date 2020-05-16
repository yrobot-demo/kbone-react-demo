import React, { useState } from 'react'
import MyChart from '@/components/MyChart'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import createPage from '@/utils/pageBase'

const doChart = chart => {
  const data = [
    { shop: '家乐福-VS-成都大世界316', name: '货架日均客流', value: 517 },
    {
      shop: '家乐福-VS-成都大世界316',
      name: '七天前货架日均客流',
      value: 1116
    },
    { shop: '家乐福-VS-昆明白云店318', name: '货架日均客流', value: 459 },
    {
      shop: '家乐福-VS-昆明白云店318',
      name: '七天前货架日均客流',
      value: 733
    },
    { shop: '家乐福-VS-深圳新洲店222', name: '货架日均客流', value: 257 },
    {
      shop: '家乐福-VS-深圳新洲店222',
      name: '七天前货架日均客流',
      value: 1068
    },
    { shop: '大润发-PNT-苏州东环店', name: '货架日均客流', value: 244 },
    { shop: '大润发-PNT-苏州东环店', name: '七天前货架日均客流', value: 565 },
    { shop: '大润发-PNT-上海大宁店', name: '货架日均客流', value: 230 },
    { shop: '大润发-PNT-上海大宁店', name: '七天前货架日均客流', value: 651 }
  ]
  chart.source(data)
  chart.scale('shop', {
    formatter(text) {
      return text.length > 10
        ? '...' + text.substr(text.length - 10, text.length)
        : text
    }
  })
  chart.scale('value', {
    formatter: v => parseFloat(v)
  })
  chart.axis('value', {
    label: function label(text, index, total) {
      const textCfg = {}
      if (index === 0) {
        textCfg.textAlign = 'left'
      } else if (index === total - 1) {
        textCfg.textAlign = 'right'
      }
      return textCfg
    }
  })
  chart.coord({
    transposed: true
  })

  chart
    .interval()
    .position('shop*value')
    .color('name')
    .adjust({
      type: 'dodge',
      marginRatio: 0.05 // 设置分组间柱子的间距
    })
  chart.render()
}

const Page = () => {
  const todos = useSelector(state => state.todos) || []
  return (
    <div>
      <div>todos:</div>
      {todos.map(v => (
        <div
          style={{
            marginTop: '10rpx'
          }}
        >
          {v}
        </div>
      ))}
      <div
        style={{
          marginTop: '100rpx'
        }}
        onClick={() => {
          window.navigateTo('/ShowUrlPage')
        }}
      >
        to addPage
      </div>
      <MyChart doChart={doChart} id={'datagraphscflowest'} loading={false} />
    </div>
  )
}

export default createPage(<Page />)
