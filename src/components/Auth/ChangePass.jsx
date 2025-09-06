import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import "../Auth/login-register.css";
import Popup from "../Popup/Popup.jsx";
import { API_ENDPOINTS } from "../../apiConfig";

const ChangePass = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const email = query.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const [popupMessage, setPopupMessage] = useState("");

  // state loading
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setFieldErrors({});

    // Validate phía client
    if (!password || !confirmPassword) {
      const newErrors = {};
      if (!password) newErrors.password = "Vui lòng nhập mật khẩu mới.";
      if (!confirmPassword)
        newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
      setFieldErrors(newErrors);
      setPopupType("warning");
      setPopupMessage("Vui lòng nhập đầy đủ thông tin.");
      setIsPopupOpen(true);
      return;
    }

    if (password.length < 8) {
      setFieldErrors({ password: "Mật khẩu phải có ít nhất 8 ký tự." });
      setPopupType("warning");
      setPopupMessage("Mật khẩu quá ngắn. Vui lòng kiểm tra lại.");
      setIsPopupOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Mật khẩu xác nhận không khớp." });
      setPopupType("warning");
      setPopupMessage("Mật khẩu xác nhận không khớp.");
      setIsPopupOpen(true);
      return;
    }

    try {
      // bật loading popup
      setIsLoading(true);

      const response = await axios.post(API_ENDPOINTS.RESET_PASSWORD, {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      setIsLoading(false); // tắt loading

      const successMsg =
        response.data.message || "Đặt lại mật khẩu thành công.";
      setMessage(successMsg);
      setPopupType("success");
      setPopupMessage(successMsg);
      setIsPopupOpen(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setIsLoading(false); // tắt loading nếu lỗi
      const res = err.response?.data;

      try {
        const data = typeof res === "string" ? JSON.parse(res) : res;

        if (data.errors) {
          const newFieldErrors = {};
          for (const key in data.errors) {
            let msg = data.errors[key][0];

            if (msg.toLowerCase().includes("required")) {
              msg = "Trường này là bắt buộc.";
            } else if (msg.toLowerCase().includes("confirmation")) {
              msg = "Mật khẩu xác nhận không khớp.";
            }

            newFieldErrors[key] = msg;
          }

          setFieldErrors(newFieldErrors);
          setPopupType("warning");
          setPopupMessage("Có lỗi xảy ra. Vui lòng kiểm tra lại.");
          setIsPopupOpen(true);
        } else if (data.message) {
          let translatedMessage = data.message;
          if (
            translatedMessage.toLowerCase().includes("invalid") ||
            translatedMessage.toLowerCase().includes("expired")
          ) {
            translatedMessage =
              "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.";
          }
          setError(translatedMessage);
          setPopupType("warning");
          setPopupMessage(translatedMessage);
          setIsPopupOpen(true);
        } else {
          setError("Đặt lại mật khẩu thất bại. Vui lòng thử lại sau.");
          setPopupType("warning");
          setPopupMessage("Đặt lại mật khẩu thất bại. Vui lòng thử lại sau.");
          setIsPopupOpen(true);
        }
      } catch {
        setError("Đã xảy ra lỗi không xác định.");
        setPopupType("warning");
        setPopupMessage("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        setIsPopupOpen(true);
      }
    }
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center">
      {/* popup loading */}
      {isLoading && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/30 tw-flex tw-items-center tw-justify-center tw-z-50">
          <div className="tw-flex tw-flex-col tw-items-center">
            <div className="tw-border-4 tw-border-t-blue-500 tw-border-gray-200 tw-rounded-full tw-w-12 tw-h-12 tw-animate-spin" />
            <p className="tw-text-white tw-mt-2">Đang xử lý...</p>
          </div>
        </div>
      )}

      {/* popup kết quả */}
      <Popup
        isOpen={isPopupOpen}
        type={popupType}
        message={popupMessage}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={() => setIsPopupOpen(false)}
      />

        <div className="tw-flex tw-justify-center tw-mb-0">
          <a href="/">
            <img
              src="/images/logo/logo.png"
              alt="logo"
              className="tw-h-12 sm:tw-h-14 tw-w-32 sm:tw-w-36 tw-object-contain tw-mb-2"
            />
          </a>
        </div>
      <div className="tw-w-full tw-max-w-md tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-8">
        {/* Logo */}

        <h4 className="tw-text-2xl tw-font-semibold tw-text-center tw-mb-2">
          Đặt Lại Mật Khẩu
        </h4>
        <p className="tw-text-center tw-text-gray-500 tw-mb-6">
          Nhập mật khẩu mới của bạn
        </p>

        {error && (
          <div className="tw-bg-red-100 tw-text-red-700 tw-p-3 tw-rounded mb-4">
            {error}
          </div>
        )}
        {message && (
          <div className="tw-bg-green-100 tw-text-green-700 tw-p-3 tw-rounded mb-4">
            {message}
          </div>
        )}

        <form className="tw-space-y-4" onSubmit={handleReset}>
          {/* Mật khẩu mới */}
          <div>
            <label className="tw-block tw-text-gray-700 tw-font-medium mb-1">
              Mật khẩu mới
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors({});
                setError("");
              }}
              placeholder="*********"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-400"
            />
            {fieldErrors.password && (
              <small className="tw-text-red-500">{fieldErrors.password}</small>
            )}
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <label className="tw-block tw-text-gray-700 tw-font-medium mb-1">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setFieldErrors({});
                setError("");
              }}
              placeholder="*********"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-400"
            />
            {fieldErrors.confirmPassword && (
              <small className="tw-text-red-500">
                {fieldErrors.confirmPassword}
              </small>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="tw-w-full tw-bg-red-600 hover:tw-bg-red-600 tw-text-white tw-font-medium tw-py-2 tw-rounded-lg tw-transition tw-duration-200"
          >
            Xác nhận đặt lại
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;
