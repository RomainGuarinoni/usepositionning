import React from 'react'
import Demo from './components/demo'
import Editor from './components/editor'
import style from './css/homePage.module.css'
const App = () => {
  return (
    <div className={style.root}>
      <div className={style.header}>
        <h1>usePositionning</h1>
      </div>
      <div className={style.demo}>
        <div className={style.demoBox}>
          <Demo />
        </div>
        <div className={style.demoBox}>
          {' '}
          <Editor />
        </div>
      </div>
    </div>
  )
}

export default App
