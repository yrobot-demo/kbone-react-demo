import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import createPage from '@/utils/pageBase'

const Page = () => {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos) || []
  return useMemo(
    () => (
      <div
        style={{
          height: '100px',
          lineHeight: '100px',
          textAlign: 'center',
          color: '#fff',
          backgroundColor: '#E03131'
        }}
        onClick={() => {
          dispatch({
            type: 'ADD_TODO',
            todo: new Date().format('yyyy-MM-dd HH:mm:ss')
          })
        }}
      >
        Add(count:{todos.length})
      </div>
    ),
    [todos]
  )
}

export default createPage(<Page />)
