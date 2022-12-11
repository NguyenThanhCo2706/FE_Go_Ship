import Address from "./address";

export default interface User {
  id?: number,
  name: string,
  address_id?: number,
  address?: Address,
  gender: number,
  avatar_url?: string,
  birth_date?: string,
  distance_view: number,
}