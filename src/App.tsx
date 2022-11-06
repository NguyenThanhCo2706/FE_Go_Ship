import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';


// import Footer from './Component/Base/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
