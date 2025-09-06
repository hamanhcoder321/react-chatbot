export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0  tw-bg-opacity-30 tw-flex tw-items-center tw-justify-center tw-z-50">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-md tw-relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="tw-absolute tw-top-3 tw-right-3 tw-text-gray-500 hover:tw-text-black"
        >
          ✖
        </button>
        <div className="tw-p-6">{children}</div>
      </div>
    </div>
  );
}
