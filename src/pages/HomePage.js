import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import createPage from '@/utils/pageBase'


const GET_GREETING = gql`
  query getGreeting($language: String!) {
    greeting(language: $language) {
      message
    }
  }
`

const Page = () => {
  const result = useQuery(GET_GREETING, {
    variables: { language: 'english' }
  })

  console.log(result)

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
