import { MantineProvider } from '@mantine/core'
import { PropsWithChildren } from 'react'
import { addProvider } from '@spectacle/view-core'

const theme = {
  fontFamily: 'Lato Thin, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  primaryColor: 'neonPurple',
  colors: {
    neonPurple: [
      '#f5e7ff',
      '#dabcf8',
      '#c090ef',
      '#a764e7',
      '#8e39e0',
      '#741fc6',
      '#5a189b',
      '#411070',
      '#270844',
      '#10011b',
    ],
    neonRed: [
      '#ffe2e2',
      '#ffb1b2',
      '#ff7f7f',
      '#ff4d4d',
      '#fe1d1b',
      '#e50501',
      '#b30000',
      '#810000',
      '#4f0000',
      '#200000',
    ],
    neonOrange: [
      '#ffefdb',
      '#ffd5ae',
      '#ffbb7e',
      '#ffa04c',
      '#ff851a',
      '#e66b00',
      '#b45300',
      '#813b00',
      '#4f2300',
      '#200900',
    ],
    neonYellow: [
      '#fff9db',
      '#ffecaf',
      '#ffdf7f',
      '#ffd24d',
      '#ffc51e',
      '#e6ac06',
      '#b38600',
      '#805f00',
      '#4e3900',
      '#1d1300',
    ],
  },
  headings: { fontFamily: 'American Typewriter, serif' },
}

const MantineUIProvider = ({ children }: PropsWithChildren<any>) => {
  return (
    <MantineProvider theme={theme as never} withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  )
}

addProvider(MantineUIProvider)
