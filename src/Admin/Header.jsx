import { FaHome } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { pageTitles, roleLabels } from "./utils/pageTitles";
import { useAuth } from "../components/AuthContext/AuthContext";
import { useState } from "react";

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Trang quản trị";

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="tw-sticky tw-top-0 tw-z-50 tw-border-b tw-bg-white">
      <div className="tw-flex tw-h-16 tw-items-center tw-justify-between tw-px-4">
        {/* Left */}
        <div className="tw-flex tw-items-center tw-space-x-3">
          <button
            className="tw-block lg:tw-hidden tw-p-2 tw-rounded hover:tw-bg-gray-100"
            onClick={onMenuClick}
          >
            <FiMenu className="tw-h-5 tw-w-5 tw-text-gray-700" />
          </button>

          <div className="tw-h-9 tw-w-9 tw-rounded-lg tw-bg-gray-900 tw-flex tw-items-center tw-justify-center">
            <FaHome className="tw-w-5 tw-h-5 tw-text-white" />
          </div>

          <div className="tw-hidden md:tw-block">
            <h1 className="tw-text-base tw-font-semibold">{title}</h1>
          </div>
        </div>

        {/* Right */}
        <div className="tw-relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="tw-flex tw-items-center tw-gap-2 tw-bg-gray-200 tw-rounded-full tw-px-3 tw-py-1"
          >
            <span className="tw-font-medium">{user?.name || "User"}</span>
          </button>

          {dropdownOpen && (
            <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-64 tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-4">
              {user ? (
                <>
                  <div className="tw-border-b tw-pb-2 tw-mb-2">
                    <p className="tw-font-semibold">{user?.name}</p>
                    <p className="tw-text-sm tw-text-gray-500">{user?.email}</p>
                    <span className="tw-text-xs tw-bg-gray-100 tw-px-2 tw-py-1 tw-rounded">
                      {roleLabels[user?.role] || user?.role}
                    </span>
                  </div>
                </>
              ) : (
                <div className="tw-text-sm tw-text-gray-500">
                  Chưa đăng nhập
                </div>
              )}

              <ul className="tw-space-y-2">
                <li>
                  <button
                    onClick={handleLogout}
                    className="tw-w-full tw-text-left tw-text-red-500 hover:tw-bg-gray-100 tw-px-2 tw-py-1 tw-rounded cursor-pointer"
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
