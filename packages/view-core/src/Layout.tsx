import { PropsWithChildren, useMemo } from 'react'
import { state } from './state'

export const Layout = ({ children }: PropsWithChildren<any>) => {
  return useMemo(() => {
    const Component = state.Layout

    return Component ? <Component>{children}</Component> : <>{children}</>
  }, [state.Layout])
}
