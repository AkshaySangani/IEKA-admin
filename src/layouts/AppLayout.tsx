import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/SideBar";
import Header from "./header/Header";
import "./AppLayout.css";

const AppLayout: React.FC = () => {
  const [active, setActive] = useState<string>("Dashboard");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setActive={setActive}
          active={active}
        />

        <>
          <Header setIsOpen={setIsOpen} isOpen={isOpen} />

          <main
            className={`main-content overflow-hidden relative flex flex-col flex-1 ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
            id="mainContent"
          >
            <Outlet />
          </main>
        </>
      </div>
      {window.innerWidth <= 991 && (
        <div
          className={`backdrop ${isOpen ? "visible" : ""}`}
          id="sidebarBackdrop"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AppLayout;
