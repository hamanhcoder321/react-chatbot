import { useState, useEffect } from "react";
import FolderCreateModal from "./FolderCreateModal";
import FolderEditModal from "./FolderEditModal";
import FolderPermissionModal from "./FolderPermissionModal";
import DeleteFolderModal from "./DeleteFolderModal";

import { useAuth } from "../../components/AuthContext/AuthContext.jsx";

// import LockFolderModal from "./LockFolderModal";
import {
  fetchRootItems,
  getFolderContents,
  uploadDocument,
} from "../services/folderService";
import {
  FaHome,
  FaFolderPlus,
  FaUpload,
  FaUsers,
  FaEllipsisV,
  FaFolder,
  FaFileAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaLock,
  FaSearch,
  FaList,
  FaThLarge,
  FaTimes,
} from "react-icons/fa";

export default function Page() {
  const { user } = useAuth(); // user đang đăng nhập

  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isPermissionModalOpen, setPermissionModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list hoặc grid
  const [editFolder, setEditFolder] = useState(null);

  const [selectedDoc, setSelectedDoc] = useState(null);

  const [permissionFolder, setPermissionFolder] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);

  // const [lockModalOpen, setLockModalOpen] = useState(false);
  // const [folderToLock, setFolderToLock] = useState(null);

  const [currentFolder, setCurrentFolder] = useState({
    id: null,
    name: "Thư mục gốc",
    parent_id: null,
  });
  const [pathStack, setPathStack] = useState([]);

  const loadFolderContents = async (folderId = null) => {
    try {
      setLoading(true);
      let foldersData = [];
      let documentsData = [];

      if (folderId === null) {
        // GỌI API root
        const res = await fetchRootItems();
        // Backend trả về { folders: [...], documents: [...] }
        foldersData = res.folders || [];
        documentsData = res.documents || [];
      } else {
        // GỌI API folder con
        const res = await getFolderContents(folderId);
        // Backend trả về { folders: [...], documents: [...] }
        foldersData = res.folders || [];
        documentsData = res.documents || [];
      }

      setFolders(foldersData);
      setDocuments(documentsData);
    } catch (err) {
      console.error("Lỗi load folder:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFolderContents(null);
  }, []);

  const openFolder = (folder) => {
    setPathStack([...pathStack, currentFolder]);
    setCurrentFolder(folder);
    loadFolderContents(folder.id);
  };

  const openDocument = (doc) => {
    setSelectedDoc(doc);
  };

  const closeDocument = () => {
    setSelectedDoc(null);
  };

  const goBack = () => {
    const newStack = [...pathStack];
    const prevFolder = newStack.pop();
    setPathStack(newStack);
    setCurrentFolder(
      prevFolder || { id: null, name: "Thư mục gốc", parent_id: null }
    );
    loadFolderContents(prevFolder?.id || null);
  };

  const handleUpload = async (files, folderId) => {
    if (!files || files.length === 0) return;

    try {
      const uploadedDocs = [];
      for (const file of files) {
        const res = await uploadDocument(file, folderId);

        // ép thêm creator name ngay tại FE
        const newDoc = {
          ...res.document,
          creator: user?.name || "Bạn",
        };

        uploadedDocs.push(newDoc);
      }

      setDocuments((prev) => [...uploadedDocs, ...prev]); // thêm lên đầu
    } catch (err) {
      console.error("Lỗi upload:", err);
    }
  };

  const handleFolderDeleted = (id) => {
    // reload folder hiện tại sau khi xóa
    loadFolderContents(currentFolder.id);
  };

  return (
    <div className="tw-container tw-mx-auto tw-py-4 tw-px-4 sm:tw-py-6 tw-space-y-6">
      {/* Header */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center sm:tw-justify-between">
        <div>
          <h1 className="tw-text-2xl sm:tw-text-3xl tw-font-bold tw-tracking-tight">
            Quản lý tài liệu
          </h1>
          <p className="tw-text-sm sm:tw-text-base tw-text-gray-500">
            Quản lý thư mục và tài liệu pháp luật trong hệ thống
          </p>
        </div>
      </div>

      {/* Breadcrumb + back */}
      <div className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-text-gray-600">
        <button
          onClick={goBack}
          disabled={pathStack.length === 0}
          className="hover:tw-underline tw-flex tw-items-center tw-gap-1"
        >
          <FaHome />
        </button>
        <span className="tw-font-medium">{currentFolder.name}</span>
      </div>

      {/* Toolbar */}
      <div className="tw-border-2 tw-rounded-lg tw-p-4">
        <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center lg:tw-justify-between tw-gap-4">
          {/* Search */}
          <div className="tw-w-full lg:tw-max-w-sm tw-relative">
            <span className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400">
              <FaSearch />
            </span>
            <input
              placeholder="Tìm kiếm..."
              className="tw-w-full tw-pl-10 tw-pr-3 tw-py-2 tw-border tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="tw-flex tw-flex-wrap tw-gap-2">
            <button
              onClick={() => setFolderModalOpen(true)}
              className="tw-flex tw-items-center tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm hover:tw-bg-gray-50"
            >
              <FaFolderPlus className="tw-mr-2 tw-text-red-600" /> Tạo thư mục
            </button>

            <label className="tw-flex tw-items-center tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm hover:tw-bg-gray-50 tw-cursor-pointer">
              <FaUpload className="tw-mr-2 tw-text-red-600" /> Upload tài liệu
              <input
                type="file"
                className="tw-hidden"
                onChange={(e) =>
                  handleUpload(Array.from(e.target.files), currentFolder.id)
                }
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>

            <button
              onClick={() => {
                setPermissionFolder(currentFolder);
                setPermissionModalOpen(true);
              }}
              className="tw-flex tw-items-center tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm hover:tw-bg-gray-50"
            >
              <FaUsers className="tw-mr-2 tw-text-red-600" /> Phân quyền
            </button>

            <FolderCreateModal
              isOpen={isFolderModalOpen}
              onClose={() => setFolderModalOpen(false)}
              onCreated={(newFolder) => {
                if (newFolder.parent_id === currentFolder.id) {
                  setFolders((prev) => [newFolder, ...prev]); // thêm folder mới đầu mảng
                }
              }}
              parentFolder={currentFolder}
            />

            <FolderEditModal
              isOpen={!!editFolder}
              onClose={() => setEditFolder(null)}
              folder={editFolder}
              onUpdated={() => loadFolderContents(currentFolder.id)}
            />

            <FolderPermissionModal
              isOpen={isPermissionModalOpen}
              onClose={() => setPermissionModalOpen(false)}
              folder={permissionFolder}
            />

            <DeleteFolderModal
              isOpen={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              folder={folderToDelete}
              onDeleted={handleFolderDeleted}
            />
            {/* <LockFolderModal
              isOpen={lockModalOpen}
              onClose={() => setLockModalOpen(false)}
              folder={folderToLock}
              onLocked={() => loadFolderContents(currentFolder.id)}
            /> */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={`tw-border-2 tw-rounded-lg tw-p-4 ${
          viewMode === "grid"
            ? "tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-3"
            : "tw-space-y-4"
        }`}
      >
        {/* View switch buttons đặt bên trong */}
        <div className="tw-col-span-full tw-flex tw-justify-end tw-gap-2">
          <div className="tw-flex tw-border-2 tw-rounded-lg tw-overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`tw-px-3 tw-py-2 tw-flex tw-items-center hover:tw-bg-gray-100 ${
                viewMode === "list" ? "tw-bg-gray-200" : ""
              }`}
            >
              <FaList className="tw-mr-1" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`tw-px-3 tw-py-2 tw-flex tw-items-center hover:tw-bg-gray-100 ${
                viewMode === "grid" ? "tw-bg-gray-200" : ""
              }`}
            >
              <FaThLarge className="tw-mr-1" />
            </button>
          </div>
        </div>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            {folders.map((folder) =>
              viewMode === "grid" ? (
                <div
                  key={folder.id}
                  className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-border tw-flex tw-flex-col tw-items-center tw-p-4 tw-relative hover:tw-shadow-md"
                >
                  {/* Icon folder */}
                  <FaFolder className="tw-text-yellow-400 tw-text-5xl tw-mb-2" />

                  {/* Nếu folder bị khóa */}

                  {/* Tên folder */}
                  <div className="tw-font-semibold tw-mb-1 tw-text-center">
                    {folder.name}
                  </div>

                  {/* Người tạo */}
                  <div className="tw-text-xs tw-text-gray-500">
                    Tạo bởi: {folder.creator || "Admin"}
                  </div>

                  {/* Ngày tạo */}
                  <div className="tw-text-xs tw-text-gray-400">
                    {folder.created_at &&
                      new Date(folder.created_at).toLocaleDateString("vi-VN")}
                  </div>

                  {/* Trạng thái nếu có */}

                  {/* Action menu nút 3 chấm */}
                  <div className="tw-absolute tw-top-3 tw-right-2">
                    <button
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === folder.id ? null : folder.id
                        )
                      }
                      className="tw-p-1 tw-rounded-full hover:tw-bg-gray-100"
                    >
                      <FaEllipsisV />
                    </button>
                    {activeMenu === folder.id && (
                      <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-40 tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-z-10">
                        <button
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                          onClick={() => openFolder(folder)}
                        >
                          <FaEye /> Xem chi tiết
                        </button>
                        <button
                          onClick={() => {
                            setEditFolder(folder);
                            setActiveMenu(null);
                          }}
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                        >
                          <FaEdit /> Sửa
                        </button>
                        <button
                          onClick={() => {
                            setFolderToDelete(folder);
                            setDeleteModalOpen(true);
                            setActiveMenu(null); // đóng menu
                          }}
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50 tw-text-red-600"
                        >
                          <FaTrash /> Xóa
                        </button>

                        <button
                          // onClick={() => {
                          //   setFolderToLock(folder);
                          //   setLockModalOpen(true);
                          //   setActiveMenu(null);
                          // }}
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                        >
                          <FaLock /> Khóa thư mục
                        </button>
                        <button
                          onClick={() => {
                            setPermissionFolder(folder);
                            setPermissionModalOpen(true); // mở modal
                            setActiveMenu(null);
                          }}
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                        >
                          <FaUsers /> Phân quyền
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // ==== LIST ====
                <div
                  key={folder.id}
                  className="tw-border-2 tw-px-4 tw-py-3 tw-rounded-lg tw-flex tw-items-center tw-justify-between hover:tw-bg-gray-50"
                >
                  {/* Folder icon + tên + ngày tạo */}
                  <div className="tw-flex tw-items-center tw-gap-3 tw-cursor-pointer">
                    <FaFolder className="tw-text-yellow-400 tw-text-2xl" />
                    <div className="tw-flex tw-flex-col">
                      <span className="tw-text-black tw-font-medium">
                        {folder.name}
                      </span>
                      <span className="tw-text-xs tw-text-gray-500">
                        Tạo bởi: {folder.creator || "Admin"}
                      </span>
                      {folder.created_at && (
                        <span className="tw-text-xs tw-text-gray-400">
                          {new Date(folder.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Action menu nút 3 chấm */}
                  <div key={folder.id} className="tw-relative">
                    <button
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === folder.id ? null : folder.id
                        )
                      }
                      className="tw-p-1 tw-rounded-full hover:tw-bg-gray-100"
                    >
                      <FaEllipsisV />
                    </button>
                    {activeMenu === folder.id && (
                      <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-40 tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-z-10">
                        <button
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                          onClick={() => openFolder(folder)}
                        >
                          <FaEye /> Xem chi tiết
                        </button>
                        <button
                          onClick={() => {
                            setEditFolder(folder);
                            setActiveMenu(null);
                          }}
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                        >
                          <FaEdit /> Sửa
                        </button>
                        <button
                          onClick={() => {
                            setFolderToDelete(folder);
                            setDeleteModalOpen(true);
                            setActiveMenu(null);
                          }}
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50 tw-text-red-600"
                        >
                          <FaTrash /> Xóa
                        </button>

                        <button
                          // onClick={() => {
                          //   setFolderToLock(folder);
                          //   setLockModalOpen(true);
                          //   setActiveMenu(null);
                          // }}
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                        >
                          <FaLock /> Khóa thư mục
                        </button>
                        <button
                          onClick={() => {
                            setPermissionFolder(folder);
                            setPermissionModalOpen(true); // mở modal
                            setActiveMenu(null);
                          }}
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                        >
                          <FaUsers /> Phân quyền
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}

            {documents.map((doc) =>
              viewMode === "grid" ? (
                <div
                  key={doc.id}
                  className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-border tw-flex tw-flex-col tw-items-center tw-p-4 tw-relative hover:tw-shadow-md"
                >
                  {/* Loại tài liệu */}
                  {doc.category && (
                    <span className="tw-absolute tw-top-3 tw-left-3 tw-bg-gray-100 tw-text-gray-600 tw-px-2 tw-py-1 tw-rounded tw-text-xs">
                      {doc.category}
                    </span>
                  )}
                  {/* Icon file */}
                  <FaFileAlt
                    className="tw-text-gray-400 tw-text-5xl tw-mb-2"
                    onClick={() => openDocument(doc)}
                  />
                  {/* Tên file */}
                  <div className="tw-font-semibold tw-mb-1 tw-text-center tw-truncate">
                    {doc.name}
                  </div>
                  {/* Người tạo */}
                  <div className="tw-text-xs tw-text-gray-500">
                    Tạo bởi: {doc.creator || "Admin"}
                  </div>
                  {/* Dung lượng */}
                  {doc.size && (
                    <div className="tw-text-xs tw-text-gray-400">
                      {doc.size}
                    </div>
                  )}
                  {/* Ngày tạo */}
                  <div className="tw-text-xs tw-text-gray-400">
                    {doc.created_at &&
                      new Date(doc.created_at).toLocaleDateString("vi-VN")}
                  </div>
                  {/* Action menu nút 3 chấm */}
                  <div className="tw-absolute tw-top-3 tw-right-3">
                    <button
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === `doc-${doc.id}`
                            ? null
                            : `doc-${doc.id}`
                        )
                      }
                      className="tw-p-1 tw-rounded-full hover:tw-bg-gray-100"
                    >
                      <FaEllipsisV />
                    </button>
                    {activeMenu === `doc-${doc.id}` && (
                      <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-40 tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-z-10">
                        <button
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                          onClick={() => openDocument(doc)}
                        >
                          <FaEye /> Xem chi tiết
                        </button>
                        <button className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50">
                          <FaEdit /> Sửa
                        </button>
                        <button className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50 tw-text-red-600">
                          <FaTrash /> Xóa
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // ==== LIST ====
                <div
                  key={doc.id}
                  className="tw-border tw-px-4 tw-py-3 tw-rounded-lg tw-flex tw-items-center tw-justify-between hover:tw-bg-gray-50"
                >
                  <div className="tw-flex tw-items-center tw-gap-3">
                    <FaFileAlt
                      className="tw-text-2xl tw-text-gray-600"
                      onClick={() => openDocument(doc)}
                    />
                    <div className="tw-flex tw-flex-col">
                      <span className="tw-text-black tw-font-medium">
                        {doc.name}
                      </span>
                      <span className="tw-text-xs tw-text-gray-500">
                        Tạo bởi: {doc.creator || "Admin"}
                      </span>
                      {doc.created_at && (
                        <span className="tw-text-xs tw-text-gray-400">
                          {new Date(doc.created_at).toLocaleDateString("vi-VN")}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Action menu nút 3 chấm */}
                  <div className="tw-relative">
                    <button
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === `doc-${doc.id}`
                            ? null
                            : `doc-${doc.id}`
                        )
                      }
                      className="tw-p-1 tw-rounded-full hover:tw-bg-gray-100"
                    >
                      <FaEllipsisV />
                    </button>
                    {activeMenu === `doc-${doc.id}` && (
                      <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-40 tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-z-10">
                        <button
                          className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50"
                          onClick={() => openDocument(doc)}
                        >
                          <FaEye /> Xem chi tiết
                        </button>
                        <button className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50">
                          <FaEdit /> Sửa
                        </button>
                        <button className="tw-flex tw-items-center tw-gap-2 tw-w-full tw-text-left tw-px-4 tw-py-2 hover:tw-bg-gray-50 tw-text-red-600">
                          <FaTrash /> Xóa
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>

      {/* Upload Box */}
      <div
        className="tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-p-6 sm:tw-p-8 tw-text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const files = Array.from(e.dataTransfer.files);
          handleUpload(files, currentFolder.id);
        }}
      >
        <label className="tw-cursor-pointer">
          <FaUpload className="tw-h-8 tw-w-8 tw-mx-auto tw-text-gray-400 tw-mb-2" />
          <p className="tw-text-sm tw-text-gray-500">
            Kéo và thả tệp vào đây để upload, hoặc{" "}
            <span className="tw-text-red-600 tw-font-medium hover:tw-underline">
              chọn tệp
            </span>
          </p>
          <input
            type="file"
            className="tw-hidden"
            multiple
            onChange={(e) =>
              handleUpload(Array.from(e.target.files), currentFolder.id)
            }
          />
        </label>
      </div>

      {selectedDoc && (
        <div className="tw-fixed tw-inset-0  tw-flex tw-items-center tw-justify-center tw-z-50">
          <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-w-[600px] tw-max-h-[80vh] tw-overflow-y-auto tw-p-6">
            {/* Header */}
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <h2 className="tw-text-lg tw-font-semibold">
                {selectedDoc.name}
              </h2>
              <button
                onClick={closeDocument}
                className="tw-text-gray-500 hover:tw-text-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            {/* Nội dung tài liệu */}
            <div className="tw-text-gray-700 tw-space-y-2">
              {selectedDoc.content ? (
                <p>Nội dung: {selectedDoc.content}</p>
              ) : (
                <p className="tw-text-gray-400">Không có nội dung</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
