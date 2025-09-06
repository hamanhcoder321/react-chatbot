import { useState, useEffect } from "react";
import { updateFolder } from "../services/folderService";

export default function FolderEditModal({ isOpen, onClose, folder, onUpdated }) {
  const [name, setName] = useState(folder?.name || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (folder) setName(folder.name);
  }, [folder]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateFolder(folder.id, name);
      onUpdated(); // reload lại list
      onClose();
    } catch (err) {
      console.error("Lỗi cập nhật folder:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black/30 tw-flex tw-items-center tw-justify-center tw-z-50">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-md tw-p-6">
        <h2 className="tw-text-lg tw-font-bold tw-mb-4">Sửa thư mục</h2>
        <form onSubmit={handleSubmit} className="tw-space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="tw-w-full tw-border tw-rounded-lg tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
          />
          <div className="tw-flex tw-justify-end tw-gap-2">
            <button
              type="button"
              onClick={onClose}
              className="tw-px-4 tw-py-2 tw-rounded-lg tw-border hover:tw-bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="tw-px-4 tw-py-2 tw-rounded-lg tw-bg-red-600 tw-text-white hover:tw-bg-red-700"
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
