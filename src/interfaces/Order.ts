import Address from "./address"
import AddressView from "./addressView";
import Payment from "./payment";
import Rate from "./rate";
import Status from "./status";
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
  img_order: string,
  updated_at?: string,
  created_at?: string
}

export interface ViewOrder {
  id?: number,
  address_start: AddressView,
  address_end: AddressView,
  category: number,
  cost: number,
  customer: User,
  customer_notes: string,
  description: string,
  distance: number,
  img_order: string,
  status: Status,
  payment: Payment,
  rate: Rate,
  updated_at?: string,
  created_at?: string
}