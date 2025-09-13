import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaFolderOpen,
  FaUserPlus,
  FaChevronDown,
  FaRobot,
  FaList,
  FaCog,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Sidebar = ({ setOpenModal, setSidebarType }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  // Mở submenu theo route hiện tại khi load lại trang
  useEffect(() => {
    if (location.pathname.startsWith("/admin/Create")) {
      setOpenSubmenu("user");
    } else if (
      location.pathname.startsWith("/admin/tailieu") ||
      location.pathname.startsWith("/admin/DanhMuc")
    ) {
      setOpenSubmenu("document");
    } else {
      setOpenSubmenu(null);
    }
  }, [location.pathname]);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <aside className="tw-w-72 tw-min-h-screen tw-bg-gray-100 tw-text-black tw-shadow-xl tw-flex tw-flex-col">
      {/* Header */}
      <div className="tw-p-4 tw-text-2xl tw-font-bold tw-border-b tw-border-r tw-border-gray-300 tw-tracking-wide">
        <Link
          to="/admin"
          className="tw-flex tw-items-center tw-gap-2 hover:tw-text-blue-500 transition-colors duration-300"
        >
          Dashboard Admin
        </Link>
      </div>

      {/* Menu */}
      <nav className="tw-p-4 tw-space-y-2 tw-text-sm tw-flex-1">
        {/* MODULE USER */}
        <div>
          <button
            onClick={() => toggleSubmenu("user")}
            className="tw-w-full tw-flex tw-justify-between tw-items-center tw-px-3 tw-py-2 tw-rounded-lg hover:tw-bg-gray-200 transition-colors duration-300"
          >
            <span className="tw-flex tw-items-center tw-gap-2">
              <FaUsers />
              Quản lý người dùng
            </span>
            <FaChevronDown
              className={`tw-transition-transform duration-300 ${
                openSubmenu === "user" ? "tw-rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`tw-overflow-hidden tw-transition-all duration-500 ${
              openSubmenu === "user"
                ? "tw-max-h-40 tw-opacity-100 tw-shadow-lg tw-bg-gray-100 tw-rounded-lg tw-mt-1"
                : "tw-max-h-0 tw-opacity-0"
            }`}
          >
            <Link
              to="/admin/Create"
              className={`tw-flex tw-items-center tw-gap-2 tw-ml-6 tw-mt-2 tw-px-2 tw-py-2 tw-rounded-lg hover:tw-bg-gray-200 transition-colors duration-300 ${
                location.pathname.startsWith("/admin/Create")
                  ? "tw-bg-gray-200"
                  : ""
              }`}
            >
              <FaUserPlus /> Tạo mới người dùng
            </Link>
          </div>
        </div>

        {/* MODULE TÀI LIỆU */}
        <div>
          <button
            onClick={() => toggleSubmenu("document")}
            className="tw-w-full tw-flex tw-justify-between tw-items-center tw-px-3 tw-py-2 tw-rounded-lg hover:tw-bg-gray-200 transition-colors duration-300"
          >
            <span className="tw-flex tw-items-center tw-gap-2">
              <FaFolderOpen />
              Tài liệu & Danh mục
            </span>
            <FaChevronDown
              className={`tw-transition-transform duration-300 ${
                openSubmenu === "document" ? "tw-rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`tw-overflow-hidden tw-transition-all duration-500 ${
              openSubmenu === "document"
                ? "tw-max-h-40 tw-opacity-100 tw-shadow-lg tw-bg-gray-100 tw-rounded-lg tw-mt-1"
                : "tw-max-h-0 tw-opacity-0"
            }`}
          >
            <Link
              to="/admin/tailieu"
              className={`tw-flex tw-items-center tw-gap-2 tw-ml-6 tw-mt-2 tw-px-2 tw-py-2 tw-rounded-lg hover:tw-bg-gray-200 transition-colors duration-300 ${
                location.pathname.startsWith("/admin/tailieu")
                  ? "tw-bg-gray-200"
                  : ""
              }`}
            >
              <FaFolderOpen /> Quản lý tài liệu
            </Link>
            <Link
              to="/admin/DanhMuc"
              className={`tw-flex tw-items-center tw-gap-2 tw-ml-6 tw-mt-1 tw-px-2 tw-py-2 tw-rounded-lg hover:tw-bg-gray-200 transition-colors duration-300 ${
                location.pathname.startsWith("/admin/DanhMuc")
                  ? "tw-bg-gray-200"
                  : ""
              }`}
            >
              <FaList /> Quản lý danh mục
            </Link>
          </div>
        </div>

        {/* MODULE CHATBOT */}
        <Link
          to="/admin/ChatAgent"
          onClick={() => setSidebarType("chat")} // bỏ e.preventDefault
          className={`tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-2 tw-rounded-lg hover:tw-bg-gray-200 transition-colors duration-300 ${
            location.pathname.startsWith("/admin/ChatAgent")
              ? "tw-bg-gray-200"
              : ""
          }`}
        >
          <FaRobot /> ChatBot Agent
        </Link>

        {/* MODULE setting */}
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault(); // chặn điều hướng thật sự
            setOpenModal(true); // mở modal
          }}
          className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-2 tw-rounded-lg hover:tw-bg-gray-200 transition-colors duration-300"
        >
          <FaCog /> Cài đặt hệ thống
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
