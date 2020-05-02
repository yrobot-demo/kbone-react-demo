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

const suitCanvasEvent = canvas => {
  // canvas.addEventListener('canvastouchstart', e => {
  //   console.log('canvastouchstart')
  //   canvas.dispatchEvent('mousedown', wrapEvent(e))
  // })
  // canvas.addEventListener('canvastouchmove', e => {
  //   console.log('canvastouchmove')
  //   canvas.dispatchEvent('mousemove', wrapEvent(e))
  // })
  // canvas.addEventListener('canvastouchend', e => {
  //   console.log('canvastouchend')
  //   canvas.dispatchEvent('mouseup', wrapEvent(e))
  // })
  canvas.addEventListener('canvasError', e => {
    console.log('canvasError')
    console.error(e)
  })
  canvas.addEventListener('canvaserror', e => {
    console.log('canvaserror')
    console.error(e)
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

  const myCanvas = useRef({})
  useEffect(() => {
    if (myCanvas.current && !loading) {
      document
        .getElementById(id)
        .$$prepare()
        .then(domNode => {
          myCanvas.current.$$prepare().then(canvas => {
            // const ctx = domNode.getContext('2d')
            // ctx.scale(pixelRatio, pixelRatio)
            // const { pixelRatio } = wx.getSystemInfoSync()
            F2.Global.pixelRatio = 1
            F2.Global.fontFamily = 'sans-serif'
            const chart = new F2.Chart({
              id: id,
              width: width,
              height: height
              // ...F2Config
            })
            doChart(chart)
            if (chart) {
              suitCanvasEvent(chart.get('el'))
            }
          })
        })
    }
  }, [myCanvas.current, loading])

  return (
    <div className="my-chart">
      <canvas
        type="2d"
        style={{ width: width + 'px', height: height + 'px' }}
        width={width}
        height={height}
        // width={width * pixelRatio}
        // height={height * pixelRatio}
        id={id}
        canvas-id={id}
        ref={myCanvas}
        onError={e => {
          console.error(e)
        }}
      />
    </div>
  )
}

export default MyChart
