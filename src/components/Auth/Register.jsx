import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import "../Auth/login-register.css";
import Popup from "../Popup/Popup.jsx";
import LoadingOverlay from "../Loading/LoadingOverlay.jsx";
import { API_ENDPOINTS } from "../../apiConfig"; // import config

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // state loading

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Bạn chưa nhập họ tên.";

    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // phần này kiểm tra lỗi khi nhập email sai hay đúng hay thiếu @

    if (!email.trim()) {
      newErrors.email = "Bạn chưa nhập email.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    } else {
      const emailDomain = email.split("@")[1];
      if (!allowedDomains.includes(emailDomain)) {
        newErrors.email = "Email không hợp lệ.";
      }
    }

    if (password.length < 8)
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";

    if (password !== password_confirmation)
      newErrors.password_confirmation = "Mật khẩu xác nhận không khớp.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormError("Vui lòng kiểm tra lại thông tin.");
      return;
    }

    setIsLoading(true);   // bật loading

    try {
      await axios.post(API_ENDPOINTS.REGISTER, {
        name,
        email,
        password,
        password_confirmation,
      });
      setIsPopupOpen(true);
    } catch (err) {
      if (err.response) {
        // Lấy thông báo lỗi từ server
        const backendMessage = err.response.data.message || "Có lỗi xảy ra";
        setFormError(backendMessage); // hiển thị lên form
      } else {
        setFormError("Không thể kết nối đến máy chủ."); // lỗi kết nối
      }

      // Bỏ tất cả lỗi validate hay backend khác
    } finally {
      setIsLoading(false); // tắt loading khi xong
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center">
      {isLoading && <LoadingOverlay message="Đang xử lý..." />}

      {/* Logo */}
      <div className="tw-flex tw-justify-center tw-mb-0">
        <Link to="/Register" className="logo">
          <img
            src="/images/logo/logo.png"
            alt="logo"
            className="tw-h-12 sm:tw-h-14 tw-w-32 sm:tw-w-36 tw-object-contain tw-mb-2"
          />
        </Link>
      </div>

      <div className="tw-w-full tw-max-w-md tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-8">
        <h4 className="tw-text-2xl tw-font-semibold tw-text-left tw-mb-2">
          Tạo tài khoản của bạn
        </h4>
        <p className="tw-text-left tw-text-gray-500 tw-mb-6">
          Nhập thông tin cá nhân để đăng ký tài khoản
        </p>

        {formError && (
          <div className="tw-bg-red-100 tw-text-red-700 tw-p-3 tw-rounded mb-4">
            {formError}
          </div>
        )}

        <form className="tw-space-y-4" onSubmit={handleRegister}>
          {/* Họ và tên */}
          <div>
            <label className="tw-block tw-text-gray-700 tw-font-medium mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
                setFormError("");
              }}
              placeholder="Nhập họ tên"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-400"
            />
            {errors.name && (
              <small className="tw-text-red-500">{errors.name}</small>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="tw-block tw-text-gray-700 tw-font-medium mb-1">
              Địa chỉ Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
                setFormError("");
              }}
              placeholder="vidu@gmail.com"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-400"
            />
            {errors.email && (
              <small className="tw-text-red-500">{errors.email}</small>
            )}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="tw-block tw-text-gray-700 tw-font-medium mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-400"
            />
            {errors.password && (
              <small className="tw-text-red-500">{errors.password}</small>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label className="tw-block tw-text-gray-700 tw-font-medium mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="*********"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-400"
            />
            {errors.password_confirmation && (
              <small className="tw-text-red-500">
                {errors.password_confirmation}
              </small>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="tw-w-full tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-font-medium tw-py-2 tw-rounded-lg tw-transition tw-duration-200"
          >
            Tạo tài khoản
          </button>

          <p className="tw-text-center tw-text-gray-500 tw-mt-4">
            Đã có tài khoản?
            <Link
              className="tw-text-red-500 tw-font-medium tw-ml-1 hover:tw-underline"
              to="/login"
            >
              Đăng nhập
            </Link>
          </p>
        </form>

        <Popup
          isOpen={isPopupOpen}
          type="success"
          message={`Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản trước khi đăng nhập.`}
          onClose={handlePopupClose}
        />
      </div>
    </div>
  );
}

export default Register;
