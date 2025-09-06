import "../../global.css";

import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";


const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="tw-flex">
      {/* Sidebar */}
      <div
        className={`tw-fixed md:tw-static tw-z-40 tw-transition-transform tw-duration-300 
          ${sidebarOpen ? "tw-translate-x-0" : "-tw-translate-x-full"} 
          md:tw-translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main */}
      <div className="tw-flex-1 tw-flex tw-flex-col">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="tw-p-6 tw-bg-gray-100 tw-h-[calc(100vh-4rem)] tw-overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
