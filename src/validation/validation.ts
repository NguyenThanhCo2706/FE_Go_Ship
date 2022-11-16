import * as yup from 'yup';

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

export const yupAuth = yup.object().shape({
  phone_number: yup.string().required("Phone is required").matches(phoneRegExp, 'Phone number is not valid'),
  password: yup.string().required("Password is required"),
  role: yup.string(),
  token_device: yup.string()
});
