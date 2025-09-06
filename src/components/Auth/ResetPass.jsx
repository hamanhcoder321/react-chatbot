import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Popup from "../Popup/Popup";
import { API_ENDPOINTS } from "../../apiConfig";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");

  // popup thông báo
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const [popupMessage, setPopupMessage] = useState("");

  // popup loading
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setMessage("");

    setIsLoading(true); // bật popup xoay xoay

    try {
      const response = await axios.post(API_ENDPOINTS.FORGOT_PASSWORD, {
        email,
      });

      const respMessage = response.data.message;

      if (
        respMessage &&
        (respMessage.toLowerCase().includes("can't find") ||
          respMessage.toLowerCase().includes("cannot find") ||
          respMessage.toLowerCase().includes("could not find"))
      ) {
        const vietnameseMessage = "Không tìm thấy tài khoản với email này.";
        setError(vietnameseMessage);
        setPopupType("warning");
        setPopupMessage(vietnameseMessage);
        setIsPopupOpen(true);
      } else {
        setMessage(respMessage);
        setPopupType("success");
        setPopupMessage("Hãy kiểm tra email để xác nhận và đặt lại mật khẩu.");
        setIsPopupOpen(true);
      }
    } catch (err) {
      const res = err.response?.data;
      try {
        const data = typeof res === "string" ? JSON.parse(res) : res;
        if (data.errors) {
          const newFieldErrors = {};
          for (const key in data.errors) {
            let msg = data.errors[key][0];
            if (msg.includes("The email field is required")) {
              msg = "Bạn chưa nhập email.";
            } else if (msg.includes("must be a valid email address")) {
              msg = "Email không hợp lệ.";
            } else {
              msg = "Đã xảy ra lỗi với trường " + key;
            }
            newFieldErrors[key] = msg;
          }
          setFieldErrors(newFieldErrors);
          setPopupType("warning");
          setPopupMessage(
            "Có lỗi trong quá trình xử lý. Vui lòng kiểm tra lại."
          );
          setIsPopupOpen(true);
        } else if (data.message) {
          let translatedMessage = data.message;
          if (
            translatedMessage.toLowerCase().includes("can't find") ||
            translatedMessage.toLowerCase().includes("cannot find") ||
            translatedMessage.toLowerCase().includes("could not find")
          ) {
            translatedMessage = "Không tìm thấy tài khoản với email này.";
          } else if (translatedMessage.toLowerCase().includes("failed")) {
            translatedMessage = "Gửi email thất bại. Vui lòng thử lại sau.";
          }
          setError(translatedMessage);
          setPopupType("warning");
          setPopupMessage(translatedMessage);
          setIsPopupOpen(true);
        } else {
          setError("Gửi email thất bại. Vui lòng thử lại sau.");
          setPopupType("warning");
          setPopupMessage("Gửi email thất bại. Vui lòng thử lại sau.");
          setIsPopupOpen(true);
        }
      } catch {
        setError("Đã xảy ra lỗi không xác định.");
        setPopupType("warning");
        setPopupMessage("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        setIsPopupOpen(true);
      }
    } finally {
      setIsLoading(false); // tắt popup xoay xoay
    }
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center">
      {/* Popup loading xoay xoay */}
      {isLoading && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/30 tw-flex tw-items-center tw-justify-center tw-z-50">
          <div className="tw-flex tw-flex-col tw-items-center">
            <div className="tw-border-4 tw-border-t-blue-500 tw-border-gray-200 tw-rounded-full tw-w-12 tw-h-12 tw-animate-spin" />
            <p className="tw-text-white tw-mt-2">Đang xử lý...</p>
          </div>
        </div>
      )}

      {/* Popup thông báo */}
      <Popup
        isOpen={isPopupOpen}
        type={popupType}
        message={popupMessage}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={() => setIsPopupOpen(false)}
      />

        {/* Logo */}
        <div className="tw-flex tw-justify-center tw-mb-0">
          <a href="/" className="logo">
            <img
              src="/images/logo/logo.png"
              alt="logo"
              className="tw-h-12 sm:tw-h-14 tw-w-32 sm:tw-w-36 tw-object-contain tw-mb-2"
            />
          </a>
        </div>
      <div className="tw-w-full tw-max-w-md tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-8">

        <h4 className="tw-text-2xl tw-font-semibold tw-text-left tw-mb-2">
          Email Của Bạn
        </h4>
        <p className="tw-text-left tw-text-gray-500 tw-mb-6">
          Nhập email để đặt lại mật khẩu
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

        <form className="tw-space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="tw-block tw-text-gray-700 tw-font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors({});
                setError("");
              }}
              placeholder="vidu@gmail.com"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-400"
            />
            {fieldErrors.email && (
              <small className="tw-text-red-500">{fieldErrors.email}</small>
            )}
          </div>

          {/* Buttons */}
          <div className="tw-flex tw-justify-between tw-items-center tw-mt-4">
            <Link
              to="/login"
              className="tw-bg-gray-300 hover:tw-bg-gray-400 tw-text-gray-800 tw-font-medium tw-py-2 tw-px-4 tw-rounded-lg tw-transition tw-duration-200"
            >
              Quay lại đăng nhập
            </Link>
            <button
              type="submit"
              className="tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-font-medium tw-py-2 tw-px-4 tw-rounded-lg tw-transition tw-duration-200"
            >
              Tiếp Tục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
