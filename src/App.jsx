import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Publish from "./pages/Publish/publish";
import "./App.css";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  // S'il y a un token déjà existant, sa valeur est stockée dans token, sinon, celui-ci est initialisé à une valeur nulle
  const setUser = (token) => {
    //fonction stockant la valeur du token dans un cookie
    if (token) {
      Cookies.set("userToken", token, { expires: 1 });
      setToken(token);
    } else {
      Cookies.remove("userToken");
      setToken(null);
    }
  };

  return (
    <div>
      <Router>
        <Header token={token} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers/:id" element={<Offer />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
          <Route path="/login" element={<LogIn setUser={setUser} />} />
          <Route path="/publish" element={<Publish token={token}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
