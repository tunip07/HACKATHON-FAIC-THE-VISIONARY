/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import RegisterVehicle from './pages/RegisterVehicle';
import RegisterAccount from './pages/REG';
import Login from './pages/Login';
import Success from './pages/Success';
import Services from './pages/Services';
import EmailConfirmation from './pages/EmailConfirmation';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordSuccess from './pages/ResetPasswordSuccess';
import Layout from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<RegisterVehicle />} />
          <Route path="/reg" element={<RegisterAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password-success" element={<ResetPasswordSuccess />} />
          <Route path="/email-confirmation" element={<EmailConfirmation />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/services" element={<Services />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/success" element={<Success />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
