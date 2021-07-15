import React, { useEffect, useRef } from 'react'
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

  const [refParent, refChildren, styleChildren, actualPosition] =
    usePositionning({
      space: space,
      preferences: preferences,
      strictMode: strictMode
    })
  useEffect(() => {
    rootRef?.current?.scroll(900, 200)
  }, [])
  return (
    <div className={style.root} ref={rootRef}>
      <div className={style.parent} ref={refParent}>
        <p>Parent element</p>
        <div className={style.child} ref={refChildren} style={styleChildren}>
          <p>Child Element</p>
          <p> Actual position : {actualPosition} </p>
        </div>
      </div>
      <div className={style.space}></div>
    </div>
  )
}
