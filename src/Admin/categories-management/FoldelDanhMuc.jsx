import { useState } from "react";
import Modal from "../Modal";
import { createCategory } from "../services/folderService";

export default function FoldelDanhMuc({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCategory(name, description);
      if (onCreated) onCreated(); // callback để reload danh sách nếu cần
      onClose();
    } catch (err) {
      alert("Tạo danh mục thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="tw-text-xl tw-font-bold tw-mb-2">Tạo danh mục mới</h2>
      <p className="tw-text-sm tw-text-gray-500 tw-mb-4">
        Thêm danh mục phân loại tài liệu mới vào hệ thống
      </p>
      <form className="tw-space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Tên danh mục
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nhập tên danh mục"
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
            placeholder="Mô tả danh mục (tùy chọn)"
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="tw-w-full tw-bg-red-600 tw-text-white tw-py-2 tw-rounded-lg hover:tw-bg-red-500 tw-transition"
        >
          {loading ? "Đang tạo..." : "Tạo danh mục"}
        </button>
      </form>
    </Modal>
  );
}