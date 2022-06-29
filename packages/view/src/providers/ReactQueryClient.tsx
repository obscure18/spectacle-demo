import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { addProvider } from '@spectacle/view-core'

const queryClient = new QueryClient()

const ReactQueryClient = ({ children }: PropsWithChildren<any>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      {children}
    </QueryClientProvider>
  )
}

addProvider(ReactQueryClient)
