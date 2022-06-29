import { PropsWithChildren, useMemo } from 'react'
import { state } from './state'

export const Providers = ({ children }: PropsWithChildren<any>) => {
  const providers = useMemo(() => state.providers, [state.providers.length])

  return (
    <>
      {providers.reduceRight((content, Component) => {
        return <Component>{content}</Component>
      }, children)}
    </>
  )
}
