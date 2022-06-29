import { ComponentType } from 'react'
import { state } from './state'

export const addRoute = (path: string, Component: ComponentType) => {
  state.routes.push({ path, Component })
}
