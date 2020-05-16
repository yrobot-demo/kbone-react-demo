import F2 from '@antv/f2'
import React, { useEffect, useRef, useState } from 'react'
import './index.less'

function wrapEvent(e) {
  if (!e) return
  if (!e.preventDefault) {
    e.preventDefault = function() {}
  }
  return e
}

const suitCanvasEvent = (canvas, el) => {
  canvas.addEventListener('canvastouchstart', e => {
    el.dispatchEvent('touchstart', wrapEvent(e))
  })
  canvas.addEventListener('canvastouchmove', e => {
    el.dispatchEvent('touchmove', wrapEvent(e))
  })
  canvas.addEventListener('canvastouchend', e => {
    el.dispatchEvent('touchend', wrapEvent(e))
  })
}

const MyChart = ({
  id = new Date().getTime(),
  F2Config = {},
  loading = true,
  doChart = chart => {}
}) => {
  const { screenWidth, screenHeight, pixelRatio } = getApp().systemInfo
  // const width = (screenWidth * 345) / 375
  const width = (screenWidth * 375) / 375
  const height = (screenWidth * 250) / 375

  useEffect(() => {
    if (!loading) {
      document
        .getElementById(id)
        .$$prepare()
        .then(domNode => {
          domNode.width = width * pixelRatio
          domNode.height = height * pixelRatio
          const context = domNode.getContext('2d')
          context.scale(pixelRatio, pixelRatio)

          F2.Global.pixelRatio = 1
          F2.Global.fontFamily = 'sans-serif'
          const chart = new F2.Chart({
            context,
            width: width,
            height: height
            // ...F2Config
          })
          doChart(chart)
          suitCanvasEvent(domNode, chart.get('el'))
        })
    }
  }, [loading])

  return (
    <div className="my-chart">
      <canvas
        type="2d"
        style={{ width: width + 'px', height: height + 'px' }}
        id={id}
        canvas-id={id}
      />
    </div>
  )
}

export default MyChart
