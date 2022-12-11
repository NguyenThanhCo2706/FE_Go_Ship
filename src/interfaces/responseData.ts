export default interface ResponseData<T> {
  status: string,
  data?: T,
  total?: number,
  detail: string,
}
