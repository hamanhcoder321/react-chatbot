import { useState, useEffect } from "react";
import Modal from "../Modal";

export default function UserPermissionModal({
  isOpen,
  onClose,
  user,
  onRoleUpdated,
}) {
  const [role, setRole] = useState(user?.role || "");

  //  Đồng bộ lại role mỗi khi user thay đổi
  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      // gọi hàm từ Create để vừa update BE vừa update FE
      await onRoleUpdated(user.id, role);
      alert("Cập nhật quyền thành công!");
      onClose();
    } catch (err) {
      console.error("Lỗi khi cập nhật role:", err);
      alert("Không thể cập nhật role!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="tw-text-xl tw-font-bold tw-mb-4">Chỉnh sửa phân quyền</h2>
      <form className="tw-space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="tw-block tw-text-sm tw-font-medium">Vai trò</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2"
          >
            <option value="admin">Admin</option>
            <option value="quan_tri">Quản trị</option>
            <option value="giao_vien">Giáo Viên</option>
            <option value="sinh_vien">Sinh viên</option>
            <option value="hoc_sinh">Học Sinh</option>
          </select>
        </div>

        <button
          type="submit"
          className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-w-full"
        >
          Cập nhật phân quyền
        </button>
      </form>
    </Modal>
  );
}
