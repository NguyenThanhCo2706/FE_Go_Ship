import { useNavigate } from "react-router-dom";
import { URL_IMAGES } from "../../constraint";



const Header = (props: any) => {
  const avatar = props.avatar;

  const navigate = useNavigate();
  return (
    <>
      <div className="header d-flex align-items-center border-bottom shadow bg-header">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-4">
              <div className="d-flex flex-row align-items-center height-content-nav">
                <div onClick={() => navigate("/home")} className="d-flex flex-row align-items-center hover">
                  <img
                    className="header-logo me-2"
                    src={process.env.PUBLIC_URL + "/images/go_ship_2.png"}
                    alt="" />
                  <div className="d-flex flex-column me-5">
                    <span className="fs-5 fw-bold">GoShip</span>
                    <span className="fs-6 fw-bold text-white">Delivery</span>
                  </div>
                </div>


              </div>
            </div>
            <div className="col-4">
              <div className="input-group w-75">
                <input type="text" className="form-control border-radius bg-light shadow" />
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row justify-content-around align-items-center fw-bold fs-6 w-100">
                  <div onClick={() => navigate("/home/order")} className="nav-header-item">Đặt đơn</div>
                  <div onClick={() => navigate("/home/map")} className="nav-header-item">Bản đồ</div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <div
                    onClick={() => navigate("/home/history")}
                    className="button-icon shadow rounded-circle hover">
                    <i className="fa-solid fa-cart-shopping header-color fs-5"></i>
                  </div>
                  <div
                    onClick={() => navigate("/home/chat")}
                    className="button-icon shadow rounded-circle ms-3 me-3 hover">
                    <i className="fa-brands fa-rocketchat header-color fs-5"></i>
                  </div>
                  <div className="hover" onClick={() => navigate("/home/profile")} >

                    <img className="nav-avatar border shadow"
                      src={avatar || ""}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = URL_IMAGES.DEFAULT_AVATAR
                      }}
                      alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;
