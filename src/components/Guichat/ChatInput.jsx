import { useRef, useEffect } from "react";

const ChatInput = ({
  userMessage,
  setUserMessage,
  sendMessage,
  resetChat,
  setShowSuggestions,
  isSending,
}) => {
  const textareaRef = useRef(null);

  // Auto resize textarea khi nội dung thay đổi
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [userMessage]);

  // Hàm gửi chung (dùng cho Enter và nút Gửi)
  const handleSend = () => {
    if (!userMessage.trim() || isSending) return; // chặn gửi khi đang gửi
    sendMessage(userMessage);
    setShowSuggestions(false);
    setUserMessage("");
  };

  return (
    <div className="tw-border-t tw-bg-white tw-p-3 tw-shrink-0 tw-flex tw-justify-center">
      <div
        className="tw-flex tw-items-center  tw-gap-2 tw-bg-gray-100 
                  tw-rounded-2xl tw-px-3 tw-py-2 tw-w-[96%] 
                  tw-border tw-border-gray-300 focus-within:tw-border-red-500"
      >
        {/* Nút Chat mới */}
        <button
          className="tw-bg-gray-200 tw-text-gray-700
                 tw-rounded-full tw-px-4 tw-py-2
                 tw-font-medium tw-text-sm
                 hover:tw-bg-gray-300 disabled:tw-opacity-50"
          onClick={resetChat}
        >
          🔄 Chat mới
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className="
        tw-flex-1
        tw-bg-transparent tw-border-none tw-resize-none
        tw-text-sm tw-py-2
        focus:tw-outline-none
        [&::-webkit-scrollbar]:tw-hidden
        tw-max-h-32 tw-overflow-y-auto
      "
          placeholder="Bạn muốn hỏi điều gì về môn học...?"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {/* Nút Gửi */}
        <button
          className="tw-bg-red-600 tw-text-white tw-rounded-full
                 tw-px-5 tw-py-1 tw-text-sm
                 hover:tw-bg-red-700 disabled:tw-opacity-50"
          onClick={handleSend}
          disabled={isSending}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
