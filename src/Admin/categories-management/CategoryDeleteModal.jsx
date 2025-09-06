import Modal from "../Modal";
import { useState } from "react";
import { deleteCategory } from "../services/folderService";

export default function CategoryDeleteModal({ isOpen, onClose, category, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCategory(category.id);
      if (onDeleted) onDeleted();
      onClose();
    } catch (err) {
      alert("Xóa danh mục thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (!category) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="tw-text-xl tw-font-bold tw-mb-2">Xóa danh mục</h2>
      <p className="tw-text-gray-700 tw-mb-4">
        Bạn có chắc chắn muốn xóa danh mục <b>{category.name}</b> không? <br />
        Hành động này không thể hoàn tác.
      </p>
      <div className="tw-flex tw-justify-end tw-gap-2">
        <button
          className="tw-bg-gray-300 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded"
          onClick={onClose}
          disabled={loading}
        >
          Hủy
        </button>
        <button
          className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-red-700"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Đang xóa..." : "Xóa"}
        </button>
      </div>
    </Modal>
  );
}