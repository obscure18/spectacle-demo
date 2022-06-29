import { state } from './state'
import { JSXElementConstructor, PropsWithChildren } from 'react'

export const addProvider = (
  Provider: JSXElementConstructor<PropsWithChildren<any>>
) => {
  state.providers.push(Provider)
}
