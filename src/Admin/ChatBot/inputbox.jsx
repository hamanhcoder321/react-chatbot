export default function InputBox() {
  return (
    <div className="tw-border-t  tw-p-3 tw-shrink-0 tw-flex tw-justify-center">
      <div
        className="tw-flex tw-items-center tw-gap-2 tw-bg-gray-100 
               tw-rounded-2xl tw-px-3 tw-py-2 tw-w-[96%] 
               tw-border tw-border-gray-300 focus-within:tw-border-red-500"
      >
        {/* Nút Chat mới */}
        <button
          className="tw-bg-gray-200 tw-text-gray-700
                 tw-rounded-full tw-px-4 tw-py-2
                 tw-font-medium tw-text-sm
                 hover:tw-bg-gray-300"
        >
          Chat Agent
        </button>

        {/* Textarea */}
        <textarea
          className="
        tw-flex-1
        tw-bg-transparent tw-border-none tw-resize-none
        tw-text-sm tw-py-2
        focus:tw-outline-none
        [&::-webkit-scrollbar]:tw-hidden
        tw-max-h-32 tw-overflow-y-auto
      "
          placeholder="Bạn muốn hỏi điều gì về môn học...?"
        ></textarea>

        {/* Nút Gửi */}
        <button
          className="tw-bg-red-600 tw-text-white tw-rounded-full
                 tw-px-5 tw-py-1 tw-text-sm
                 hover:tw-bg-red-700"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
