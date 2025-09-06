import { useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import SubmenuUser from "../Menu/SubmenuUser.jsx";
import Lichsuchat from "../components/lichsuchat/Lichsuchat.jsx";
import { useChat } from "../components/Context/ChatContext.jsx"; // <-- dùng context
// import "../HeaderMenu/HeaderMenu.css";

const Menu = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const {
    history,
    setHistory,
    selectedId,
    setSelectedId,
    setMessages,
    setConversationId,
    setUserMessages,
    setShowSuggestions,
    // isSending
  } = useChat();

  return (
    <>
      {/* Nút mở sidebar */}
      <div
        onClick={() => setShowSidebar(true)}
        className="tw-cursor-pointer tw-p-2 tw-rounded-full tw-bg-gray-100 hover:tw-bg-gray-200"
      >
        <div className="tw-text-xl tw-text-gray-700 user-avatar">
          <FiAlignRight />
        </div>
      </div>

      {/* Sidebar overlay */}
      {showSidebar && (
        <div
          className="tw-fixed tw-inset-0 tw-bg-black/40 tw-z-50 sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        >
          <div
            className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-80 tw-bg-white tw-shadow-lg tw-flex tw-flex-col tw-p-4 sidebar-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng sidebar */}
            <button
              className="tw-self-end tw-text-2xl tw-font-bold tw-text-gray-500 hover:tw-text-red-600 sidebar-close"
              onClick={() => setShowSidebar(false)}
            >
              ×
            </button>

            {/* Menu user */}
            <div className="tw-mt-4">
              <SubmenuUser
                setHistory={setHistory}
                setMessages={setMessages}
                setConversationId={setConversationId}
                setSelectedId={setSelectedId}
                setUserMessages={setUserMessages}
              />
            </div>

            {/* Lịch sử chat */}
            <div className="tw-mt-4 tw-flex-1 tw-overflow-y-auto">
              <Lichsuchat
                history={history}
                setHistory={setHistory}
                setMessages={setMessages}
                setConversationId={setConversationId}
                onClickItem={() => setShowSidebar(false)}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setShowSuggestions={setShowSuggestions}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
