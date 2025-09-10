import { useState, useEffect } from "react";
import Modal from "../Modal";
import { createFolder, fetchCategories } from "../services/folderService";
import { useAuth } from "../../components/AuthContext/AuthContext.jsx";

export default function FolderCreateModal({
  isOpen,
  onClose,
  onCreated,
  parentFolder,
}) {
  const { user } = useAuth(); // lấy thông tin user đăng nhập
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]); // lưu danh sách categories
  const [loading, setLoading] = useState(false);

  // Lấy danh sách categories khi modal mở
  useEffect(() => {
    if (!isOpen) return;

    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        // Nếu res là mảng thì set luôn, nếu là object thì lấy res.categories
        setCategories(Array.isArray(res) ? res : res.categories || []);
      } catch (err) {
        console.error("Lỗi lấy danh sách danh mục:", err);
      }
    };

    loadCategories();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createFolder(
        name,
        description,
        parentFolder?.id || null,
        categoryId
      );

      // ép thêm creator name cho folder mới
      const newFolder = {
        ...res.folder,
        creator: user?.name || "Bạn",
      };

      alert(res.message);
      if (onCreated) onCreated(newFolder);

      setName("");
      setDescription("");
      setCategoryId(null);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Tạo thư mục thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="tw-text-xl tw-font-bold tw-mb-2">Tạo thư mục mới</h2>
      <p className="tw-text-sm tw-text-gray-500 tw-mb-4">
        Tạo thư mục mới trong:{" "}
        <span className="tw-font-medium">
          {parentFolder?.name || "Thư mục gốc"}
        </span>
      </p>

      <form className="tw-space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Tên thư mục
          </label>
          <input
            type="text"
            placeholder="Nhập tên thư mục"
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Mô tả (tùy chọn)
          </label>
          <textarea
            placeholder="Nhập mô tả cho thư mục..."
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2 tw-min-h-[80px] focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Loại danh mục <span className="tw-text-red-500">*</span>
          </label>
          <select
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
            value={categoryId !== null ? categoryId.toString() : ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
          >
            <option value="">-- Chọn loại danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="tw-w-full tw-bg-red-600 tw-text-white tw-py-2 tw-rounded-lg hover:tw-bg-red-700 tw-transition"
        >
          {loading ? "Đang tạo..." : "Tạo thư mục"}
        </button>
      </form>
    </Modal>
  );
}
