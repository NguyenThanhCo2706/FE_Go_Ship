import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Map from "./Component/Home/Map";
import Profile from "./Component/Profile/Profile";


// import Footer from './Component/Base/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Map />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
