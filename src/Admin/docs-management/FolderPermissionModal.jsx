import { useState, useEffect } from "react";
import Modal from "../Modal";
import {
  fetchAllUsers,
  getFolderPermissions,
  setFolderPermissions,
  getRootFolderId,
} from "../services/folderService";

export default function FolderPermissionModal({ isOpen, onClose, folder }) {
  const [users, setUsers] = useState([]);
  const [rootId, setRootId] = useState(null);
  const [changedUsers, setChangedUsers] = useState({});

  useEffect(() => {
    if (isOpen && !folder?.id) {
      // Nếu là folder gốc, lấy id folder gốc
      getRootFolderId().then((id) => setRootId(id));
    }
  }, [isOpen, folder]);

  useEffect(() => {
    if (isOpen) {
      const loadUsers = async () => {
        try {
          const allUsers = await fetchAllUsers();
          let folderPermissions = [];
          let folderId = folder?.id || rootId;
          if (folderId) {
            folderPermissions = await getFolderPermissions(folderId);
          }
          setUsers(
            allUsers.map((u) => ({
              id: u.id,
              name: u.name,
              email: u.email,
              permissions:
                folderPermissions.find((p) => p.user_id === u.id)
                  ?.permissions || [],
            }))
          );
        } catch (err) {
          console.error(err);
        }
      };
      loadUsers();
    }
  }, [isOpen, folder, rootId]);

  const togglePermission = (userId, perm) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              permissions: u.permissions.includes(perm)
                ? u.permissions.filter((p) => p !== perm)
                : [...u.permissions, perm],
            }
          : u
      )
    );
    setChangedUsers((prev) => ({ ...prev, [userId]: true }));
  };

  const handleSave = async () => {
    const folderId = folder?.id || rootId;
    if (folderId) {
      await setFolderPermissions(
        folderId,
        users
          .filter((u) => changedUsers[u.id]) // chỉ lấy user thay đổi
          .map((u) => ({
            user_id: u.id,
            can_view: u.permissions.includes("view"),
            can_add: u.permissions.includes("add"),
            can_edit: u.permissions.includes("edit"),
            can_delete: u.permissions.includes("delete"),
          }))
      );
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="tw-max-h-[80vh] tw-w-[415px] tw-p-4 tw-flex tw-flex-col">
        <h2 className="tw-text-xl tw-font-bold tw-mb-2">Phân quyền thư mục</h2>
        <p className="tw-text-sm tw-text-gray-500 tw-mb-4">
          Cài đặt quyền truy cập cho thư mục:{" "}
          <span className="tw-font-medium">
            {folder?.name || "Thư mục gốc"}
          </span>
        </p>

        {/* Danh sách user */}
        <div className="tw-flex-1 tw-space-y-3 tw-mb-4 tw-overflow-y-auto tw-pr-2">
          <p className="tw-font-medium tw-text-sm">
            Danh sách người dùng và quyền hạn:
          </p>
          {users.map((user) => (
            <div
              key={user.id}
              className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center sm:tw-justify-between tw-border tw-rounded-lg tw-p-3"
            >
              <div>
                <p className="tw-font-medium">{user.name}</p>
                <p className="tw-text-sm tw-text-gray-500">{user.email}</p>
              </div>
              <div className="tw-flex tw-items-center tw-gap-4 tw-mt-2 sm:tw-mt-0">
                {["view", "add", "edit", "delete"].map((perm) => (
                  <label
                    key={perm}
                    className="tw-flex tw-items-center tw-gap-1 tw-text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={user.permissions.includes(perm)}
                      onChange={() => togglePermission(user.id, perm)}
                    />
                    {perm === "view" && "Xem"}
                    {perm === "add" && "Thêm"}
                    {perm === "edit" && "Sửa"}
                    {perm === "delete" && "Xóa"}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lưu */}
        <button
          onClick={handleSave}
          className="tw-w-full tw-bg-red-600 tw-text-white tw-py-2 tw-rounded-lg hover:tw-bg-red-600 tw-transition"
        >
          Lưu phân quyền
        </button>
      </div>
    </Modal>
  );
}
