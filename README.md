# mina-alivia

## 埋点

埋点逻辑位于 src/utils/pageEventListener 中  
主要逻辑是监听 document 的`click`事件，  
根据`e.target.getAttribute('eventTrack')`的数据来判断是否需要打点上报

```
  document.addEventListener('click', e => {
    const eventTrack = JSON.parse(e.target.getAttribute('eventTrack') || null)
    if (eventTrack) {
      // do something
    }
  })
```
