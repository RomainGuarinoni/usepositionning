import React, { useState } from 'react'
import Demo from './components/demo'
import Editor from './components/editor'
import Control from './components/control'
import style from './css/homePage.module.css'
const App = (): JSX.Element => {
  const [space, setSpace] = useState(0)
  const [strictMode, setStrictMode] = useState(false)
  const [preferences, setPreferences] = useState<string[]>([])

  return (
    <div className={style.root}>
      <div className={style.header}>
        <h1>usePositionning</h1>
      </div>
      <div className={style.demo}>
        <div className={style.demoBox}>
          <Demo
            space={space}
            preferences={preferences}
            strictMode={strictMode}
          />
        </div>
        <div className={style.demoBox}>
          {' '}
          <Editor
            space={space}
            preferences={preferences}
            strictMode={strictMode}
          />
        </div>
      </div>
      <Control
        preferences={preferences}
        setPreferences={setPreferences}
        space={space}
        setSpace={setSpace}
        strictMode={strictMode}
        setStrictMode={setStrictMode}
      />
    </div>
  )
}

export default App
