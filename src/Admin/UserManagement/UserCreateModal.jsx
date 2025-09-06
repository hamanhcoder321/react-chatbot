import Modal from "../Modal";
import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../apiConfig"; // chỗ bạn khai báo ADMIN_CREATE_USER

export default function UserCreateModal({ isOpen, onClose, onUserCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(API_ENDPOINTS.ADMIN_CREATE_USER, {
        name,
        email,
        password,
        role,
      });

      console.log("Tạo user thành công:", response.data);

      // Nếu bạn muốn reload danh sách user sau khi tạo
      if (onUserCreated) onUserCreated(response.data);

      // đóng modal và reset form
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      onClose();
    } catch (err) {
      console.error("Lỗi tạo user:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Có lỗi xảy ra khi tạo user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="tw-text-xl tw-font-bold tw-mb-4">Tạo người dùng mới</h2>
      <form className="tw-space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="tw-block tw-text-sm tw-font-medium">
            Họ và tên
          </label>
          <input
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium">Email</label>
          <input
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium">Mật khẩu</label>
          <input
            type="password"
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium">Vai trò</label>
          <select
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Chọn vai trò</option>
            <option value="quan_tri">Quản Trị</option>
            <option value="giao_vien">Giáo Viên</option>
            <option value="hoc_sinh">Học Sinh</option>
            <option value="sinh_vien">Sinh Viên</option>
          </select>
        </div>

        {error && <p className="tw-text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-w-full"
        >
          {loading ? "Đang tạo..." : "Tạo người dùng"}
        </button>
      </form>
    </Modal>
  );
}
