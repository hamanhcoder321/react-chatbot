import { useState } from "react";
import { deleteDocument } from "../services/folderService";

export default function DeleteDocumentModal({ isOpen, onClose, doc, onDeleted }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !doc) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteDocument(doc.id); // gọi API xóa
      onDeleted(doc.id);
      onClose();
    } catch (err) {
      console.error("Lỗi xóa document:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-z-50 tw-bg-black/40">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6 tw-w-[400px]">
        <h2 className="tw-text-lg tw-font-semibold tw-mb-4">
          Xóa tài liệu
        </h2>
        <p>
          Bạn có chắc muốn xóa tài liệu <strong>{doc.name}</strong> không?
        </p>
        <div className="tw-mt-6 tw-flex tw-justify-end tw-gap-2">
          <button
            onClick={onClose}
            className="tw-px-4 tw-py-2 tw-rounded-lg tw-border tw-bg-gray-100 hover:tw-bg-gray-200"
          >
            Hủy
          </button>
          <button
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
