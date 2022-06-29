import express from 'express'
import { https } from 'firebase-functions'
import cors from 'cors'

import { createEvent } from './createEvent'
import { getAllEvents } from './getAllEvents'

const app = express()
app.use(cors({ origin: true }))

app.get('/events', getAllEvents)
app.post('/events', createEvent)

export const api = https.onRequest(app)
