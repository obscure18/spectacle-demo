import { DefaultMantineColor, Tuple } from '@mantine/core'

type ExtendedCustomColors =
  | 'neonPurple'
  | 'neonRed'
  | 'neonOrange'
  | 'neonYellow'
  | DefaultMantineColor

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}
