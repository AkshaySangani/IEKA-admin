import React from "react";
import { Outlet } from "react-router-dom";
import LeftPanel from "../components/auth/LeftPannel/LeftPanel";
import AuthLogo from "../components/auth/AuthLogo/AuthLogo";
import "../pages/login/LoginPage.css";

const AuthLayout: React.FC = () => {

  return (
    <div className="flex flex-wrap h-[100vh] ">
      <LeftPanel />
      <div className="login-right flex flex-1 flex-col justify-center py-0 px-[5%]">
        <AuthLogo />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;