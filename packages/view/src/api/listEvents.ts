import { SpectacleEvent } from '@spectacle/domain'

export const listEvents = async (): Promise<SpectacleEvent[]> => {
  const response = await fetch(
    'https://us-central1-spectacle-demo-app.cloudfunctions.net/api/events',
    // 'http://localhost:5001/spectacle-demo-app/us-central1/api/events',
    { method: 'GET' }
  )
  const json = await response.json()

  if (json.error) {
    throw new Error(json.error)
  }

  return json
}
