import { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { state } from './state'
import { NamedRoute } from './types'

const toRouteComponent = ({ path, Component }: NamedRoute) => {
  return <Route path={path} key={path} element={<Component />} />
}

export const Views = () => {
  const routes = useMemo(
    () => state.routes.map((route) => toRouteComponent(route)),
    [state.routes.length]
  )

  return <Routes>{routes}</Routes>
}
