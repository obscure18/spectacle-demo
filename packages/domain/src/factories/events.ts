import { SpectacleEvent } from '../models'

const createSingleEvent = (): SpectacleEvent => {
  return {
    title: '2000s boom!',
    status: 'active',
    datetime: new Date('2000-01-01'), // in backend, always in GMT
    description: 'The Greatest Party EVER!',
    imageUrl: '',
    location: {
      latitude: 55,
      longitude: 32,
    },
  }
}

export { createSingleEvent }
