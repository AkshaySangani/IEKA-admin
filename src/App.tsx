import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import PublicRoute from './routes/PublicRoute';
import ForgotPassword from './pages/forgot-password';
import AuthLayout from './layouts/AuthLayout';
import OTPVerifyPage from './pages/otp-verify';
import ResetPasswordPage from "./pages/reset-password";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import AllCompanies from "./components/admin/all-companies/AllCompanies";
import AllPaymentsPage from "./pages/all-payments";
import GeneratedInvoicePage from "./pages/generated-invoice";
import AccountsPage from "./pages/accounts";
import MyProfilePage from "./pages/my-profile";
import ChangePasswordPage from "./pages/change-password";
import AddCompanyPage from "./pages/all-companies/add-company";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <AuthLayout />
          }
        >
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          <Route
            path="/otp-verify"
            element={
              <PublicRoute>
                <OTPVerifyPage />
              </PublicRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPasswordPage />
              </PublicRoute>
            }
          />
        </Route>
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AllCompanies />} />
          <Route path="add-company" element={<AddCompanyPage/>} />
          <Route path="all-payments" element={<AllPaymentsPage />} />
          <Route path="generated-invoice" element={<GeneratedInvoicePage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="my-profile" element={<MyProfilePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
