import React from 'react'
import './index.less'
/**
 * @description 页面的容器View，可配置顶部背景图、底部背景图
 * @param {*} {
 *   topIMG, //顶部背景图url
 *   bottomIMG, //底部背景图url
 *   minHeight = getApp().systemInfo.windowHeight,
 *   children
 * }
 */
const PageBox = ({
  topIMG,
  bottomIMG,
  minHeight = getApp().systemInfo.windowHeight,
  style = {},
  children
}) => (
  <div
    className="page-box"
    style={{
      ...style,
      minHeight: minHeight + 'px'
    }}
  >
    {topIMG && (
      <img src={topIMG} alt="topIMG" className="top-BG" mode="widthFix" />
    )}
    {bottomIMG && (
      <img
        src={bottomIMG}
        alt="bottomIMG"
        className="bottom-BG"
        mode="widthFix"
      />
    )}
    {children}
  </div>
)

export default PageBox
