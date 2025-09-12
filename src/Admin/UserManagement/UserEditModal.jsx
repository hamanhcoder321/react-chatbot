import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import { API_ENDPOINTS } from "../../apiConfig";

export default function UserEditModal({
  isOpen,
  onClose,
  user,
  onUserUpdated,
}) {
  const [form, setForm] = useState({ name: "", email: "", status: "active" });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        status: user.status || "active", // backend trả về "active" / "locked"
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        API_ENDPOINTS.ADMIN_UPDATE_USER(user.id),
        form,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      onUserUpdated({ ...res.data.user, status: form.status });

      onClose();
    } catch (err) {
      console.error("Lỗi update user:", err.response?.data || err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="tw-text-xl tw-font-bold tw-mb-4">Chỉnh sửa thông tin</h2>
      <form onSubmit={handleSubmit} className="tw-space-y-3">
        <div>
          <label className="tw-block tw-text-sm tw-font-medium">
            Tên đăng nhập
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2"
          />
        </div>
        <div>
          <label className="tw-block tw-text-sm tw-font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2"
          />
        </div>
        <div>
          <label className="tw-block tw-text-sm tw-font-medium">
            Trạng thái
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="tw-w-full tw-border tw-rounded tw-px-3 tw-py-2"
          >
            <option value="active">Active</option>
            <option value="locked">Locked</option>
          </select>
        </div>
        <button
          type="submit"
          className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-w-full"
        >
          Lưu thay đổi
        </button>
      </form>
    </Modal>
  );
}
