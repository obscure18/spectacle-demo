import { addRoute, setLayout } from '@spectacle/view-core'
import { Layout } from '../common'
import { routes } from '../constants'
import { NotFound } from './NotFound'
import { Events } from './events'
import { CreateEvent } from './createEvent'

addRoute(routes.NOT_FOUND, NotFound)
addRoute(routes.HOME, Events)
addRoute(routes.EVENTS, Events)
addRoute(routes.CREATE_EVENT, CreateEvent)

setLayout(Layout)
