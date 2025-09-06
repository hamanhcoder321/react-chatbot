// src/components/Sidebarleft/SidebarLeft.jsx
import { useChat } from "../Context/ChatContext.jsx";
import Lichsuchat from "../lichsuchat/Lichsuchat";
import Menu from "../../Menu/SubmenuUser";
// import "./SidebarLeft.css";

const SidebarLeft = ({ isSidebar, setIsSidebar }) => {
  const {
    selectedId,
    setSelectedId,
    isSending,
    setShowSuggestions,
    setMessages,
    setHistory,
    setConversationId,
    setUserMessages,
  } = useChat();

  return (
    <div
      className={`tw-flex tw-flex-col tw-h-full tw-bg-white tw-border-r ${
        !isSidebar ? "tw-w-16" : "tw-w-64"
      } tw-transition-all tw-duration-300 tw-overflow-x-hidden`}
    >
      {/* Nội dung chính Sidebar */}
      <div className="tw-flex-1 tw-flex tw-flex-col">
        {/* Phần đầu sidebar: logo + toggle */}
        <div className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-border-b">
          <div className="tw-flex tw-items-center tw-justify-center">
            <img
              src="/images/logo/logo.png"
              alt="logo"
              className="tw-w-10 tw-h-10 tw-object-contain"
            />
          </div>
          <div
            className="tw-cursor-pointer tw-text-gray-600 hover:tw-text-red-600 tw-ml-2"
            onClick={() => setIsSidebar(!isSidebar)}
          >
            <i
              className={`fas ${
                isSidebar ? "fa-arrow-left" : "fa-arrow-right"
              }`}
              title={isSidebar ? "Đóng Sidebar" : "Mở Sidebar"}
            ></i>
          </div>
        </div>

        {/* Lịch sử chat – chỉ hiện khi mở */}
        {isSidebar && (
          <div className="tw-flex-1 tw-overflow-y-auto tw-p-3">
            <Lichsuchat
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              isSending={isSending}
              setShowSuggestions={setShowSuggestions}
            />
          </div>
        )}
      </div>

      {/* Menu người dùng – chỉ hiện khi mở */}
        <div className="tw-border-t tw-p-3">
          <Menu
            setSelectedId={setSelectedId}
            setHistory={setHistory}
            setMessages={setMessages}
            setConversationId={setConversationId}
            setShowSuggestions={setShowSuggestions}
            setUserMessages={setUserMessages}
          />
        </div>
    </div>
  );
};

export default SidebarLeft;
