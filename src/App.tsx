import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Chat from "./Component/Chat/Chat";
import Home1 from "./Component/Base/Home1";
import Map from "./Component/Map/Map";
import Profile from "./Component/Profile/Profile";

import "./App.css";
import { useState } from "react";
import Order from "./Component/Order/Order";
import ChildChat from "./Component/Chat/ChildChat";
// import Footer from './Component/Base/Footer';

function App() {
  const [phone, setPhone] = useState("0941383449");
  const aaa = {
    phone: phone
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login phone={phone} setPhone={setPhone} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home/chat/:yourPhone" element={
            <Home1>
              <Chat
                phone={phone}
                children={<ChildChat myPhone={phone} yourPhone="0123456789" />}
              />
            </Home1 >
          }
          />

          <Route path="/home/chat" element={
            <Home1>
              <Chat phone={phone} ></Chat>
            </Home1 >
          }
          />
          <Route path="/home/profile" element={
            <Home1>
              <Profile phone={phone} />
            </Home1 >
          }
          />
          <Route path="/home/map" element={
            <Home1>
              <Map />
            </Home1 >
          }
          />
          <Route path="/home/order" element={
            <Home1>
              <Order />
            </Home1 >
          }
          />
          <Route path="/home" element={
            <Home1>
            </Home1 >
          }
          />
        </Routes>
      </Router>

    </>
  );
}

export default App;
