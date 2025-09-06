// Import các hook cần thiết từ React và thư viện router
import { useAuth } from "../components/AuthContext/AuthContext"; // Lấy state và hàm từ AuthContext
import { useState } from "react";


// Popup dùng chung
import Popup from "../components/Popup/Popup";

// API endpoint
import { API_ENDPOINTS } from "../apiConfig";

// Import CSS riêng cho component này
import "./SubmenuUser.css";

// Component SubmenuUser hiển thị thông tin người dùng và các thao tác (logout, delete account)
const SubmenuUser = () => {
  // State popup
  const [popupOpen, setPopupOpen] = useState(false); // Popup xác nhận xoá tài khoản
  const [popupMessage, setPopupMessage] = useState(""); // Nội dung popup
  const [popupType, setPopupType] = useState("warning"); // Loại popup: warning | success
  const [confirmAction, setConfirmAction] = useState(null); // Callback khi xác nhận hành động

  // State điều khiển hiển thị popup thông tin user
  const [showPopup, setShowPopup] = useState(false);

  // Lấy thông tin user từ AuthContext
  const { user, logout } = useAuth();


  //  Xử lý khi click "Xoá tài khoản"
  const handleDeleteAccount = () => {
    setPopupMessage(
      "Bạn có chắc chắn muốn xoá tài khoản? Hành động này không thể hoàn tác."
    );
    setPopupType("warning");
    setPopupOpen(true); // Mở popup xác nhận
    setConfirmAction(() => confirmDeleteAccount); // Lưu callback xác nhận
    // setUserMessages("")
  };

  //  Callback xác nhận xoá tài khoản
  const confirmDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.DELETE_ACCOUNT, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Xoá dữ liệu liên quan trong localStorage
        logout();

        // Hiển thị thông báo thành công
        setPopupType("success");
        setPopupMessage("Tài khoản đã được xoá thành công.");
        setConfirmAction(null); // không cần xác nhận nữa

        logout(); // Chuyển về trang login
      } else {
        const data = await response.json();
        setPopupType("warning");
        setPopupMessage(data.message || "Đã xảy ra lỗi khi xoá tài khoản.");
      }
    } catch (error) {
      console.error("Lỗi khi xoá tài khoản:", error);
      setPopupType("warning");
      setPopupMessage("Đã xảy ra lỗi khi kết nối máy chủ.");
    }
  };

  //  Xử lý đăng xuất
  const handleLogout = () => {
    logout();
  };

  //  Đóng popup khi click ra ngoài
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* Khu vực avatar – click sẽ hiển thị popup thông tin user */}
      <div onClick={() => setShowPopup(true)} className="user-info">
        <div className="user-avatar-pc">
          <img
            src="/images/logo/images_user.jpg"
            alt="avatar"
            className="avatar-img"
          />
        </div>
        <div className="user-label">Tài khoản người dùng</div>
      </div>

      {/* Popup hiển thị thông tin tài khoản */}
      {showPopup && (
        <div
          className="tw-fixed tw-inset-0 tw-bg-black/30 tw-flex tw-items-center tw-justify-center tw-z-50"
          onClick={closePopup}
        >
          <div
            className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-w-80 tw-p-6 tw-relative"
            onClick={(e) => e.stopPropagation()} // Ngăn click lan ra ngoài
          >
            {/* Nút đóng popup */}
            <button
              className="tw-absolute tw-top-2 tw-right-2 tw-text-gray-400 hover:tw-text-gray-600 tw-text-xl tw-font-bold"
              onClick={closePopup}
            >
              ×
            </button>

            <h2 className="tw-text-lg tw-font-semibold tw-mb-2">
              Tài khoản người dùng
            </h2>

            {/* Thông tin người dùng */}
            <div className="tw-mb-6 tw-space-y-2">
              <p className="tw-text-gray-700">
                <span className="tw-font-semibold">Tên:</span> {user?.name}
              </p>
              <p className="tw-text-gray-700">
                <span className="tw-font-semibold">Email:</span> {user?.email}
              </p>
            </div>

            {/* Các hành động: đăng xuất, xoá tài khoản */}
            <div className="tw-flex tw-gap-3 tw-justify-center">
              <button
                className="tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-font-medium tw-py-2 tw-px-4 tw-rounded-lg tw-transition tw-duration-200"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
              <button
                className="tw-bg-red-500 hover:tw-bg-red-600 tw-text-white  tw-font-medium tw-py-2 tw-px-4 tw-rounded-lg tw-transition tw-duration-200"
                onClick={handleDeleteAccount}
              >
                Xoá tài khoản
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup xác nhận / thông báo */}
      <Popup
        isOpen={popupOpen}
        type={popupType}
        message={popupMessage}
        onClose={() => {
          setPopupOpen(false);
          setConfirmAction(null); // Reset callback khi đóng popup
        }}
        onConfirm={
          popupType === "warning" && confirmAction ? confirmAction : null
        }
      />
    </>
  );
};

// Export component
export default SubmenuUser;
