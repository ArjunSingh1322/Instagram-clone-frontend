import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import all pages
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import SignInForm from "./pages/SigninForm";
import Create from "./components/layout/Create";
import Profile from "./components/layout/Profile";
import Context from "./components/layout/Context";

const App = () => {
  return (
     <Context>
    <Router>
      <Routes>
       
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Profile" element={<Profile />} />
        
      
      </Routes>
    </Router>
    </Context>
  );
};

export default App;