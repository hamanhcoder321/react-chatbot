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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/Resetpass" element={<ResetPass />} />
          <Route path="/Changpass" element={<ChangePass />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<Private allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="DanhMuc" element={<DanhMuc />} />
              <Route path="TaiLieu" element={<TaiLieu />} />
              <Route path="Create" element={<Create />} />
              <Route path="ChatAgent" element={<ChatAgent />} />
            </Route>
          </Route>

          <Route element={<Private allowedRoles={["user"]} />}>
            <Route
              path="/home"
              element={
                <ChatProvider>
                  <ChefAI />
                </ChatProvider>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
