import AdminMenu from "./AdminMenu";
import "./Header.css";

interface HeaderProps {
    setIsOpen?: (open: boolean) => void;
    isOpen?: boolean;
}

const Header = ({ setIsOpen, isOpen }: HeaderProps) => {
  return (
    <header className={`header ${isOpen ? "sidebar-open" : "sidebar-closed"}`} id="header">
      <div className="sidebar-toggle" id="sidebarToggle" onClick={() => setIsOpen && setIsOpen(!isOpen)}>
        <i className="fas fa-bars"></i>
      </div>
      <AdminMenu/>
    </header>
  );
};

export default Header;
