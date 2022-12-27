import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import History from "./History";
import Order from "./Order";
import authApi from "../../api/authApi";
import MessageBox from "../Commons/MessageBox";
import { MESSAGES } from "../../constraint";
import { useState } from "react";


const Home = (props: any) => {
  const { children } = props;
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const handleLogout = async () => {
    setWaiting(true);
    await authApi.logout();
    localStorage.removeItem("token");
    setWaiting(false);
    navigate("/");
  }
  return (
    <>
      <div className="container bg-light shadow bg-white pt-3">
        <div className="row p-1">
          <div className="col-3">
            <div className="d-flex flex-column h-100">
              <div className="fs-5 mb-3 fw-bold">
                <i className="fa-solid fa-list me-2 header-color"></i>
                <span className="">Danh Mục</span>
              </div>
              <div className="position-relative h-100 min-height">
                <div
                  onClick={() => navigate("/home/profile")}
                  className="d-flex flex-row align-items-center border-radius p-2 content-nav">
                  <div className="background-icon me-3 shadow-sm">
                    <i className="fa-solid fa-user fs-3"></i>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-bold">Tài khoản</span>
                    <span>Thông tin cá nhân</span>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/home/order")}
                  className="d-flex flex-row align-items-center border-radius p-2 content-nav">
                  <div className="background-icon me-3 shadow-sm">
                    <i className="fa-solid fa-cart-plus fs-3"></i>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-bold">Đơn hàng</span>
                    <span>Thêm một đơn hàng mới</span>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/home/map")}
                  className="d-flex flex-row align-items-center border-radius p-2 content-nav">
                  <div className="background-icon me-3 shadow-sm">
                    <i className="fa-solid fa-map fs-3"></i>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-bold">Bản đồ</span>
                    <span>Xem các Shiper gần bạn</span>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/home/history")}
                  className="d-flex flex-row align-items-center border-radius p-2 content-nav">
                  <div className="background-icon me-3 shadow-sm">
                    <i className="fa-solid fa-cart-shopping fs-3"></i>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-bold">Lịch sử</span>
                    <span>Xem Lịch sử đơn hàng</span>
                  </div>
                </div>
                <div className="position-absolute bottom-0 start-0  fs-5 mb-3">
                  <button
                    onClick={() => handleLogout()}
                    type="button"
                    className="btn btn-outline-secondary">
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          {children}
          {/* <Order /> */}
          {/* <History /> */}
        </div>
      </div>
      {
        waiting ?
          <MessageBox
            title={MESSAGES.NOTIFICATION}
            icon="fa-solid fa-arrows-rotate text-danger"
            message={"Đang Xử Lý! Vui lòng chờ"}
            handleAcceptError={() => { }}
          />
          :
          <></>
      }
    </>
  )
}

export default Home;