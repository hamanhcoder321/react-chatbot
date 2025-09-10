import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthContext/AuthContext.jsx";
import LoadingOverlay from "../components/Loading/LoadingOverlay.jsx";

const Private = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  // chưa đăng nhập → về login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // đang check user (chưa có user nhưng có token) → hiện loading
  if (token && !user) {
    return <LoadingOverlay message="Đang tải dữ liệu..." />;
  }

  // đã đăng nhập nhưng không có role phù hợp → về home
  if (allowedRoles && !allowedRoles.includes(user?.role?.toLowerCase())) {
    return <Navigate to="/home" replace />;
  }

  // hợp lệ thì cho vào
  return <Outlet />;
};

export default Private;
