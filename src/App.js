import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookClubs from "./pages/BookClubs";
import Recommendations from "./pages/Recommendations";
import AuthorEngagement from "./pages/AuthorEngagement";
import BookMarketplace from "./pages/BookMarketplace";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-clubs" element={<BookClubs />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/author-engagement" element={<AuthorEngagement />} />
            <Route path="/book-marketplace" element={<BookMarketplace />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
