import { useState } from "react";
import { deleteFolderAdmin } from "../services/folderService";

export default function DeleteFolderModal({
  isOpen,
  onClose,
  folder,
  onDeleted,
}) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !folder) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteFolderAdmin(folder.id);
      alert(result.message || "Xóa thành công!");
      onDeleted && onDeleted(folder.id);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Xóa thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black/30 tw-flex tw-items-center tw-justify-center tw-z-50">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-md tw-p-6">
        <h2 className="tw-text-lg tw-font-bold tw-mb-4">
          Xác nhận xóa thư mục "{folder.name}"?
        </h2>
        <div className="tw-flex tw-justify-end tw-gap-2">
          <button
            type="button"
            onClick={onClose}
            className="tw-px-4 tw-py-2 tw-rounded-lg tw-border hover:tw-bg-gray-50"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="tw-px-4 tw-py-2 tw-rounded-lg tw-bg-red-600 tw-text-white hover:tw-bg-red-700"
          >
            {loading ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
}