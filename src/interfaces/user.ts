export default interface User {
  name: string,
  address_id?: number,
  address?: {
    id: number,
    address_notes: string,
    latitude: number,
    longitude: number,
  },
  genders: number,
  avatar_url: string,
  distance_view: number,
}