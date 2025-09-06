import { useState } from "react";

import SidebarLeft from "../Sidebarleft/SidebarLeft.jsx";
import ChatWindow from "../Chatmessages/ChatWindow.jsx";
import ChatInput from "../Guichat/ChatInput.jsx";
import Menu from "../../HeaderMenu/HeaderMenu.jsx";
import Popup from "../Popup/Popup.jsx";

import { useAuth } from "../AuthContext/AuthContext.jsx";
import { useChat } from "../Context/ChatContext.jsx";

const ChefAI = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);

  const { user, loading } = useAuth();
  const {
    selectedId,
    userMessages,
    handleInputChange,
    sendMessage,
    messages,
    isSending,
    sendingConversationId,
    resetChat,
    setShowSuggestions,
    showSuggestions, // State từ cha: có hiển thị gợi ý hay không
  } = useChat();

  const confirmResetChat = () => {
    resetChat();
    setIsPopupOpen(false);
  };

  // Các gợi ý mặc định (hiển thị khi user chưa nhắn tin lần nào)
  const suggestions = [
    "cấu trúc dữ liệu và giải thuật là gì?",
    "môn tin học là gì?",
    "môn tin học là gì?",
  ];

  // Xử lý khi user click vào 1 gợi ý
  const handleSuggestionClick = (q) => {
    sendMessage(q); // Gửi câu hỏi đó
    setShowSuggestions(false); // Tắt hiển thị gợi ý
  };

  return (
    <div
      id="app"
      className="tw-w-full tw-h-screen tw-flex tw-flex-col tw-bg-white"
    >
      <div className="tw-flex-1 tw-flex tw-h-full">
        {/* Sidebar - chỉ hiện trên md trở lên */}
        <div className="tw-hidden md:tw-block">
          <SidebarLeft isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
        </div>

        {/* Center Panel */}
        <div className="tw-flex-1 tw-flex tw-flex-col ">
          {/* Header */}
          <div className="tw-flex tw-items-center tw-justify-between tw-bg-red-600 tw-px-6"></div>
          {/* Header */}
          <div className="tw-flex tw-items-center tw-justify-between tw-bg-red-600 tw-px-4 tw-py-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <h1 className="tw-flex tw-items-center tw-text-white tw-text-xl tw-font-bold">
                <div className="tw-bg-white tw-rounded-full tw-p-1 tw-mr-2">
                  <img
                    src="/images/logo/logo.png"
                    alt="logo"
                    className="tw-w-8 tw-h-8"
                  />
                </div>
                Chatbot Sinh Viên
              </h1>
              <p className="tw-text-white tw-text-sm tw-opacity-90">
                Hãy cho tôi biết ngành học của bạn tôi sẽ hỗ trợ nội dung chuyên
                môn!
              </p>
            </div>

            <div className="tw-flex tw-items-center md:tw-hidden">
              <Menu />
            </div>
          </div>

          {/* Chat window - phần này mới cuộn */}
          <div className="tw-flex-1 tw-overflow-y-auto tw-px-4">
            <ChatWindow
              messages={messages}
              isSending={isSending}
              sendingConversationId={sendingConversationId}
              currentConversationId={selectedId}
              onAskQuestion={sendMessage}
              loading={loading}
              user={user}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
            />
          </div>

          {/* Gợi ý câu hỏi */}
          {!loading && user && showSuggestions && (
            <div className="tw-flex tw-justify-center tw-gap-2 tw-mt-4 tw-mb-16 suggestion-buttons">
              {suggestions.map((q, i) => (
                <button
                  key={i}
                  className=" tw-text-gray-700 tw-rounded-full tw-px-4 tw-py-2 tw-text-sm hover:tw-bg-gray-300 disabled:tw-opacity-50 suggestion-btn"
                  disabled={isSending} // Nếu đang gửi thì disable
                  onClick={() => handleSuggestionClick(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Chat input - cố định dưới */}
          <div className="tw-bg-white tw-shrink-0 tw-w-full">
            <ChatInput
              userMessage={userMessages[selectedId] || ""}
              setUserMessage={(val) => handleInputChange(selectedId, val)}
              sendMessage={sendMessage}
              isSending={isSending}
              resetChat={() => setIsPopupOpen(true)}
              setShowSuggestions={setShowSuggestions}
            />
          </div>

          {/* Popup */}
          <Popup
            isOpen={isPopupOpen}
            type="warning"
            message="Bạn có chắc chắn muốn làm mới cuộc trò chuyện?"
            onClose={() => setIsPopupOpen(false)}
            onConfirm={confirmResetChat}
          />
        </div>
      </div>
    </div>
  );
};

export default ChefAI;
