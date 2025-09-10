import { useState, useEffect } from "react";
import FoldelDanhMuc from "./FoldelDanhMuc";
import CategoryEditModal from "./CategoryEditModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { fetchCategories } from "../services/folderService";

export default function DanhMuc() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data); // tùy response API trả về
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="tw-container tw-mx-auto tw-py-4 tw-px-4 sm:tw-py-6 tw-space-y-4 sm:tw-space-y-6">
      {/* Header */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center sm:tw-justify-between tw-space-y-4 sm:tw-space-y-0">
        <div className="tw-space-y-2">
          <h1 className="tw-text-2xl sm:tw-text-3xl tw-font-bold tw-tracking-tight">
            Quản lý danh mục tài liệu
          </h1>
          <p className="tw-text-sm sm:tw-text-base tw-text-gray-500">
            Quản lý các danh mục phân loại văn bản pháp luật
          </p>
        </div>

        {/* Nút tạo danh mục mới */}
        <button
          className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded"
          onClick={() => setIsOpen(true)}
        >
          ＋ Tạo danh mục mới
        </button>
        {/* Truyền onCreated vào modal */}
        <FoldelDanhMuc
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCreated={loadCategories}
        />
      </div>

      {/* Thanh tìm kiếm */}
      <div className="tw-border-2 tw-rounded tw-p-4">
        <h2 className="tw-font-semibold tw-mb-3">Tìm kiếm danh mục</h2>
        <div className="tw-flex tw-items-center tw-max-w-md tw-space-x-2">
          <div className="tw-relative tw-flex-1">
            <span className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400">
              <FaSearch />
            </span>
            <input
              placeholder="Tìm kiếm theo tên danh mục..."
              className="tw-w-full tw-pl-10 tw-pr-3 tw-py-2 tw-border tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
            />
          </div>
          <button className="tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg">
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Danh sách danh mục */}
      <div className="tw-border-2 tw-rounded tw-p-4">
        <h2 className="tw-font-semibold">Danh sách danh mục tài liệu</h2>
        <p className="tw-text-sm tw-text-gray-500">
          Tổng cộng {categories.length} danh mục
        </p>

        <table className="tw-w-full tw-mt-4 tw-border-collapse tw-rounded-lg tw-overflow-hidden">
          <thead className="tw-bg-gray-100">
            <tr>
              <th className="tw-border tw-px-4 tw-py-2 tw-text-left">ID</th>
              <th className="tw-border tw-px-4 tw-py-2 tw-text-left">
                Tên danh mục
              </th>
              <th className="tw-border tw-px-4 tw-py-2 tw-text-left">Mô tả</th>
              <th className="tw-border tw-px-4 tw-py-2 tw-text-center">
                Số tài liệu
              </th>
              <th className="tw-border tw-px-4 tw-py-2 tw-text-center">
                Ngày tạo
              </th>
              <th className="tw-border tw-px-4 tw-py-2 tw-text-center">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:tw-bg-gray-50">
                  <td className="tw-border tw-px-4 tw-py-2">{cat.id}</td>
                  <td className="tw-border tw-px-4 tw-py-2">
                    <span className="tw-bg-white tw-font-semibold tw-px-2 tw-py-1 tw-rounded tw-shadow-sm">
                      {cat.name}
                    </span>
                  </td>
                  <td className="tw-border tw-px-4 tw-py-2">
                    {cat.description}
                  </td>
                  <td className="tw-border tw-px-4 tw-py-2 tw-text-center">
                    {cat.documents_count} tài liệu
                  </td>
                  <td className="tw-border tw-px-4 tw-py-2 tw-text-center">
                    {new Date(cat.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="tw-border tw-px-2 tw-py-2 tw-text-center">
                    <button
                      className="tw-inline-flex tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-rounded tw-mr-2"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setEditOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <CategoryEditModal
                      isOpen={editOpen}
                      onClose={() => setEditOpen(false)}
                      category={selectedCategory}
                      onUpdated={loadCategories}
                    />
                    <button
                      className="tw-inline-flex tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-rounded  tw-text-red-500"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setDeleteOpen(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                    <CategoryDeleteModal
                      isOpen={deleteOpen}
                      onClose={() => setDeleteOpen(false)}
                      category={selectedCategory}
                      onDeleted={loadCategories}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="tw-text-center tw-py-4">
                  Không có danh mục nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
