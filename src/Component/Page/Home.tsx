import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import MessageBox from "../Commons/MessageBox";
import { MESSAGES } from "../../constraint";
import { useEffect, useState } from "react";


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
  const [isActive, setActive] = useState(1);

  useEffect(() => {
    const node: any = document.getElementById(String(isActive));
    node.classList.add("nav-color")
  }, [isActive])

  const handleClick = (link: string, number: number) => {
    const node: any = document.getElementById(String(isActive));
    node.classList.remove("nav-color")
    navigate(link);
    setActive(number)
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
                  onClick={() => handleClick("/home/profile", 1)}
                  id="1"
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
                  onClick={() => handleClick("/home/order", 2)}
                  id="2"
                  className="d-flex flex-row align-items-center border-radius p-2 content-nav ">
                  <div className="background-icon me-3 shadow-sm">
                    <i className="fa-solid fa-cart-plus fs-3"></i>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-bold">Đơn hàng</span>
                    <span>Thêm một đơn hàng mới</span>
                  </div>
                </div>
                <div
                  onClick={() => handleClick("/home/map", 3)}
                  id="3"
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
                  onClick={() => handleClick("/home/history", 4)}
                  id="4"
                  className="d-flex flex-row align-items-center border-radius p-2 content-nav">
                  <div className="background-icon me-3 shadow-sm">
                    <i className="fa-solid fa-timeline fs-3"></i>
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
                    Đăng xuất
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
          />
          :
          <></>
      }
    </>
  )
}

export default Home;