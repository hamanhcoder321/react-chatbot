// Import React hook useState để quản lý state cục bộ
import { useState } from "react";

// Import axios để gọi API
import axios from "axios";

// Import CSS style cho component Lichsuchat
import "./Lichsuchat.css";

// Import icon xóa (thùng rác) từ react-icons
import { MdDeleteForever } from "react-icons/md";

// Import useAuth để lấy state và hàm từ AuthContext
import { useAuth } from "../AuthContext/AuthContext";

// Import component Popup (hộp thoại cảnh báo/xác nhận)
import Popup from "../Popup/Popup.jsx";

// Import danh sách endpoint API
import { API_ENDPOINTS } from "../../apiConfig.js";

// Component hiển thị danh sách lịch sử chat
const Lichsuchat = ({
  selectedId, // ID của cuộc trò chuyện hiện đang chọn
  setSelectedId, // Hàm thay đổi ID cuộc trò chuyện đang chọn
  isSending, // Trạng thái đang gửi tin nhắn (không dùng trong file này)
  setShowSuggestions, // Hàm ẩn/hiện gợi ý câu hỏi
}) => {
  // State quản lý popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Mở/đóng popup
  const [popupType, setPopupType] = useState("warning"); // Kiểu popup: warning hoặc success
  const [popupMessage, setPopupMessage] = useState(""); // Nội dung thông báo trong popup
  const [conversationToDelete, setConversationToDelete] = useState(null); // ID cuộc trò chuyện muốn xóa

  // Lấy dữ liệu từ context (AuthContext)
  const { history, setHistory, setMessages, setConversationId, token } =
    useAuth();

  //  Hàm xử lý khi người dùng click chọn 1 item trong danh sách lịch sử
  const handleClickHistoryItem = (item) => {
    if (selectedId === item.conversation_id) return; // Nếu đã chọn rồi thì bỏ qua

    // Lưu ID cuộc trò chuyện được chọn
    setSelectedId(item.conversation_id);

    // Load lại danh sách tin nhắn từ item lịch sử
    setMessages(item.messages || []);

    // Cập nhật ConversationId trong context
    setConversationId(item.conversation_id);

    // Lưu vào localStorage để nhớ cuộc trò chuyện
    localStorage.setItem("conversation_id", item.conversation_id);

    // Khi click vào lịch sử thì tắt gợi ý (đánh dấu là đã dùng gợi ý)
    setShowSuggestions(false);
    localStorage.setItem("usedSuggestions", "true");
  };

  //  Hàm xử lý khi người dùng bấm nút xóa trên 1 cuộc trò chuyện
  const handleDeleteHistoryItem = (conversationIdToDelete) => {
    setPopupType("warning"); // Đầu tiên là popup cảnh báo
    setPopupMessage("Bạn có chắc chắn muốn xoá cuộc trò chuyện này?");
    setIsPopupOpen(true); // Mở popup
    setConversationToDelete(conversationIdToDelete); // Ghi nhớ ID sẽ xóa
  };

  //  Hàm xác nhận xóa cuộc trò chuyện (gọi API)
  const confirmDeleteConversation = async () => {
    try {
      await axios.delete(
        API_ENDPOINTS.DELETE_CONVERSATION(conversationToDelete),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Lọc lại history
      const newHistory = history.filter(
        (item) => item.conversation_id !== conversationToDelete
      );
      setHistory(newHistory);

      // Nếu đoạn chat đang mở trùng với ID xóa reset messages
      if (selectedId === conversationToDelete) {
        setMessages([]);
        setSelectedId(null);
        setConversationId(null);
        localStorage.removeItem("conversation_id");
      }

      // Thông báo thành công
      setPopupType("success");
      setPopupMessage("Đã xoá cuộc trò chuyện thành công!");
      setConversationToDelete(null);
    } catch (error) {
      console.error("Lỗi khi xoá:", error.response?.data || error.message);
      setPopupType("warning");
      setPopupMessage("Xoá thất bại. Vui lòng thử lại.");
    }
  };

  // Hàm rút gọn chuỗi
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      {/* Header của danh sách lịch sử */}
      <div className="history-header">
        <h2 className="text-label">Lịch sử Chat</h2>
        <p className="text-label">Các câu hỏi bạn đã hỏi</p>
      </div>

      {/* Danh sách các item trong lịch sử */}
      <div className="history-list">
        {history.map((item, index) => (
          <div
            className={`history-item ${
              selectedId === item.conversation_id ? "active" : ""
            }`}
            key={index}
            onClick={() => handleClickHistoryItem(item)} // Chọn item
          >
            <div className="history-bitem">
              {/* Hiển thị câu hỏi đầu tiên trong lịch sử hoặc "Chưa rõ" nếu không có */}
              {truncateText(item.paramHistories?.request, 50) || "Chưa rõ"}
            </div>

            {/* Nút xóa (icon thùng rác) */}
            <div className="history-options">
              <button
                className="three-dots-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn click lan ra ngoài (tránh trigger chọn item)
                  handleDeleteHistoryItem(item.conversation_id);
                }}
                title="Xoá cuộc trò chuyện"
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        ))}

        {/* Popup xác nhận/hiển thị kết quả xóa */}
        <Popup
          isOpen={isPopupOpen}
          type={popupType}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            setConversationToDelete(null); // Reset lại ID khi đóng popup
          }}
          onConfirm={popupType === "warning" ? confirmDeleteConversation : null}
        />
      </div>
    </>
  );
};

export default Lichsuchat;
