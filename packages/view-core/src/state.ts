import { State } from './types'

const makeState = (): State => ({
  routes: [],
  Layout: undefined,
  providers: [],
})

export const state = makeState()
