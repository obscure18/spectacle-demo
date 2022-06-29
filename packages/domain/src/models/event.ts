export interface GeoLocation {
  longitude: number
  latitude: number
}

export interface SpectacleEvent {
  title: string
  location: GeoLocation
  datetime: Date
  description: string
  imageUrl: string
  status: string
}
