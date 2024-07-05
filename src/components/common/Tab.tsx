'use client'

import { Reducer, useReducer } from 'react'

interface TabProps {
  labels: []
  idx: number
  children: React.ReactNode
}

export const Tab = ({ labels, idx, children }: TabProps) => {
  validateUniqueLabels(labels)
  validateLabelWithIndex(labels, idx)

  const [activeTab, dispatch] = useReducer<Reducer<number, any>>(
    (state, nextState) => {
      validateLabelWithIndex(labels, nextState)
      return nextState
    },
    idx
  )

  return (
    <>
      <div>
        <p>{activeTab}</p>
        {labels.map((label, i) => {
          return (
            <button key='label' onClick={() => dispatch(i)}>
              {label}
            </button>
          )
        })}
      </div>
      <div>{children}</div>
    </>
  )
}

const validateUniqueLabels = (labels: string[]) => {
  const uniqueLabels = new Set(labels)
  if (uniqueLabels.size !== labels.length) {
    throw new Error('ERROR : Labels must be unique')
  }
}

const validateLabelWithIndex = (labels: string[], idx: number) => {
  if (idx < 0 || idx >= labels.length) {
    throw new Error('ERROR : Index out of range')
  }
}
