import { Link } from "react-router-dom";
import {
  FaUsers, FaFolderOpen,
  FaUserPlus, FaChevronDown
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <aside className="tw-w-72 tw-min-h-screen tw-bg-gray-900 tw-text-white tw-shadow-lg">
      <div className="tw-p-4 tw-text-2xl tw-font-bold tw-border-b tw-border-gray-700">
        <Link 
          to="/admin" 
          className="tw-flex tw-items-center tw-gap-2 hover:tw-text-blue-400"
        >
          Dashboard Admin
        </Link>
      </div>

      <nav className="tw-p-4 tw-space-y-2 tw-text-sm">
        {/* MODULE USER */}
        <button
          onClick={() => toggleSubmenu("user")}
          className="tw-w-full tw-flex tw-justify-between tw-items-center tw-px-3 tw-py-2 tw-rounded hover:tw-bg-gray-800"
        >
          <span className="tw-flex tw-items-center tw-gap-2">
            <FaUsers />
            Quản lý người dùng
          </span>
          <FaChevronDown 
            className={`tw-transition-transform ${openSubmenu === "user" ? "tw-rotate-180" : ""}`} 
          />
        </button>
        {openSubmenu === "user" && (
          <div className="tw-ml-6 tw-space-y-1">
            <Link 
              to="/admin/Create" 
              className="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1 tw-rounded hover:tw-bg-gray-800"
            >
              <FaUserPlus /> Tạo mới người dùng
            </Link>
          </div>
        )}

        {/* MODULE TÀI LIỆU */}
        <button
          onClick={() => toggleSubmenu("document")}
          className="tw-w-full tw-flex tw-justify-between tw-items-center tw-px-3 tw-py-2 tw-rounded hover:tw-bg-gray-800"
        >
          <span className="tw-flex tw-items-center tw-gap-2">
            <FaFolderOpen />
            Tài liệu & Danh mục
          </span>
          <FaChevronDown 
            className={`tw-transition-transform ${openSubmenu === "document" ? "tw-rotate-180" : ""}`} 
          />
        </button>
        {openSubmenu === "document" && (
          <div className="tw-ml-6 tw-space-y-1">
            <Link 
              to="/admin/TaiLieu" 
              className="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1 tw-rounded hover:tw-bg-gray-800"
            >
              <FaFolderOpen /> Quản lý tài liệu
            </Link>
            <Link 
              to="/admin/DanhMuc" 
              className="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1 tw-rounded hover:tw-bg-gray-800"
            >
              <FaFolderOpen /> Quản lý danh mục
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
