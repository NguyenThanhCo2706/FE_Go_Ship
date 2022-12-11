import classNames from "classnames";

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat";
import Profile from "../Profile/Profile";
import Map from "../Map/Map";
import { FC, useEffect, useState } from "react";
import User from "../../interfaces/user";
import userApi from "../../api/userApi";
import { URL_IMAGES } from "../../constraint";

const Home1 = (props: any) => {
  console.log(props)
  const [active, setActive] = useState(true);
  const [profile, setProfile] = useState<User>();

  const navigate = useNavigate()

  useEffect(() => {
    userApi.getDetail()
      .then((response) => {
        setProfile(response)
      })
      .catch((error) => {

      });
  }, [])
  return (
    <>
      <div className={classNames("body-home", { "body-pd": active, "aaa": active })} id="body-pd">
        <header className={classNames("border-bottom", "header", { "body-pd": active })} id="header">
          <div className={classNames("header_toggle")} onClick={() => setActive(!active)}>
            <i className='ms-3 bx bx-menu' id="header-toggle"></i>
          </div>
          <div>
            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Loship.png" alt="" className="img-title" />
          </div>
          <div className="header_img border"> <img src={profile?.avatar_url || URL_IMAGES.DEFAULT_AVATAR} alt="" /> </div>
        </header>
        <div className={classNames("l-navbar", { "show": active })} id="nav-bar">
          <nav className="nav-home">
            <div>
              <p className="nav_logo event-hover" onClick={() => navigate("/home")}>
                <i className='bx bx-layer nav_logo-icon'></i>
                <span className="nav_logo-name">GOSHIP</span>
              </p>
              <div className="nav_list event-hover">
                <p className="nav_link event-hover" onClick={() => navigate("/home/profile")}>
                  <i className='bx bx-user nav_icon'></i>
                  <span className="nav_name">Profiles</span>
                </p>
                <p className="nav_link event-hover" onClick={() => navigate("/home/order")}>
                  <i className='fa-solid fa-plus nav_icon'></i>
                  <span className="nav_name">Order</span>
                </p>
                <p className="nav_link event-hover" onClick={() => navigate("/home/map")}>
                  <i className='fa-solid fa-map nav_icon'></i>
                  <span className="nav_name">Map</span>
                </p>
                <p className="nav_link event-hover" onClick={() => navigate("/home/chat")}>
                  <i className='fa-solid fa-message nav_icon'></i>
                  <span className="nav_name">Chat</span>
                </p>
              </div>
            </div>
            <p className="nav_link event-hover" onClick={() => navigate("/login")}>
              <i className='bx bx-log-out nav_icon'></i>
              <span className="nav_name">
                SignOut
              </span>
            </p>
          </nav>
        </div>
        {/* <!--Container Main start--> */}
        <div className="height-100 bg-light main-content">
          {props.children ? props.children :
            <>
              <img src="https://firebasestorage.googleapis.com/v0/b/chatapp-bf32e.appspot.com/o/Truck%2004.jpg?alt=media&token=74a8f019-0f5c-49f6-8858-bcda98b61002" alt="" className="img-background-home" />
            </>}
        </div>
      </div>
    </>
  )
}

export default Home1
