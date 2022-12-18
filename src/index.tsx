import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css';
import NewApp from './newApp';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <App />
  </Router>
  // <NewApp />
);
