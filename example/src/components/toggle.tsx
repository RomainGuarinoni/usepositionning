import React from 'react'
import style from '../css/toggle.module.css'
export default function Toggle({
  state,
  setState
}: {
  state: boolean
  setState: (state: boolean) => void
}): JSX.Element {
  return (
    <div className={`${style.root}`} onClick={() => setState(!state)}>
      <p>false</p>
      <p>true</p>
      <div className={`${style.select} ${state ? style.right : ''}`}></div>
    </div>
  )
}
