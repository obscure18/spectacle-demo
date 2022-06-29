import { db } from '../util/firebase-admin'
import { SpectacleEvent } from '@spectacle/domain'
import { Request, Response } from 'express'

export const getAllEvents = async (request: Request, response: Response) => {
  try {
    const querySnapshot = await db
      .collection('events')
      .orderBy('title', 'desc')
      .get()

    const events: SpectacleEvent[] = querySnapshot.docs.map((doc) => ({
      title: doc.data().title,
      datetime: new Date(doc.data().datetime.seconds * 1000),
      description: doc.data().description,
      location: {
        longitude: doc.data().location._longitude,
        latitude: doc.data().location._latitude,
      },
      status: doc.data().status,
      imageUrl: doc.data().imageUrl,
    }))

    return response.status(200).json(events)
  } catch (err) {
    console.error(err)
    return response
      .status(500)
      .json({ error: 'Something went wrong, please try again' })
  }
}
