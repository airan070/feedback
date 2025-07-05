import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardProfessor from "./pages/DashboardProfessor";
import AddActivityPage from "./pages/AddActivityPage"; 

function App() {
  const [user, setUser] = useState(() => {
    const userObj = localStorage.getItem("user");
    if (userObj) return JSON.parse(userObj);
    return null;
  });

  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user
              ? user.tip === "profesor"
                ? <DashboardProfessor user={user} onLogout={handleLogout} />
                : <DashboardStudent user={user} onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Ruta pentru creare activitate */}
        <Route
          path="/add-activity"
          element={
            user && user.tip === "profesor"
              ? <AddActivityPage
                  onBack={() => window.history.back()}
                />
              : <Navigate to="/" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
