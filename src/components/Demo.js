import React, { useContext, useState } from 'react'
import { StoreContext } from '@/store'

const Demo = () => {
  const {store, dispatch} = useContext(StoreContext)
  return 'Demo' + store.count
}
export default Demo
