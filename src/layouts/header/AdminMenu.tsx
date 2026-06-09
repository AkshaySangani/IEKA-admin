import { useEffect, useRef, useState } from "react";
import UserAvatar from "../../assets/images/sunny.jpg";
import "./AdminMenu.css";
import { NavLink } from "react-router-dom";
import Modal from "../../components/common/modal/Modal";
import { removeLocalStorageData } from "../../utils/helper";
import { storageKeys } from "../../constants/constants";
import { useAuthStore } from "../../store/auth-store";

const AdminMenu = () => {
  const {clearAuth, profile} = useAuthStore();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // logout
  const handleLogout = () => {
    removeLocalStorageData(storageKeys.authStorage);
    clearAuth();    
  };

  // menu open-close
  const handleMenuOenClose = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <>
      <div className="header-right" ref={dropdownRef}>
        <div
          className="profile-dropdown-container"
          id="profileDropdownContainer"
        >
          <div
            className="profile-info"
            id="userAvatar"
            onClick={handleMenuOenClose}
          >
            <img src={UserAvatar} alt="User" />
            <div className="userareadetails">
              <span className="username">{profile?.firstName}{" "}{profile?.lastName}</span>
              <span className="userposition">Admin</span>
            </div>
          </div>
          <div
            className={`profile-dropdown ${menuOpen ? "open" : ""}`}
            id="profileDropdown"
          >
            <div className="dropdown-group-title">Account</div>
            <ul>
              <li>
                <NavLink to="/my-profile" onClick={handleMenuOenClose}>
                  <i className="fas fa-user-circle"></i> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/change-password" onClick={handleMenuOenClose}>
                  <i className="fas fa-lock"></i> Password Change
                </NavLink>
              </li>
            </ul>

            <ul
              style={{
                marginBottom: "0",
                marginTop: "10px",
                borderTop: "1px solid var(--border-color)",
                paddingTop: "10px",
              }}
            >
              <li
                className="logout-item"
                onClick={() => setLogoutOpen((prev) => !prev)}
              >
                <div>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Modal
        isOpen={logoutOpen}
        title={"Logout"}
        onClose={() => setLogoutOpen((prev) => !prev)}
        handleOnConfirm={handleLogout}
      >
        <div className="px-6 py-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <i className="fas fa-sign-out-alt text-2xl text-red-500"></i>
          </div>

          <h4 className="mb-2 text-lg font-semibold text-gray-800">
            Are you sure you want to logout?
          </h4>

          <p className="text-sm text-gray-500">
            You are about to logout from your account. You will need to login
            again to access the system.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default AdminMenu;
