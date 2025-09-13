import { FaLock, FaUnlock } from "react-icons/fa";
import { lockFolder, unlockFolder } from "../services/folderService";
import { useState } from "react";

export default function LockFolder({ isOpen, onClose, folder, onLocked }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !folder) return null;

  const handleToggleLock = async () => {
    try {
      setLoading(true);
      if (folder.locked) {
        await unlockFolder(folder.id);
      } else {
        await lockFolder(folder.id);
      }
      onLocked(); // reload lại danh sách
      onClose();
    } catch (err) {
      console.error("Lỗi lock/unlock folder:", err);
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black/40 tw-flex tw-items-center tw-justify-center tw-z-50">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6 tw-w-[400px]">
        <h2 className="tw-text-lg tw-font-semibold tw-mb-4">
          {folder.locked ? "Mở khóa thư mục" : "Khóa thư mục"}
        </h2>
        <p className="tw-mb-4">
          Bạn có chắc chắn muốn{" "}
          <span className="tw-font-bold">
            {folder.locked ? "mở khóa" : "khóa"}
          </span>{" "}
          thư mục <b>{folder.name}</b>?
        </p>

        <div className="tw-flex tw-justify-end tw-gap-2">
          <button
            onClick={onClose}
            className="tw-px-4 tw-py-2 tw-rounded-lg tw-border hover:tw-bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleToggleLock}
            disabled={loading}
            className="tw-px-4 tw-py-2 tw-rounded-lg tw-bg-red-600 tw-text-white hover:tw-bg-red-700"
          >
            {loading
              ? "Đang xử lý..."
              : folder.locked
              ? <span className="tw-flex tw-items-center"><FaUnlock className="tw-mr-2"/> Mở khóa</span>
              : <span className="tw-flex tw-items-center"><FaLock className="tw-mr-2"/> Khóa</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
