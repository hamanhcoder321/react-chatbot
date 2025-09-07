import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
// import "./login-register.css";
import { useAuth } from "../AuthContext/AuthContext";
import LoadingOverlay from "../Loading/LoadingOverlay";
// import Popup from "../Popup/Popup";
import { API_ENDPOINTS } from "../../apiConfig"; // import config

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const validateform = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Bạn chưa nhập email.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email không hợp lệ.";
    if (password.length < 8)
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  if (!validateform()) {
    setFormError("Vui lòng kiểm tra lại thông tin đăng nhập.");
    return;
  }

  try {
    setIsLoading(true);
    const res = await axios.post(API_ENDPOINTS.LOGIN, { email, password });
    const token = res.data.access_token;

    // Gọi login → đã fetch user bên trong AuthContext
    const user = await login(token);

    // Điều hướng theo role
    if (user.role === "admin" || user.role === "giáo viên" || user.role === "quản trị viên") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 404) {
        setFormError("Tài khoản không tồn tại.");
      } else if (err.response.status === 401) {
        setFormError("Mật khẩu không đúng.");
      } else if (err.response.status === 403) {
        setFormError("Tài khoản của bạn chưa được xác thực email.");
      } else {
        setFormError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    } else {
      setFormError("Không thể kết nối đến máy chủ.");
    }
  } finally {
    setIsLoading(false);
  }
};


  // const handlePopupClose = () => {
  //   setIsPopupOpen(false);
  // };

  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center">
      {isLoading && <LoadingOverlay />}

      <div className="tw-flex tw-justify-center tw-mb-0 ">
        {/* Logo */}
        <Link to="/login" className="logo">
          <img
            src="/images/logo/logo.png"
            alt="loginpage"
            className="tw-h-12 sm:tw-h-14 tw-w-32 sm:tw-w-36 tw-object-contain tw-mb-2"
          />
        </Link>
      </div>

      <div className="tw-w-full tw-max-w-md tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-8">
        {/* Form */}
        <form className="tw-space-y-6" onSubmit={handleLogin}>
          <div className="tw-text-left">
            <h4 className="tw-text-xl tw-font-semibold tw-text-gray-800">
              Đăng nhập vào tài khoản
            </h4>
            <p className="tw-text-gray-500 tw-mt-1">
              Nhập email và mật khẩu để đăng nhập
            </p>
          </div>

          {formError && (
            <div className="tw-bg-red-100 tw-text-red-600 tw-text-sm tw-rounded tw-p-2">
              {formError}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vidu@gmail.com"
              className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-ring-2 focus:tw-ring-red-400 focus:tw-outline-none"
            />
            {errors.email && (
              <p className="tw-text-red-500 tw-text-xs tw-mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              name="login[password]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-ring-2 focus:tw-ring-red-400 focus:tw-outline-none"
            />
            {errors.password && (
              <p className="tw-text-red-500 tw-text-xs tw-mt-1">
                {errors.password}
              </p>
            )}
            <div className="tw-text-right tw-mt-1">
              <Link
                to="/Resetpass"
                className="tw-text-sm tw-text-red-500 hover:tw-underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="tw-w-full tw-bg-red-600 tw-text-white tw-font-medium tw-py-2 tw-rounded-lg hover:tw-bg-red-700 transition"
            >
              Đăng nhập
            </button>
          </div>

          <p className="tw-text-center tw-text-sm tw-text-gray-600">
            Chưa có tài khoản?
            <Link
              to="/Register"
              className="tw-text-red-500 tw-font-medium tw-ml-1 hover:tw-underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>

        {/* <Popup
          isOpen={isPopupOpen}
          message={`Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản trước khi đăng nhập.`}
          onClose={handlePopupClose}
        /> */}
      </div>
    </div>
  );
}
export default Login;
