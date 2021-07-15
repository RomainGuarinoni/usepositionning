import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import {
  PositionPreferences,
  UsePositionningHook,
  AbsolutePosition
} from './typings'

// a Set of every position available
export const EVERY_POSITIONS = [
  'top',
  'top-left',
  'top-right',
  'right',
  'right-top',
  'right-bottom',
  'left',
  'left-top',
  'left-bottom',
  'bottom',
  'bottom-left',
  'bottom-right',
  'none'
] as const
export default function usePositionning(
  {
    preferences = [],
    space = 0,
    strictMode = false
  }: {
    preferences?: Array<PositionPreferences>
    space?: number
    strictMode?: boolean
  },
  deps: Parameters<typeof useEffect>[1] = []
): UsePositionningHook {
  //get dimension fo parent and children
  const [nodeParent, _setNodeParent] = useState<HTMLElement>()
  const refParent = useRef(nodeParent)
  const setNodeParentFunction = (node: HTMLElement) => {
    refParent.current = node
    _setNodeParent(node)
  }
  const setNodeParent = useCallback((node) => {
    setNodeParentFunction(node)
  }, [])

  const [nodeChildren, _setNodeChildren] = useState<HTMLElement>()
  const refChildren = useRef(nodeChildren)
  const setNodeChildrenFunction = (node: HTMLElement) => {
    refChildren.current = node
    _setNodeChildren(node)
  }
  const setNodeChildren = useCallback((node) => {
    setNodeChildrenFunction(node)
  }, [])

  //CSS property, position are set based on his parent position
  const [position, setPosition] = useState<AbsolutePosition>({
    top: 'unset',
    left: 'unset',
    right: 'unset',
    bottom: 'unset',
    position: 'absolute'
  })

  const [actualPosition, setActualPosition] = useState<PositionPreferences>()
  //find the closest scrollable parent of the element
  const regex = /(auto|scroll)/
  const style = (node: Element, prop: string) =>
    getComputedStyle(node, null).getPropertyValue(prop)
  const scroll = (node: Element) =>
    regex.test(
      style(node, 'overflow') +
        style(node, 'overflow-y') +
        style(node, 'overflow-x')
    )
  const getScrollParent: any = (node: Element) =>
    !node || node === document.body
      ? document.body
      : scroll(node)
      ? node
      : getScrollParent(node.parentNode)

  // update the css property when the user scroll
  function findBestPosition(space: number) {
    space = space
    window.requestAnimationFrame(() => {
      if (refParent.current !== null && refChildren.current !== null) {
        //return an error if the parent node is not in relative position
        if (
          window
            .getComputedStyle(refParent.current as Element)
            .getPropertyValue('position') !== 'relative'
        ) {
          throw new Error('parent node must have a relative position')
        }
        const container = getScrollParent(
          refParent.current
        ).getBoundingClientRect()

        // get all the distances between the parent border and his container
        const parentRect =
          refParent?.current?.getBoundingClientRect() ||
          ({
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            width: 0,
            height: 0
          } as DOMRect)
        const childrenRect =
          refChildren?.current?.getBoundingClientRect() ||
          ({
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            width: 0,
            height: 0
          } as DOMRect)
        const left = parentRect.left - container.left
        const top = parentRect.top - container.top
        const right = container.width - (left + parentRect.width)
        const bottom = container.height - (top + parentRect.height)
        let positionHasBeenSet = false
        // find the best position in the preference array in params and update css
        for (const positionItem of preferences) {
          if (
            isPositionAvailable(
              positionItem,
              top,
              left,
              bottom,
              right,
              parentRect,
              childrenRect
            )
          ) {
            positionHasBeenSet = true
            updatePosition(positionItem, parentRect, childrenRect)
            setActualPosition(positionItem)
            break
          }
        }

        // find a  position if the preference are empty or if none of the preference item is available
        if (!positionHasBeenSet && !strictMode) {
          for (const positionItem of EVERY_POSITIONS) {
            if (
              isPositionAvailable(
                positionItem,
                top,
                left,
                bottom,
                right,
                parentRect,
                childrenRect
              )
            ) {
              positionHasBeenSet = true
              updatePosition(positionItem, parentRect, childrenRect)
              setActualPosition(positionItem)
              break
            }
          }
        } else if (!positionHasBeenSet && strictMode) {
          updatePosition('none', parentRect, childrenRect)
        }
      }
    })
  }

  //return a boolean whether the position is available or not
  function isPositionAvailable(
    position: PositionPreferences,
    top: number,
    left: number,
    bottom: number,
    right: number,
    parentRect: DOMRect,
    childrenRect: DOMRect
  ) {
    switch (position) {
      case 'top':
        if (
          top >= childrenRect.height + space &&
          left >= (childrenRect.width - parentRect.width) / 2 &&
          right >= (childrenRect.width - parentRect.width) / 2
        ) {
          return true
        }
        return false
      case 'top-right':
        if (
          top >= childrenRect.height + space &&
          left >= childrenRect.width - parentRect.width &&
          right >= 0
        ) {
          return true
        }
        return false
      case 'top-left':
        if (
          top >= childrenRect.height + space &&
          right >= childrenRect.width - parentRect.width &&
          left >= 0
        ) {
          return true
        }
        return false
      case 'bottom':
        if (
          bottom >= childrenRect.height + space &&
          left >= (childrenRect.width - parentRect.width) / 2 &&
          right >= (childrenRect.width - parentRect.width) / 2
        ) {
          return true
        }
        return false
      case 'bottom-left':
        if (
          bottom >= childrenRect.height + space &&
          right >= childrenRect.width - parentRect.width &&
          left >= 0
        ) {
          return true
        }
        return false
      case 'bottom-right':
        if (
          bottom >= childrenRect.height + space &&
          left >= childrenRect.width - parentRect.width &&
          right >= 0
        ) {
          return true
        }
        return false
      case 'left':
        if (
          left >= childrenRect.width + space &&
          top >= (childrenRect.height - parentRect.height) / 2 &&
          bottom >= (childrenRect.height - parentRect.height) / 2
        ) {
          return true
        }
        return false
      case 'left-top':
        if (
          left >= childrenRect.width + space &&
          bottom >= childrenRect.height - parentRect.height &&
          top >= 0
        ) {
          return true
        }
        return false
      case 'left-bottom':
        if (
          left >= childrenRect.width + space &&
          top >= childrenRect.height - parentRect.height &&
          bottom >= 0
        ) {
          return true
        }
        return false
      case 'right':
        if (
          right >= childrenRect.width + space &&
          top >= (childrenRect.height - parentRect.height) / 2 &&
          bottom >= (childrenRect.height - parentRect.height) / 2
        ) {
          return true
        }
        return false
      case 'right-top':
        if (
          right >= childrenRect.width + space &&
          bottom >= childrenRect.height - parentRect.height &&
          top >= 0
        ) {
          return true
        }
        return false
      case 'right-bottom':
        if (
          right >= childrenRect.width + space &&
          top >= childrenRect.height - parentRect.height &&
          bottom >= 0
        ) {
          return true
        }
        return false
      case 'none':
        return true
    }
  }

  // update the CSS UseState according to a position anchor
  function updatePosition(
    position: PositionPreferences,
    parentRect: DOMRect,
    childrenRect: DOMRect
  ) {
    switch (position) {
      case 'top':
        setPosition({
          top: 'unset',
          left: -(childrenRect.width - parentRect.width) / 2,
          right: 'unset',
          bottom: parentRect.height + space,
          position: 'absolute'
        })
        break
      case 'top-left':
        setPosition({
          top: 'unset',
          left: 0,
          bottom: parentRect.height + space,
          right: 'unset',
          position: 'absolute'
        })
        break
      case 'top-right':
        setPosition({
          top: 'unset',
          left: 'unset',
          right: 0,
          bottom: parentRect.height + space,

          position: 'absolute'
        })
        break
      case 'bottom':
        setPosition({
          top: parentRect.height + space,
          left: -(childrenRect.width - parentRect.width) / 2,
          bottom: 'unset',
          right: 'unset',
          position: 'absolute'
        })
        break
      case 'bottom-left':
        setPosition({
          top: parentRect.height + space,
          left: 0,
          bottom: 'unset',
          right: 'unset',
          position: 'absolute'
        })
        break
      case 'bottom-right':
        setPosition({
          top: parentRect.height + space,
          left: 'unset',
          bottom: 'unset',
          right: 0,
          position: 'absolute'
        })
        break
      case 'right':
        setPosition({
          top: -(childrenRect.height - parentRect.height) / 2,
          bottom: 'unset',
          left: parentRect.width + space,
          right: 'unset',
          position: 'absolute'
        })
        break
      case 'right-top':
        setPosition({
          top: 0,
          bottom: 'unset',
          left: parentRect.width + space,
          right: 'unset',
          position: 'absolute'
        })
        break
      case 'right-bottom':
        setPosition({
          top: 'unset',
          bottom: 0,
          left: parentRect.width + space,
          right: 'unset',
          position: 'absolute'
        })
        break
      case 'left':
        setPosition({
          top: -(childrenRect.height - parentRect.height) / 2,
          left: 'unset',
          bottom: 'unset',
          right: parentRect.width + space,
          position: 'absolute'
        })
        break
      case 'left-top':
        setPosition({
          top: 0,
          left: 'unset',
          bottom: 'unset',
          right: parentRect.width + space,
          position: 'absolute'
        })
        break
      case 'left-bottom':
        setPosition({
          top: 'unset',
          left: 'unset',
          bottom: 0,
          right: parentRect.width + space,
          position: 'absolute'
        })
        break
      case 'none':
        setPosition({
          top: 'unset',
          left: 'unset',
          right: 'unset',
          bottom: 'unset',
          position: 'absolute',
          display: 'none'
        })
    }
  }

  // listen every scroll/resize on the window and update CSS position
  useEffect(() => {
    window.addEventListener(
      'scroll',
      () => {
        findBestPosition(space)
      },
      true
    )
    window.addEventListener(
      'resize',
      () => {
        findBestPosition(space)
      },
      true
    )
    return () => {
      window.removeEventListener(
        'scroll',
        () => {
          findBestPosition(space)
        },
        true
      )
      window.removeEventListener(
        'resize',
        () => {
          findBestPosition(space)
        },
        true
      )
    }
  }, [refParent, space])

  useEffect(() => {
    findBestPosition(space)
  }, [space])
  // listen every resize of the element to position
  useLayoutEffect(() => {
    if (refParent) {
      findBestPosition(space)
    }
  }, [...deps])

  return [setNodeParent, setNodeChildren, position, actualPosition]
}
