import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Registration from "./pages/Registration";
import Bikes from "./pages/Bikes";
import "react-datetime/css/react-datetime.css";

function App() {
  return (
    <Router>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
