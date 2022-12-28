import * as yup from 'yup';

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

export const yupAuth = yup.object().shape({
  phone_number: yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(phoneRegExp, 'Số điện thoại định dạng không đúng'),
  // .length(10, "Số điện thoại chỉ tối đa 10 chữ số"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  role: yup.string(),
  token_device: yup.string()
});

export const yupOrder = yup.object().shape({
  address_start: yup.object().shape({
    address_notes: yup.string().required("Vui lòng nhập địa chỉ bắt đầu"),
    latitude: yup.number().required("Vĩ độ không chính xác"),
    longitude: yup.number().required("Kinh độ không chính xác")
  }),
  address_end: yup.object().shape({
    address_notes: yup.string().required("Vui lòng nhập địa chỉ đến"),
    latitude: yup.number().required("Vĩ độ không chính xác"),
    longitude: yup.number().required("Kinh độ không chính xác")
  }),
  categoryId: yup.number().required("Vui lòng chọn hình thức giao thàng"),
  paymentId: yup.number().required("Vui lòng chọn hình thức thanh toán"),
  cost: yup.number(),
  customer_notes: yup.string(),
  description: yup.string(),
  distance: yup.number().moreThan(0, "Khoảng cách giao hàng phải lớn hơn 0"),
  img_order: yup.string()
})