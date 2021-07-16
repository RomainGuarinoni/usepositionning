import React, { useEffect, useRef, useState } from 'react'
import style from '../css/demo.module.css'
import usePositionning from 'usepositionning'
export default function Demo({
  space,
  preferences,
  strictMode
}: {
  space: number
  preferences: Array<string>
  strictMode: boolean
}): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(true)
  const [refParent, refChildren, styleChildren, actualPosition] =
    usePositionning(
      {
        space: space,
        preferences: preferences,
        strictMode: strictMode
      },
      [open]
    )
  useEffect(() => {
    rootRef?.current?.scroll(900, 450)
  }, [])
  return (
    <div className={style.root} ref={rootRef}>
      <div
        className={style.parent}
        ref={refParent}
        onClick={() => {
          setOpen(!open)
        }}
      >
        <p>Parent element</p>
        <p>Click me </p>
        {open && (
          <div className={style.child} ref={refChildren} style={styleChildren}>
            <p>Child Element</p>
            <p> Actual position : {actualPosition} </p>
          </div>
        )}
      </div>
      <div className={style.space}></div>
    </div>
  )
}
