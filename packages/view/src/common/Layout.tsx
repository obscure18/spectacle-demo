import { PropsWithChildren } from 'react'
import { AppShell, Container, Footer } from '@mantine/core'
import { SpectacleHeader } from './SpectacleHeader'

export const Layout = ({ children }: PropsWithChildren<any>) => {
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={<SpectacleHeader />}
      footer={
        <Footer height={60} p="md">
          Made in 2022 for Solutions Kumojin by Nadia Chicoine
        </Footer>
      }
    >
      <Container
        sx={(theme) => ({
          padding: theme.spacing.xl,
          [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            padding: 0,
          },
        })}
        fluid
      >
        {children}
      </Container>
    </AppShell>
  )
}
