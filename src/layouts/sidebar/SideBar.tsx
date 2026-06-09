import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/images/ieka_logo.jpg";
import employeeManagementIcon from "../../assets/images/employee_management.png";

import "./Sidebar.css";
import { MenuItem, SubMenuItem } from "../../types/sidebar-types";
import { menuItems } from "../../constants/constants";
import { useAuthStore } from "../../store/auth-store";
import Image from "../../components/common/image";



interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  active: string;
  setActive: (active: string) => void;
}

const Sidebar = ({ isOpen, setIsOpen, active, setActive }: SidebarProps) => {
  const navigate = useNavigate();
   const location = useLocation();
   const {profile} = useAuthStore();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    
  });

  const toggleMenu = (menuLabel: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuLabel]: !prev[menuLabel],
    }));
  };

  const handleMenuItemClick = (menuItem: MenuItem | SubMenuItem) => {
    setActive(menuItem.label);
    navigate(menuItem.path!);
  };

  return (
    <div className={`sidebar ${!isOpen ? "collapsed" : ""}`} id="sidebar">
      <div className="logo-area">
        <div className="logo">
          <NavLink to="/">
            <Image src={profile?.company?.companyLogo || logo} alt="Logo" />
          </NavLink>
        </div>
      </div>

      <div className="menu-scroll-container">
        <ul className="sidebar-menu">
          <li className="menu-title menu-section-title">
            <div
              className="moduletoggle"
              data-bs-toggle="modal"
              data-bs-target="#all_modules"
            >
              <img
                src={employeeManagementIcon}
                className="menutitleimage employee_manage"
                width="35"
                alt="Employee Management"
              />
              <span className="modulename">Company Management</span>
            </div>
          </li>

          {menuItems.map((menu) =>
            menu.submenu ? (
              <li
                key={menu.label}
                className={`menu-item dropdown ${
                  openMenus[menu.label] ? "open" : ""
                }`}
              >
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMenu(menu.label);
                  }}
                >
                  <i className={menu.icon}></i>

                  <span>{menu.label}</span>

                  <i
                    className={`fas fa-angle-right dropdown-icon ${
                      openMenus[menu.label] ? "rotate" : ""
                    }`}
                  ></i>
                </div>

                {openMenus[menu.label] && (
                  <ul className="submenu">
                    {menu.submenu.map((subMenu) => (
                      <li
                        key={subMenu.path}
                        className={`menu-item ${
                          location.pathname === subMenu.path ? "active" : ""
                        }`}
                      >
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            handleMenuItemClick(subMenu);
                          }}
                        >
                          {subMenu.label}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={menu.path}
                className={`menu-item ${location.pathname === menu.path ? "active" : ""}`}
              >
                <div
                  onClick={() => {
                    setOpenMenus({});
                    handleMenuItemClick(menu);
                  }}
                >
                  <i className={menu.icon}></i>

                  <span>{menu.label}</span>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
