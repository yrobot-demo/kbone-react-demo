import { createStore } from 'redux'
import { useSelector, shallowEqual } from 'react-redux'

const INIT_STATE = {
  todos: []
}

const doState = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: state.todos.concat([action.todo])
      }
    default:
      return state
  }
}

if (!window.$$global) {
  window.$$global = {}
}

window.$$global.store =
  window.$$global.store || createStore(doState, INIT_STATE)

export const store = window.$$global.store

export const useShallowEqualSelector = selector =>
  useSelector(selector, shallowEqual)
