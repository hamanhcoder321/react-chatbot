// components/Popup.js
import "../Popup/Popup.css";

const Popup = ({ isOpen, type = "warning", message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>{type === "success" ? "Thành công" : "Cảnh báo"}</h3>
        <p>{message}</p>
        <div className="popup-actions">
          {/* Chỉ hiển thị nút Xác nhận nếu là warning */}
          {type === "warning" && (
            <button onClick={onConfirm} className="confirm-btn">
              Xác nhận
            </button>
          )}

          {/* Luôn có nút Đóng */}
          <button onClick={onClose} className="cancel-btn">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
