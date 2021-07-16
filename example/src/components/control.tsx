import React from 'react'
import style from '../css/control.module.css'
import { EVERY_POSITIONS } from 'usepositionning'
import Multiselect from 'multiselect-react-dropdown'
import Toggle from './toggle'

type PositionOption = {
  position: typeof EVERY_POSITIONS[number]
  id: number
}

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
  const positionOptions = EVERY_POSITIONS.map((position, index) => {
    return { position: position, id: index }
  })

  function preferenceChange(selectedValue: PositionOption[]) {
    setPreferences(selectedValue.map(({ position }) => position))
  }

  return (
    <div className={style.root}>
      <div className={style.controls}>
        <div className={style.input}>
          <label htmlFor='range'>Space : </label>
          <input
            id='range'
            type='range'
            value={space}
            onChange={(e) => {
              setSpace(parseInt(e.target.value))
            }}
          />
        </div>
        <div className={style.input}>
          <label htmlFor='strictMode'>StrictMode : </label>
          <Toggle state={strictMode} setState={setStrictMode} />
        </div>
        <div className={style.input}>
          <label htmlFor='preferences'>Position preferences : </label>
          <Multiselect
            options={positionOptions}
            displayValue='position'
            onSelect={(e) => {
              preferenceChange(e)
            }}
            onRemove={(e) => {
              preferenceChange(e)
            }}
            placeholder='Select the position preferences'
            style={{
              optionContainer: {
                maxHeight: 150
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
