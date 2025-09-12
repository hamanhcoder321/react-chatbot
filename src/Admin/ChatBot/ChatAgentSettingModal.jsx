import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ChatAgentSettingModal = ({ isOpen, onClose }) => {
  const [chatMode, setChatMode] = useState("bot"); // mặc định là bot

  const handleToggle = () => {
    setChatMode(chatMode === "bot" ? "teacher" : "bot");
    // TODO: Gọi API cập nhật trạng thái (ví dụ POST /api/chat-mode)
  };

  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center z-50">
      <div className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-w-[400px]">
        {/* Header */}
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
          <h2 className="tw-text-lg tw-font-semibold">Cài đặt hệ thống chat</h2>
          <button
            onClick={onClose}
            className="tw-text-gray-500 hover:tw-text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Nội dung */}
        <div className="tw-text-center tw-mb-6">
          <p className="tw-mb-4">
            Trạng thái hiện tại:{" "}
            <span className="tw-font-bold tw-text-blue-600">
              {chatMode === "teacher" ? "Gửi cho giáo viên" : "Gửi cho chatbot"}
            </span>
          </p>

          <button
            onClick={handleToggle}
            className={`tw-px-6 tw-py-2 tw-rounded-full tw-text-white transition ${
              chatMode === "teacher"
                ? "tw-bg-red-500 hover:tw-bg-red-600"
                : "tw-bg-green-500 hover:tw-bg-green-600"
            }`}
          >
            {chatMode === "teacher" ? "Tắt (chuyển về Bot)" : "Bật (chuyển sang Giáo viên)"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAgentSettingModal;
