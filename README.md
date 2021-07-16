# usePositionning

> A lightweight library to position elements on the page according to scrolling and available space.

[![NPM](https://img.shields.io/npm/v/usepositionning.svg)](https://www.npmjs.com/package/usepositionning) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://romainguarinoni.github.io/usePositionning/)[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/RomainGuarinoni/usePositionning/blob/master/LICENSE)

![Peek 17-07-2021 00-57](https://user-images.githubusercontent.com/72984755/126016048-05498cf9-145a-49eb-a56e-75fed22300ff.gif)

## Install

```bash
npm install --save usepositionning
```

```bash
yarn add --save usepositionning
```

## What's new ?

usePositionning is a react hook that allows your component (like popUp or select for example) to reposition itself according to the available space on the screen and the position of its parent node when a user scroll or resize the window.

## How does it works ?

usePosition calculates the CSS parameters top / bottom / right / left of a JSX element on every scroll and resize of the window .
These properties are calculated according to the position of its parent element, which **must be in relative position**.

Here is how to add usePositionning to your component:

```tsx
const [refParent, refChildren, style, position] = usePositionning(
  {
    space: 1,
    preferences: ['bottom-left', 'top-left', 'right-top', 'left-top'],
    strictMode: false
  },
  [open]
)
```

usePositionning returns four elements:

- **refParent** is a React.ref that you should pass to the parent element on which your children are positioned :

```tsx
<div className='parent' ref={refParent}>
  {' '}
</div>
```

-**refChildren** is a React.ref for the pop up element, the one who need to be positionned :

```tsx
<div className='children' ref={refChildren}>
  {' '}
</div>
```

- **style** are the CSS property that you need to pass to the children JSX.element :

```tsx
<div className='children' style={positions}>
  {' '}
</div>
```

-**actualPosition** is the actual position of the children element. See below the possible position that it can take

## Parameters of usePositionning

| Name        | Type          | Required | Default | Description                                                                                                                                                          |
| ----------- | ------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| preferences | Number        | false    | [ ]     | An array of the position order by preference ( see PositionPreference type below                                                                                     |
| space       | Number        | false    | 0       | The space between the parent and children element                                                                                                                    |
| strictMode  | Boolean       | false    | false   | If set to `true`, usePositionning will positionned your element only with your preferences, otherwise it will choose the best position in all the position available |
| deps        | Array od deps | false    | [ ]     | An array of dependencies                                                                                                                                             |

Here are all the position available for the children element :

```tsx
export type PositionPreferences =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'
  | 'right-top'
  | 'right-bottom'
  | 'left-top'
  | 'left-bottom'
```

## Example of use

```tsx
const Example = (): JSX.Element => {
  const [refParent, refChildren, style, actualPositions] = usePositionning({
    preferences: ['top-left', 'bottom-left'],
    space: 10
  })

  return (
    <div className='parentNode' ref={refParent}>
      <div className='childrenNode' ref={refChildren} style={positions}>
        {' '}
        <p> {actualPosition} </p>{' '}
      </div>
      <style jsx>
        {`
          .parentNode {
            position: relative;
            width: 200px;
            height: 300px;
          }

          .childrenNode {
            width: 500px;
            height: 200px;
          }
        `}
      </style>
    </div>
  )
}
```

MIT © [RomainGuarinoni](https://github.com/RomainGuarinoni)
