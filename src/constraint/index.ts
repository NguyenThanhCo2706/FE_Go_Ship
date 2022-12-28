// export const BASE_URL = "http://167.71.197.115:8000/api/v1/";
export const BASE_URL = "https://goshipapi.ddns.net/api/v1/";


export const MESSAGES = {
  NOTIFICATION: "Thông báo",
  SUCCESS: "Thành công",
  FAILURE: "Thất bại"
}

export const URL_IMAGES = {
  DEFAULT_AVATAR: "https://firebasestorage.googleapis.com/v0/b/pbl6-goship.appspot.com/o/profile_icon.png?alt=media&token=e2229d0c-ce55-4ccb-8b2d-9f66dd5c55ca",
  DEFAULT_IMG_ORDER: "https://firebasestorage.googleapis.com/v0/b/pbl6-goship.appspot.com/o/order_no_image.jpg?alt=media&token=41fedf4d-dd07-434c-9c3e-c610dc4d5f76"
}

export const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidGhhbmhjbyIsImEiOiJjbDgzdjFyeHYwOW1hM25tcHBlZTlveTAwIn0.hIwtYHcABmKWnG9goNPd5A";

export const GENDER = [
  { id: 0, value: "None" },
  { id: 1, value: "Nam" },
  { id: 2, value: "Nữ" }
]

export const STATUS = [
  { id: 1, value: "Đang đợi" },
  { id: 2, value: "Đã Nhận đơn" },
  { id: 3, value: "Đang giao hàng" },
  { id: 4, value: "Không thành công" },
  { id: 5, value: "Hoàn thành" }

]