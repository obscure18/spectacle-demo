import { JSXElementConstructor, PropsWithChildren } from 'react'
import { state } from './state'

export const setLayout = (
  Component?: JSXElementConstructor<PropsWithChildren<any>>
) => {
  state.Layout = Component
}
