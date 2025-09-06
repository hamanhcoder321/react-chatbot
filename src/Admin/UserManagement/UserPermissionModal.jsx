import Modal from "../Modal";

export default function UserPermissionModal({ isOpen, onClose, user }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="tw-text-xl tw-font-bold tw-mb-4">Chỉnh sửa phân quyền</h2>
      <form className="tw-space-y-3">
        <div>
          <label className="tw-block tw-text-sm tw-font-medium">Vai trò</label>
          <select
            defaultValue={user?.role}
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2"
          >
            <option>Admin</option>
            <option>Quản trị</option>
            <option>Giáo Viên</option>
            <option>sinh viên</option>
            <option>Học Sinh</option>
          </select>
        </div>
        <div className="tw-space-y-2">
          <label className="tw-block tw-text-sm tw-font-medium">
            Quyền hạn cụ thể
          </label>
          <div className="tw-space-y-1">
            <label className="tw-flex tw-items-center tw-gap-2">
              <input type="checkbox" defaultChecked /> Quản lý người dùng
            </label>
            <label className="tw-flex tw-items-center tw-gap-2">
              <input type="checkbox" defaultChecked /> Quản lý tài liệu & danh mục
            </label>
          </div>
        </div>
        <button className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-w-full">
          Cập nhật phân quyền
        </button>
      </form>
    </Modal>
  );
}
