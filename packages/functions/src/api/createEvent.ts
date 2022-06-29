import { Request, Response } from 'express'
import { db } from '../util/firebase-admin'
import { firestore } from 'firebase-admin'
import { runValidation, spectacleEventValidation } from '@spectacle/domain'

export const createEvent = async (request: Request, response: Response) => {
  try {
    const newEvent = JSON.parse(request.body)
    const errors = runValidation(newEvent, spectacleEventValidation)
    const hasErrors = Object.values(errors).some((error) => error !== undefined)

    if (hasErrors) return response.status(422).json(errors)

    const createdEvent = {
      title: newEvent.title,
      datetime: firestore.Timestamp.fromDate(new Date(newEvent.datetime)),
      description: newEvent.description,
      location: new firestore.GeoPoint(
        newEvent.location.latitude,
        newEvent.location.longitude
      ),
      status: newEvent.status,
      imageUrl: newEvent.imageUrl ?? '',
    }

    await db.collection('events').add(createdEvent)
    return response.status(200).json(newEvent)
  } catch (err) {
    console.error(err)
    return response
      .status(500)
      .json({ error: 'Something went wrong, please try again' })
  }
}
