import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import authApi from '../../api/authApi';
import { setLocalStorage } from '../../utils';
import { yupAuth } from '../../validation/validation';
import MessageBox from '../Commons/MessageBox';
import constraint from '../../constraint';

import './auth.css'


const Login = () => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate()

  const navigateRegister = () => {
    navigate("/register")
  }

  const handleLogin = async () => {
    try {
      await yupAuth.validate({
        phone_number: phone,
        password: password,
      })
      const response = await authApi.login(phone, password);
      console.log(response.data)
      if (response?.data?.access_token) {
        setLocalStorage(response.data.access_token);
      }
      navigate("/home");
    }
    catch (err) {
      setIsError(true);
      setMessageError(String(err));
      console.log((err));
    }
  }
  const handleAcceptError = () => {
    setIsError(false);
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
          <div className="col-4 row">
            <div className="d-flex flex-column align-items-center">
              <img src={process.env.PUBLIC_URL + "/images/go_ship.png"} alt="" className="img-logo" />
              <span className="text-primary fw-bold fs-3">Go Ship</span>
            </div>
          </div>
          <div className="col-8 d-flex flex-row justify-content-evenly align-items-center">
            <div>TRANG CHỦ</div>
            <div>DỊCH VỤ</div>
            <div>TUYỂN DỤNG</div>
            <div>VỀ CHÚNG TÔI</div>
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
        <div className="position-absolute login-form-position layout-boder p-5 shadow-lg p-3 mb-5 bg-body maxWidth-form">
          <div className="d-flex flex-column align-items-center fs-5">
            <p className="fw-bold m-3 fs-4">Đăng nhập</p>
            <p className="fw-bold mb-4">Đăng nhập GoShip để sử dụng ứng dụng</p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className="form-control layout-boder m-3 fs-5"
              type="text"
              placeholder="Địa chỉ email hoặc số điện thoại"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="form-control layout-boder m-3 fs-5"
              type="password"
              placeholder="Mật khẩu"
            />
            <button className="form-control layout-boder bg-primary text-white m-3 fs-5" onClick={handleLogin}>Đăng nhập</button>
            <div className="m-3">
              <span>Quên mặt khẩu? </span>
              <span className="text-primary event-hover">Nhấn vào đây</span>
            </div>
            <div className="m-3 mb-5">
              <span>Bạn chưa có tài khoản GoShip? </span>
              <span className="text-primary event-hover" onClick={navigateRegister}>Đăng ký</span>
            </div>
          </div>
        </div>
      </div>
      {
        isError ?
          <MessageBox
            title={constraint.NOTIFICATION}
            icon="fa-solid fa-circle-xmark text-danger"
            message={messageError}
            handleAcceptError={handleAcceptError}
          />
          :
          <></>
      }
    </>
  );
}

export default Login;