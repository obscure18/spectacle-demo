import { ComponentType, JSXElementConstructor, PropsWithChildren } from 'react'

interface NamedRoute {
  path: string
  Component: ComponentType
}

interface State {
  routes: NamedRoute[]
  Layout?: JSXElementConstructor<PropsWithChildren<any>>
  providers: JSXElementConstructor<PropsWithChildren<any>>[]
}
