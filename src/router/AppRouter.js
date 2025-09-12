import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../components/AuthContext/AuthContext";
import { ChatProvider } from "../components/Context/ChatContext.jsx";
import ChefAI from "../components/chatbot/ChefAI";
import Login from "../components/Auth/Login.jsx";
import Register from "../components/Auth/Register.jsx";
import Private from "./Private";
import ResetPass from "../components/Auth/ResetPass.jsx";
import ChangePass from "../components/Auth/ChangePass.jsx";

import AdminLayout from "../Admin/Layouts/AdminLayout";
import DanhMuc from "../Admin/categories-management/DanhMuc";
import TaiLieu from "../Admin/docs-management/Page.jsx";
import Create from "../Admin/UserManagement/Create.jsx";
import ChatAgent from "../Admin/ChatBot/ChatAgent.jsx";
import PieChart from "../Admin/ThongKe/PieChart.jsx";
import AdminHome from "../Admin/AdminHome/AdminHome.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/changepass" element={<ChangePass />} />
          <Route path="/register" element={<Register />} />

          {/* Admin routes */}
          <Route element={<Private allowedRoles={["admin", "quan_tri", "giao_vien"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="danhmuc" element={<DanhMuc />} />
              <Route path="tailieu" element={<TaiLieu />} />
              <Route path="create" element={<Create />} />
              <Route path="chatagent" element={<ChatAgent />} />
              <Route path="piechart" element={<PieChart />} />
            </Route>
          </Route>

          {/* User routes */}
          <Route element={<Private allowedRoles={["admin","hoc_sinh","sinh_vien"]} />}>
            <Route
              path="/home"
              element={
                <ChatProvider>
                  <ChefAI />
                </ChatProvider>
              }
            />
          </Route>

          {/* Default route (fallback) */}
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
