import { EVERY_POSITIONS } from './index'

export type AbsolutePosition = {
  top: AbsolutePositionValue
  left: AbsolutePositionValue
  right: AbsolutePositionValue
  bottom: AbsolutePositionValue
  position: 'absolute'
  display?: 'none'
}

export type AbsolutePositionValue = number | 'unset'

export type PositionPreferences = typeof EVERY_POSITIONS[number]

export type UsePositionningHook = [
  (node: HTMLElement) => void,
  (node: HTMLElement) => void,
  AbsolutePosition,
  PositionPreferences | undefined
]
