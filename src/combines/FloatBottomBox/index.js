import React, { useState, useEffect, useContext } from 'react'
import { ConfigPromiseView } from '@/utils'
import WXButton from '@/components/WXButton'
import './index.less'

const SubscribeButton = ({ data = {}, type }) => {
  const { title, tmplIds = [] } = data
  return (
    <div
      className="float-botton"
      eventTrack={JSON.stringify({ subscribeType: type })}
      onClick={() => {
        wx.requestSubscribeMessage({
          tmplIds,
          success: e => {
            // console.log(e)
          },
          fail: e => {
            console.log(e)
          }
        })
      }}
    >
      {title}
    </div>
  )
}
const ShareButton = ({ data = {}, type }) => {
  const { title, onShareAppMessage = {} } = data
  window.onShareAppMessage = () => ({
    ...(window.shareAppData || {}),
    ...onShareAppMessage
  })
  return (
    <div
      className="float-botton"
      eventTrack={JSON.stringify({ subscribeType: type })}
    >
      {title}
      <WXButton open-type="share" />
    </div>
  )
}

const ImageButton = ({ data = {}, type }) => {
  const { title, url } = data
  const openIMG = () => {
    wx.previewImage({
      current: url,
      urls: [url]
    })
  }
  return (
    <div
      className="float-botton"
      onClick={() => {
        openIMG()
      }}
      eventTrack={JSON.stringify({ subscribeType: type })}
    >
      {title}
    </div>
  )
}

const FloatBottomBox = () => {
  const path = window.location.pathname
  return (
    <ConfigPromiseView path={`${path}.FloatBottomBox`}>
      {({ data: { visible = [], ...buttons }, loading }) =>
        visible.length > 0 ? (
          <div className="float-bottom-box">
            <div className="float-botton-area">
              {visible.map(type => {
                let Button = <div></div>
                switch (type) {
                  case 'share':
                    Button = ShareButton
                    break
                  case 'img':
                    Button = ImageButton
                    break
                  default:
                    Button = SubscribeButton
                    break
                }
                return <Button data={buttons[type]} type={type} />
              })}
            </div>
          </div>
        ) : (
          <div />
        )
      }
    </ConfigPromiseView>
  )
}

export default FloatBottomBox
