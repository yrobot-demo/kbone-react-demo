import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import createPage from '@/utils/pageBase'

const GET_NAME = gql`
  query getName($firstName: String, $lastName: String) {
    name
  }
`

const Page = () => {
  const result = useQuery(GET_NAME, {
    variables: { firstName: 'Yang', lastName: 'Robot' }
  })

  console.log('data', result.data)

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
    </div>
  )
}

export default createPage(<Page />)
