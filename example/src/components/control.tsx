import React from 'react'
import style from '../css/control.module.css'
import { EVERY_POSITIONS } from 'usepositionning'

export default function Control({
  space,
  setSpace,
  preferences,
  setPreferences,
  strictMode,
  setStrictMode
}: {
  space: number
  setSpace: (number: number) => void
  preferences: string[]
  setPreferences: (preferences: string[]) => void
  strictMode: boolean
  setStrictMode: (strictStatus: boolean) => void
}): JSX.Element {
  return (
    <div className={style.root}>
      <input
        type='number'
        value={space}
        onChange={(e) => {
          setSpace(parseInt(e.target.value))
        }}
      />
      <select
        name='strictMode'
        id='strictMode'
        value={`${strictMode}`}
        onChange={(e) => {
          setStrictMode(JSON.parse(e.target.value))
        }}
      >
        <option value='false'>false</option>
        <option value='true'>true</option>
      </select>
      <select
        name='preferences'
        id='preferences'
        onChange={() => setPreferences(['coucou'])}
        value={preferences}
        multiple
      >
        {EVERY_POSITIONS.map((position) => (
          <option value={position}>position</option>
        ))}
      </select>
    </div>
  )
}
