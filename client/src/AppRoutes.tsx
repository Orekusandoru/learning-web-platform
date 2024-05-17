import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import ActivatePage from "./pages/Auth/ActivatePage";
import ResetPassword from "./pages/Auth/ResetPassword";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm";

import { UserContextProvider } from "./components/UserContext";

export default function AppRoutes() {
  return (
   <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route path="/activate/:uid/:token" element={<ActivatePage/>} />
        </Route>
      </Routes>
   </UserContextProvider>
  );
}
