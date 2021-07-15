import React from 'react'
import style from '../css/editor.module.css'
export default function Editor() {
  return (
    <div className={style.root}>
      <div className={style.editorWindow}>
        <div className={style.line}></div>
        <p className='import'>import</p>
        <p className='var'>React</p>
        <p className='import'>from</p>
        <p className='string'>'react'</p>
        <div className={style.line}>
          <p className='import'>import</p>
          <p className='var'>usePositionning</p>
          <p className='import'>from</p>
          <p className='string'>'usepositionning'</p>
        </div>
        <br />
        <div className={style.line}>
          <p className='import'>export</p>
          <p className='import'>default</p>
          <p className='darkConst'>function</p>
          <p className='function'>
            Demo <span className='white'>( )</span>{' '}
          </p>
          <p className='white'>{'{'} </p>
        </div>
        <div className={style.line}>
          <p className='darkConst space'>const</p>
          <p className='const'>
            {' '}
            <span className='white'>[ </span>parentRef{' '}
            <span className='white'>,</span>
            <p className='const'> refChildren</p>{' '}
            <span className='white'>,</span>
            <p className='const'> styleChildren</p>
            <span className='white'>,</span>
            <p className='const'> actualPosition</p>
            <span className='white'> ] = </span>
            <p className='function'>usePositionning</p>
            <p className='white'>( {'{ }'} )</p>
          </p>
        </div>
        <br />
        <div className={style.line}>
          <p className='import space'>
            return <span className='white'> ( </span>{' '}
          </p>
        </div>
        <div className={style.line}>
          <p className='darkConst space2'>
            {' '}
            <span className='bracket'>{'<'}</span>div
          </p>
          <p className='var'>
            ref<span className='white'>=</span>
            <span className='darkConst'>{'{'}</span>
            <span className='const'>refParent</span>
            <span className='darkConst'>{'}'}</span>
            <span className='bracket'>{'>'}</span>
          </p>
        </div>
        <div className={style.line}>
          <p className='darkConst space3'>
            {' '}
            <span className='bracket'>{'<'}</span>p
            <span className='bracket'>{'>'}</span>
            <span className='white'>Parent Element</span>
            <span className='bracket'>{'</'}</span>p
            <span className='bracket'>{'>'}</span>
          </p>
        </div>
        <div className={style.line}>
          <p className='darkConst space3'>
            {' '}
            <span className='bracket'>{'<'}</span>div
          </p>
          <p className='var'>
            ref<span className='white'>=</span>
            <span className='darkConst'>{'{'}</span>
            <span className='const'>refChildren</span>
            <span className='darkConst'>{'}'}</span>
            <span className='bracket'>{'>'}</span>
          </p>
          <p className='var'>
            style<span className='white'>=</span>
            <span className='darkConst'>{'{'}</span>
            <span className='const'>styleChildren</span>
            <span className='darkConst'>{'}'}</span>
            <span className='bracket'>{'>'}</span>
          </p>
        </div>
        <div className={style.line}>
          <p className='darkConst space4'>
            {' '}
            <span className='bracket'>{'<'}</span>p
            <span className='bracket'>{'>'}</span>
            <span className='white'>Child Element</span>
            <span className='bracket'>{'</'}</span>p
            <span className='bracket'>{'>'}</span>
          </p>
        </div>
        <div className={style.line}>
          <p className='darkConst space4'>
            {' '}
            <span className='bracket'>{'<'}</span>p
            <span className='bracket'>{'>'}</span>
            <span className='white'>Actual position : </span>
            <span className='darkConst'> {'{'} </span>
            <span className='const'>actualPosition</span>
            <span className='darkConst'> {'}'} </span>
            <span className='bracket'>{'</'}</span>p
            <span className='bracket'>{'>'}</span>
          </p>
        </div>
        <div className={style.line}>
          <span className='bracket space3'>{'</'}</span>
          <span className='darkConst'>div</span>
          <span className='bracket'>{'>'}</span>
        </div>
        <div className={style.line}>
          <span className='bracket space2'>{'</'}</span>
          <span className='darkConst'>div</span>
          <span className='bracket'>{'>'}</span>
        </div>
        <div className={style.line}>
          <p className='white space'>)</p>
        </div>
        <div className={style.line}>
          <p className='white '>{'}'}</p>
        </div>
      </div>
    </div>
  )
}
