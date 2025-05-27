import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Destinasi from "./pages/Destinasi";
import DestinationDetail from "./pages/DestinationsDetail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPages";
import Profile from "./pages/Profile";
import useAuthStore from "./Auth/AuthStore";

const App = () => {
  const { checkSession } = useAuthStore();

  useEffect(() => {
    useAuthStore.getState().checkSession();
  }, []);

  return (
    <Router>
      <div className=" min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinasi />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
