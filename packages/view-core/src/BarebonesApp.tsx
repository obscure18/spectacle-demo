import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './ErrorFallback'
import { BrowserRouter } from 'react-router-dom'
import { Views } from './Views'
import { Layout } from './Layout'
import { Providers } from './Providers'

export const BarebonesApp = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Providers>
          <Layout>
            <Views />
          </Layout>
        </Providers>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
