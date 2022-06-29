import {
  isEmpty,
  isLatitude,
  isLongitude,
  isValidImageUrl,
  ValidationType,
} from './utils'
import { SpectacleEvent } from '../models'

const titleValidator = (
  title?: SpectacleEvent['title']
): string | undefined => {
  if (isEmpty(title)) return 'The event name should not be empty.'
  return undefined
}

const locationValidator = (
  location?: SpectacleEvent['location']
): string | undefined => {
  if (location === undefined)
    return 'You must define a location for your event.'
  const { latitude, longitude } = location
  if (!isLatitude(latitude) && !isLongitude(longitude))
    return 'The latitude must be a number between -90 and 90 and the longitude between -180 and 180.'
  if (!isLatitude(latitude))
    return 'The latitude must be a number between -90 and 90.'
  if (!isLongitude(longitude))
    return 'The longitude must be a number between -180 and 180.'
  return undefined
}

const datetimeValidator = (
  datetime?: SpectacleEvent['datetime']
): string | undefined => {
  const todayWithoutTime = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  )
  if (datetime === undefined || datetime < new Date(todayWithoutTime))
    return 'The date of the event must be today or later'
  return undefined
}

const descriptionValidator = (
  description?: SpectacleEvent['description']
): string | undefined => {
  if (isEmpty(description))
    return "The event's description should not be empty."
  return undefined
}

const statusValidator = (
  status?: SpectacleEvent['status']
): string | undefined => {
  if (isEmpty(status)) return 'Please specify the event status'
  if (!['active', 'cancelled'].includes(status!))
    return "Status can only be one of the following : 'active', 'cancelled'"
  return undefined
}

const imageUrlValidator = (
  imageUrl?: SpectacleEvent['imageUrl']
): string | undefined => {
  if (isEmpty(imageUrl)) return undefined
  if (!isValidImageUrl(imageUrl!)) return 'The image url is not valid.'
  return undefined
}

export const spectacleEventValidation: ValidationType<SpectacleEvent> = {
  datetime: datetimeValidator,
  description: descriptionValidator,
  location: locationValidator,
  status: statusValidator,
  imageUrl: imageUrlValidator,
  title: titleValidator,
}
