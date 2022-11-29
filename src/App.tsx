import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Chat from "./Component/Chat/Chat";
import Home from "./Component/Base/Home";
import Map from "./Component/Map/Map";
import Profile from "./Component/Profile/Profile";

import "./App.css";
import { useState } from "react";
import Order from "./Component/Order/Order";
// import Footer from './Component/Base/Footer';

function App() {
  const [phone, setPhone] = useState("0941383449");
  console.log(phone);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login phone={phone} setPhone={setPhone} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/chat" element={
            <Home>
              <Chat phone={phone} />
            </Home >
          }
          />
          <Route path="/home/profile" element={
            <Home>
              <Profile />
            </Home >
          }
          />
          <Route path="/home/map" element={
            <Home>
              <Map />
            </Home >
          }
          />
          <Route path="/home/order" element={
            <Home>
              <Order />
            </Home >
          }
          />
          <Route path="/home" element={
            <Home>
            </Home >
          }
          />
        </Routes>
      </Router>

    </>
  );
}

export default App;
