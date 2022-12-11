import Address from "./address"
import User from "./user";

export default interface Order {
  address_start: Address,
  address_end: Address,
  category: number,
  cost: number,
  customer: User,
  customer_notes: string,
  description: string,
  distance: number,
  img_order: string
}