import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

import Auth from '../../interfaces/auth';
import authApi from '../../api/authApi';
import { yupAuth } from '../../validation/validation';
import MessageBox from '../Commons/MessageBox';
import constraint from '../../constraint';
import { authentication } from "../../config/firebase-config";
import { handleError } from '../../utils';


const Register = () => {
  const navigate = useNavigate()
  const areaCode = "+84";
  const [openBoxOTP, setOpenBoxOTP] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [isError, setIsError] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [otp, setOTP] = useState("");
  const [final, setfinal] = useState<any>();
  const [verify, setVerify] = useState<any>();

  const handleRegister = async () => {
    if (password !== rePassword) {
      setMessageError("Mật khẩu nhập không khớp");
      setIsError(true);
      return;
    }
    try {
      const user: Auth = {
        phone_number: phone,
        password: password,
        role: 1,
        token_device: ""
      }
      await yupAuth.validate(user);

      const appVerifier = new RecaptchaVerifier('recaptcha-container', {
        'callback': (response: any) => {
          setOpenBoxOTP(!openBoxOTP);
        }
      }, authentication);

      signInWithPhoneNumber(authentication, areaCode + phone, appVerifier)
        .then((confirmationResult) => {
          setfinal(confirmationResult);
          appVerifier.clear()
        })
        .catch((error) => {
          console.log(error)
        })
    }
    catch (err: any) {
      if (err.response && err.response.status) {
        setMessageError(handleError(err));
      }
      else {
        setMessageError(err.message)
      }
      setIsError(true);
    }
  }

  const handleHideOTP = () => {
    setOpenBoxOTP(!openBoxOTP)
  }

  const handleAcceptOTP = async () => {
    final.confirm(otp)
      .then(async (result: any) => {
        try {
          const auth: Auth = {
            phone_number: ("0" + phone),
            password: password,
            role: 1,
            token_device: ""
          }
          setOpenBoxOTP(false);
          setWaiting(true)
          await authApi.register(auth);
          setWaiting(false)
          setRegisterSuccess(true);
          setOTP("");
        }
        catch (err: any) {
          setWaiting(false)
          setIsError(true);
          if (err.response && err.response.status) {
            setMessageError(handleError(err));
          }
          else {
            setMessageError(err.message)
          }
        }
      })
      .catch((error: any) => {
        alert("Mã xác nhận không đúng");
      })
  }

  const navigateLogin = () => {
    navigate('/login');
  }

  const handleHideNotification = () => {
    setWaiting(false);
    setIsError(false);
  }

  const handleRegisterSuccess = () => {
    setRegisterSuccess(false);
    navigate('/login');
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-light p-2">
          <div className="col-4 d-flex align-items-center justify-content-around fs-5 ">
            <div className="ms-5">Bấm để tải ứng dụng GoShip:</div>
            <div className="d-flex align-items-center">
              <i className="fa-brands fa-apple fs-2 me-2"></i>
              <span>App store</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="fa-brands fa-google-play fs-2 me-2"></i>
              <span>Goggle Play</span>
            </div>
          </div>
          <div className="col-8"></div>
        </div>
        <div className="row align-items-center fs-5 p-2 fw-bold">
          <div className="col-6 row">
            <div className="col-3 d-flex flex-column align-items-center">
              <img src={process.env.PUBLIC_URL + "/images/go_ship.png"} alt="" className="img-logo" />
              <span className="text-primary fw-bold fs-3">Go Ship</span>
            </div>
            <div className="col-9 d-flex flex-row justify-content-between align-items-center">
              <div>TRANG CHỦ</div>
              <div>DỊCH VỤ</div>
              <div>TUYỂN DỤNG</div>
              <div>VỀ CHÚNG TÔI</div>
            </div>
          </div>
          <div className="col-6 d-flex flex-row">
            <button className="btn btn-primary w-25 ms-5 me-1 fw-bold">ĐĂNG NHẬP/ĐĂNG KÝ</button>
            <input className="form-control fs-5 w-50" type="text" placeholder="Tìm kiếm" />
          </div>
        </div>
      </div>
      <div className="position-relative">
        <div className="d-flex flex-column p-5 fs-5 bg-primary text-light color-gradient">
          <span className="fw-bold fs-4 ps-5">GoShip giao hàng siêu tốc - Chúng tôi số 2 không ai số 1</span>
          <span className="pt-3 pb-3 ps-5">Nhanh chóng tiện lợi, Đăng ký liền taym rinh ngay quyền lợi</span>
        </div>
        <div className="p-3 ps-5">
          <div className="row p-5 fs-5">
            <div className="col-3">
              <img src={process.env.PUBLIC_URL + "/images/coins1.png"} alt="" />
              <p className="fw-bold">Tích điểm nhanh chóng</p>
              <span>Tích điểm với mỗi lượt đặt giao hàng thành công, quy đổi điểm để tiết kiệm nhiều hơn.</span>
            </div>
            <div className="col-3">
              <img src={process.env.PUBLIC_URL + "/images/wallet.png"} alt="" />
              <p className="fw-bold fs-4">Thanh toán đơn giản</p>
              <span>Phương thức thanh toán tiện lợi an toàn. Tích hợp chức năng lưu thẻ để đặt phòng lần sau.</span>
            </div>
          </div>
          <div className="row p-5 fs-5">
            <div className="col-3">
              <img src={process.env.PUBLIC_URL + "/images/backpack.png"} alt="" />
              <p className="fw-bold fs-4">Ưu đãi mỗi ngày</p>
              <span>Nhận thông báo ưu đãi từ GoShip đễ săn những mã giảm giá hằng ngày nha.</span>
            </div>
            <div className="col-3">
              <img src={process.env.PUBLIC_URL + "/images/top-sales.png"} alt="" />
              <p className="fw-bold fs-4">Tiện ích thông minh</p>
              <span>Check-in và kiểm tra đơn hàng nhanh chóng và tiện lợi</span>
            </div>
          </div>
        </div>
        <div className="position-absolute login-form-position layout-boder shadow-lg p-5 mb-5 bg-body maxWidth-form">
          <div className="d-flex flex-column align-items-center fs-5">
            <p className="fw-bold m-3 fs-4">Đăng ký thành viên</p>

            <div className="w-100 m-1">
              <span className="fw-bold">Số điện thoại</span>
              <div className="d-flex flex-row">
                <input
                  value={areaCode}
                  className="form-control layout-boder fs-5 w-25 me-2"
                  type="text"
                  readOnly />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control layout-boder fs-5"
                  type="text"
                  placeholder="0123456789" />
              </div>
            </div>

            <div className="w-100 m-1">
              <span className="fw-bold">Mật khẩu</span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control layout-boder fs-5"
                type="password"
                placeholder="********" />
            </div>
            <div className="w-100 m-1">
              <span className="fw-bold">Xác nhận mật khẩu</span>
              <input
                onChange={(e) => setRePassword(e.target.value)}
                className="form-control layout-boder fs-5"
                type="password"
                placeholder="********" />
            </div>
            <button
              onClick={handleRegister}
              className="form-control layout-boder bg-primary text-white m-3 fs-5"
            >Đăng ký</button>
            <div id="recaptcha-container"></div>
            <div className="m-3 text-center">
              <span>Bạn đã có tài khoản GoShip? </span>
              <p className="text-primary event-hover" onClick={navigateLogin}>Nhấn vào đây</p>
            </div>
            <div className="text-center">
              <p>Tôi đồng ý với Bảo mật và Điều khoản
                hoạt động của GoShip</p>
            </div>
          </div>
        </div>
      </div>
      {
        openBoxOTP ?
          <>
            <div className="modal active text-dark" onClick={handleHideOTP}>
              <div
                className="d-flex flex-column flex-wrap align-content-center flex-wrap align-items-center position-relative bg-white p-5 layout-boder"
                onClick={e => e.stopPropagation()}
              >
                <h2>XÁC THỰC TÀI KHOẢN</h2>
                <i className="fa-sharp fa-solid fa-comment-sms fs-1"></i>
                <span className="fs-5">Nhập mã OTP</span>
                <span className="fw-lighter">Chúng tôi đã gửi và SMS có mã kích hoạt đến điện thoại của bạn</span>
                <span>{phone}</span>
                <input
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  type="text"
                  className="form-control text-center" />
                <span className="text-primary event-hover"> Gửi lại mã</span>
                <button
                  onClick={handleAcceptOTP}
                  className="btn btn-primary"
                >Xác nhận</button>
              </div>
            </div>
          </>
          : <></>
      }

      {
        isError ?
          <MessageBox
            title={constraint.NOTIFICATION}
            icon="fa-solid fa-circle-xmark text-danger"
            message={messageError}
            handleAcceptError={handleHideNotification} />
          :
          <></>
      }
      {
        registerSuccess ?
          <MessageBox
            title={constraint.SUCCESS}
            icon="fa-solid fa-circle-check text-success"
            message="Bạn đã đăng ký tài khoản thành công!"
            handleAcceptError={handleRegisterSuccess} />
          :
          <></>
      }
      {
        waiting ?
          <MessageBox
            title={constraint.NOTIFICATION}
            icon="fa-solid fa-arrows-rotate text-danger"
            message={"Đang Xử Lý! Vui lòng chờ"}
            handleAcceptError={handleHideNotification}
          />
          :
          <></>
      }
    </>
  );
}

export default Register;