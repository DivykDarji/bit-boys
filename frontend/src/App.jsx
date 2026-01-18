import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/landing/index.jsx";
import Home from "./pages/home/index.jsx";
import RegisterPage from "./pages/register/index.jsx";
import LoginPage from "./pages/login/index.jsx";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import Authorize from "./pages/authorize";
import AuthHub from "./pages/auth-hub";
import ProviderHealth from "./pages/provider-auth/health";
import ProviderFarm from "./pages/provider-auth/farm";
import ProviderCity from "./pages/provider-auth/city";
import Profile from "./pages/profile/index.jsx";


/* ================= PROTECTED ROUTE ================= */

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/authorize"
          element={
            <ProtectedRoute>
              <Authorize />
            </ProtectedRoute>
          }
        />

        <Route path="/auth-hub" element={<AuthHub />} />

        <Route
          path="/provider-auth/health"
          element={
            <ProtectedRoute>
              <ProviderHealth />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider-auth/farm"
          element={
            <ProtectedRoute>
              <ProviderFarm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider-auth/city"
          element={
            <ProtectedRoute>
              <ProviderCity />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
