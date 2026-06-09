import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftPanel from "../components/auth/LeftPannel/LeftPanel";
import AuthLogo from "../components/auth/AuthLogo/AuthLogo";
import "../pages/login/LoginPage.css";

const AuthLayout: React.FC = () => {
  const [active, setActive] = useState<string>("Dashboard");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-wrap h-[100vh] ">
      <LeftPanel />
      <div className="login-right">
        <AuthLogo />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;