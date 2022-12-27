import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Component/New/Home";
import Main from "./Component/New/Main";
import "./newApp.css";
import Profile from "./Component/New/Profile";
import Order from "./Component/New/Order";
import History from "./Component/New/History";
import Map from "./Component/New/Travel";
import Chat from "./Component/New/Chat";
import ChildChat from "./Component/New/ChildChat";
import Detail from "./Component/New/Detail";
import Header from "./Component/New/Header";
import { useEffect, useState } from "react";
import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import jwt_decode from "jwt-decode";
import Page404 from "./Component/Commons/Page404";


const NewApp = () => {
  const [phone, setPhone] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [avatar, setAvatar] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const tokenDecode: any = jwt_decode(localStorage.getItem("token") || "");
      setPhone(tokenDecode.phone_number);

      // userApi.getDetail().then(data => {
      //   setAvatar(data.avatar_url) 
      setValidToken(true);
      //   navigate("/home");

      // });
    }
    catch (err) {
      console.log(err)
      navigate("/")
      setValidToken(false);
    }
  }, [localStorage.getItem("token")])

  return (
    <>
      {validToken ? <Header avatar={avatar} /> : <></>}
      <Routes>
        <Route
          path="/"
          element={<Login
            phone={phone}
            setPhone={setPhone}
            vali
            setValidToken={setValidToken}
          />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={<Page404 />} />
        {
          validToken ?
            <>
              <Route
                path="/home"
                element={<Main />}
              />
              <Route
                path="/home/profile"
                element={<Home><Profile myPhone={phone} setAvatar={setAvatar} /></Home>}
              />
              <Route
                path="/home/order"
                element={<Home><Order myPhone={phone} /></Home>}
              />
              <Route
                path="/home/map"
                element={<Home><Map /></Home>}
              />
              <Route
                path="/home/history"
                element={<Home><History /></Home>}
              />
              <Route
                path="/home/history/detail/:id"
                element={<Detail />}
              />
              <Route
                path="/home/chat"
                element={<Chat myPhone={phone} />}
              />
              <Route path="/home/chat/:yourPhone" element={
                <Chat myPhone={phone}
                  children={<ChildChat myPhone={phone} />}
                />
              }
              />
            </>
            :
            <></>
        }
      </Routes>
    </>
  )
}

export default NewApp;
