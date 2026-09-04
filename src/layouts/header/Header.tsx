import { useLocation } from "react-router-dom";
import { pathNames } from "../../constants/constants";
import AdminMenu from "./AdminMenu";

interface HeaderProps {
  setIsOpen?: (open: boolean) => void;
  isOpen?: boolean;
}

export const pathLabel = {
  ALL_COMPANIES: "All Companies",
  ADD_COMPANY: "Add Company",
  OWNER_DETAILS_ID: "Owner Details",
  OWNER_DETAILS: "Owner Details",
  COMPANY_DASHBOARD: "Company Dashboard",
  COMPANY_DASHBOARD_ID: "Company Dashboard",
} as const;

export const getPathLabel = (pathname: string): string => {
  const matchedKey = (
    Object.keys(pathNames) as Array<keyof typeof pathNames>
  ).find((key) => {
    const path = pathNames[key];

    // Exact match
    if (pathname === path) {
      return true;
    }

    // Handle dynamic routes like /employee-details/:id
    if (path.includes("/:")) {
      const pathParts = path.split("/");
      const pathnameParts = pathname.split("/");

      if (pathParts.length !== pathnameParts.length) {
        return false;
      }

      return pathParts.every(
        (part, index) =>
          part.startsWith(":") || part === pathnameParts[index],
      );
    }

    return false;
  });

  return matchedKey
    ? pathLabel[matchedKey] || matchedKey
    : "";
};

const Header = ({ setIsOpen, isOpen }: HeaderProps) => {
  const location = useLocation();
  const pathName = getPathLabel(location.pathname);
  return (
    <header
      id="header"
      className={`
        sticky top-0 right-0 z-[999]
        flex h-[60px]
        items-center justify-between
        border-b border-[#ccc]
        bg-white
        px-[20px]
        transition-all duration-300

        lg:px-[20px]
        max-[991px]:left-0
        max-[991px]:w-full
        max-[991px]:px-[15px]

        ${isOpen ? "left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"}
      `}
    >
      <div className="flex min-w-0 items-center">
        <div
          id="sidebarToggle"
          onClick={() => setIsOpen?.(!isOpen)}
          className="cursor-pointer p-[5px] text-[1.2rem] text-[#333]"
        >
          <i className="fas fa-bars" />
        </div>

        {/* Mobile Page Title */}

        <div className="ml-3 min-w-0 max-[991px]:block lg:hidden">
          <h1 className="truncate text-lg font-medium text-black">{pathName}</h1>
        </div>
      </div>

      <div className="flex items-center">
        <AdminMenu />
      </div>
    </header>
  );
};

export default Header;
