import { useState, useEffect } from "react";
import Modal from "../Modal";
import { updateCategory } from "../services/folderService";

export default function CategoryEditModal({ isOpen, onClose, category, onUpdated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setDescription(category.description || "");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCategory(category.id, name, description);
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      alert("Sửa danh mục thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="tw-text-xl tw-font-bold tw-mb-2">Sửa danh mục</h2>
      <form className="tw-space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Tên danh mục
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
            required
          />
        </div>
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Mô tả
          </label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="tw-w-full tw-bg-red-600 tw-text-white tw-py-2 tw-rounded-lg hover:tw-bg-red-500 tw-transition"
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </Modal>
  );
}