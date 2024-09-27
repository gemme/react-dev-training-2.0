import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export function Redux() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch({
            type: 'INCREMENT'
          })}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch({
            type: 'DECREMENT'
          })}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}