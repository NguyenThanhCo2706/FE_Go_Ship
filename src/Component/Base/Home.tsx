import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat";
import Profile from "../Profile/Profile";
import Map from "../Map/Map";
import { FC, useState } from "react";

const Home: FC<{ children: any }> = ({ children }) => {
  const [isShow, setIsShow] = useState(false)

  const showNavbar = () => {
    setIsShow(!isShow)
  }

  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid">
        <div className="row max-height">
          <div className="col-1 fw-bolder fs-6 bg-navbar text-white">
            <div className="d-flex flex-row align-items-center m-4 ms-2 event-hover">
              <img className="img-logo" src={process.env.PUBLIC_URL + "/images/go_ship_2.png"} alt="" />
              <span className="ms-2 fs-5">GO SHIP</span>
            </div>
            <div>
              <div className="p-3 item-navbar" onClick={() => navigate("/home")}>
                <i className="fa-solid fa-house me-3"></i>
                <span>Home</span>
              </div>
              <div className="p-3 item-navbar" onClick={() => navigate("/home/order")}>
                <i className="fa-solid fa-plus me-3"></i>
                <span>Add Order</span>
              </div>
              <div className="p-3 item-navbar" onClick={() => navigate("/home/map")}>
                <i className="fa-solid fa-map me-3"></i>
                <span>Map</span>
              </div>
              <div className="p-3 item-navbar" onClick={() => navigate("/home/profile")}>
                <i className="fa-solid fa-user me-3"></i>
                <span>Profile</span>
              </div>
              <div className="p-3 item-navbar" onClick={() => navigate("/home/chat")}>
                <i className="fa-solid fa-message me-3"></i>
                <span>Chat</span>
              </div>
            </div>
          </div>
          <div className="col-11">
            {children ? children : <>Home</>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;



{/* <div className={classnames({ "body-pd": isShow })}>
        <header className={classnames("header", { "body-pd": isShow })} id="header">
          <div className="header_toggle" onClick={showNavbar}> <i className='bx bx-menu' id="header-toggle"></i> </div>
          <div className="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt="" /> </div>
        </header>
        <div className={classnames("l-navbar", { show: isShow })} id="nav-bar">
          <nav className="nav">
            <div>
              <a href="#" className="nav_logo">
                <i className='bx bx-layer nav_logo-icon'></i>
                <span className="nav_logo-name">BBBootstrap</span>
              </a>
              <div className="nav_list">
                <a href="#" className="nav_link active">
                  <i className='bx bx-grid-alt nav_icon'></i>
                  <span className="nav_name">Dashboard</span>
                </a>
                <a href="#" className="nav_link">
                  <i className='bx bx-user nav_icon'></i>
                  <span className="nav_name">Users</span>
                </a>
                <a href="#" className="nav_link">
                  <i className='bx bx-message-square-detail nav_icon'></i>
                  <span className="nav_name">Messages</span>
                </a>
                <a href="#" className="nav_link">
                  <i className='bx bx-bookmark nav_icon'></i>
                  <span className="nav_name">Bookmark</span>
                </a>
                <a href="#" className="nav_link">
                  <i className='bx bx-folder nav_icon'></i>
                  <span className="nav_name">Files</span>
                </a>
                <a href="#a" className="nav_link">
                  <i className='bx bx-bar-chart-alt-2 nav_icon'></i>
                  <span className="nav_name">Stats</span>
                </a>
              </div>
            </div> <a href="#" className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">SignOut</span> </a>
          </nav>
        </div>
      </div>
      <div className="height-100 bg-light">
        <h4>Main Components</h4>
      </div> */}


