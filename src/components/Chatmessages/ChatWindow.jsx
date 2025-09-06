// Import hook useAuth để lấy thông tin user từ Context
import { useAuth } from "../AuthContext/AuthContext";
// Import các hook cần thiết
import { useEffect, useRef } from "react";
import Wellcome from "../Loichao/Wellcome"; // Component hiển thị màn hình chào
import "./ChatWindow.css"; // File CSS riêng cho ChatWindow

// Component ChatWindow nhận props từ cha
const ChatWindow = ({
  messages, // Danh sách tin nhắn
  isSending, // Trạng thái đang gửi tin nhắn
  sendingConversationId, // ID của cuộc trò chuyện đang gửi
  currentConversationId, // ID của cuộc trò chuyện hiện tại
  setShowSuggestions, // Hàm thay đổi state showSuggestions
}) => {
  // Tham chiếu đến phần cuối cùng của khung chat, để scroll xuống cuối
  const bottomRef = useRef(null);

  // // Các gợi ý mặc định (hiển thị khi user chưa nhắn tin lần nào)
  // const suggestions = [
  //   "cấu trúc dữ liệu và giải thuật là gì?",
  //   "môn tin học là gì?",
  //   "môn tin học là gì?"
  // ];

  // Lấy thông tin user và trạng thái loading từ AuthContext
  const { user, loading } = useAuth();

  // Nếu user chưa từng dùng gợi ý thì showSuggestions = true
  useEffect(() => {
    // Tự động scroll xuống cuối mỗi khi có thay đổi tin nhắn
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Nếu có ít nhất 1 tin nhắn => ẩn suggestions
    if (messages.length > 0) {
      setShowSuggestions(false);
    } else {
      // Nếu chưa có tin nhắn => hiện suggestions
      setShowSuggestions(true);
    }
  }, [messages, isSending, loading, user, setShowSuggestions]);

  // // Xử lý khi user click vào 1 gợi ý
  // const handleSuggestionClick = (q) => {
  //   onAskQuestion(q); // Gửi câu hỏi đó
  //   setShowSuggestions(false); // Tắt hiển thị gợi ý
  // };

  return (
    <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-min-h-full tw-w-full">
      {/* Nếu chưa có tin nhắn thì hiển thị màn hình Wellcome */}
      {messages.length === 0 ? (
        <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
          <Wellcome />
        </div>
      ) : (
        <>
          {/* Duyệt qua tất cả tin nhắn */}
          {messages.map((message, idx) =>
            message.type === "assistant_typing" ? (
              // Trường hợp tin nhắn assistant đang gõ
              <div
                key={idx}
                className="tw-flex tw-items-start tw-my-2 tw-max-w-[80%] tw-bg-gray-100 tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm tw-text-gray-700 typing-indicator"
              >
                <div className="tw-italic">{message.content}</div>
              </div>
            ) : (
              // Các tin nhắn bình thường (assistant hoặc user)
              <div
                key={idx}
                className={`tw-flex tw-flex-col tw-my-2 ${
                  message.type === "user"
                    ? "tw-items-end tw-text-right"
                    : "tw-items-start tw-text-left"
                }`}
              >
                <div
                  className={`tw-px-3 tw-py-2 tw-rounded-lg tw-max-w-[70%] tw-text-sm ${
                    message.type === "user"
                      ? "tw-bg-red-600 tw-text-white"
                      : "tw-bg-gray-100 tw-text-gray-800"
                  } whitespace-pre-wrap break-words break-all`}
                >
                  {message.content}
                </div>

                {/* Hiển thị tên người gửi nếu có */}
                {message.sender && (
                  <div className="tw-text-xs tw-text-gray-500 tw-mt-1">
                    <strong>{message.sender}</strong>
                  </div>
                )}
              </div>
            )
          )}

          {/* Khi đang gửi tin nhắn trong đúng conversation hiện tại */}
          {isSending && sendingConversationId === currentConversationId && (
            <div className="tw-flex tw-items-start tw-my-2 tw-max-w-[20%] tw-bg-gray-100 tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm tw-text-gray-700 typing-indicator">
              <div className="tw-italic typing-text">Đang soạn trả lời...</div>
            </div>
          )}
        </>
      )}


      {/* Vị trí tham chiếu để scroll xuống cuối */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
