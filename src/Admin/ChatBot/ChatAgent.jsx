import InputBox from "./inputbox";

export default function ChatAgent() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-min-h-full tw-w-full">
      {/* Khi chưa có tin nhắn */}
      <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
        <div className="tw-text-gray-500">Wellcome</div>
      </div>

      {/* Ví dụ tin nhắn user (sinh viên) - bên trái */}
      <div className="tw-flex tw-flex-col tw-my-2 tw-items-start tw-text-left">
        <div className="tw-px-3 tw-py-2 tw-rounded-lg tw-max-w-[70%] tw-text-sm tw-bg-red-600 tw-text-white whitespace-pre-wrap break-words break-all">
          {/* Cho tôi hỏi giám đốc là ai? */}
        </div>
        <div className="tw-text-xs tw-text-gray-500 tw-mt-1">
          <strong>Student</strong>
        </div>
      </div>

      {/* Ví dụ tin nhắn assistant (giáo viên) - bên phải */}
      <div className="tw-flex tw-flex-col tw-my-2 tw-items-end tw-text-right">
        <div className="tw-px-3 tw-py-2 tw-rounded-lg tw-max-w-[70%] tw-text-sm tw-bg-gray-100 tw-text-gray-800 whitespace-pre-wrap break-words break-all">
          {/* Xin chào, tôi có thể giúp gì cho bạn? */}
        </div>
        <div className="tw-text-xs tw-text-gray-500 tw-mt-1">
          <strong>Teacher</strong>
        </div>
      </div>

      {/* Trạng thái assistant đang gõ */}
      <div className="tw-flex tw-items-end tw-my-2 tw-max-w-[80%] tw-bg-gray-100 tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm tw-text-gray-700 typing-indicator">
        <div className="tw-italic">Đang soạn trả lời...</div>
      </div>

      {/* Vị trí ref để scroll (placeholder thôi) */}
      <div />
      <InputBox />
    </div>
  );
}
