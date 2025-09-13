import { FaArrowLeft } from "react-icons/fa";

const ChatSidebar = ({ setSidebarType }) => {
  const sessions = [
    { id: 1, name: "Phiên 1" },
    { id: 2, name: "Phiên 2" },
    { id: 3, name: "Phiên 3" },
  ];

  return (
    <aside className="tw-w-72 tw-min-h-screen tw-bg-white tw-text-black tw-shadow-xl tw-flex tw-flex-col">
      {/* Header */}
      <div className="tw-p-4 tw-flex tw-items-center tw-justify-between tw-text-2x0 tw-font-bold tw-border-b tw-border-r tw-border-gray-300 tw-tracking-wide">
        <span className="tw-font-bold">Tin nhắn mới</span>
        <button
          onClick={() => setSidebarType("main")}
          className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-red-600 hover:tw-underline"
        >
          <FaArrowLeft /> Quay về menu
        </button>
      </div>

      {/* Danh sách phiên chat */}
      <div className="tw-flex-1 tw-overflow-y-auto tw-p-4">
        <ul>
          {sessions.map((s) => (
            <li
              key={s.id}
              className="tw-mb-2 tw-cursor-pointer tw-p-2 tw-rounded hover:tw-bg-gray-200"
            >
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ChatSidebar;
