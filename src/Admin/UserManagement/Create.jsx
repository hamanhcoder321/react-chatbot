import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../apiConfig";

// icon
import { FaEdit, FaShieldAlt, FaTrash, FaSearch } from "react-icons/fa";

// import các popup modal
import UserCreateModal from "./UserCreateModal";
import UserEditModal from "./UserEditModal";
import UserPermissionModal from "./UserPermissionModal";
import {
  deleteUser,
  updateUserRole,
  updateUserStatus,
} from "../services/folderService";

export default function Create() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // state phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // state tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  // state popup
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);

  // state user chọn
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page);
      if (search) params.append("search", search);

      const res = await axios.get(
        `${API_ENDPOINTS.ADMIN_USERS_LIST}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(res.data.data);
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.last_page);
      setTotalUsers(res.data.total);
    } catch (err) {
      console.error("Lỗi khi tải danh sách admin users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      alert("Xoá user thành công!");
      fetchUsers(currentPage, searchQuery);
    } catch (error) {
      console.error("Lỗi xoá user:", error);
      alert("Không thể xoá user!");
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      const updatedUser = await updateUserRole(id, newRole);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, role: updatedUser.role } : user
        )
      );

      setSelectedUser(updatedUser); // đồng bộ lại user đang chọn
    } catch (error) {
      console.error("Lỗi khi đổi role:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updatedUser = await updateUserStatus(id, newStatus);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: updatedUser.status } : user
        )
      );

      setSelectedUser(updatedUser); // đồng bộ lại user đang chọn
    } catch (error) {
      console.error("Lỗi khi đổi status:", error);
    }
  };

  // Tải danh sách khi component mount hoặc page thay đổi
  useEffect(() => {
    fetchUsers(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  return (
    <div className="tw-container tw-mx-auto tw-py-4 tw-px-4 sm:tw-py-6 tw-space-y-4 sm:tw-space-y-6">
      {/* Header */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center sm:tw-justify-between tw-space-y-4 sm:tw-space-y-0">
        <div className="tw-space-y-2">
          <h1 className="tw-text-2xl sm:tw-text-3xl tw-font-bold tw-tracking-tight">
            Quản lý người dùng
          </h1>
          <p className="tw-text-sm sm:tw-text-base tw-text-gray-500">
            Quản lý thông tin và phân quyền người dùng trong hệ thống
          </p>
        </div>
        <button
          onClick={() => setOpenCreate(true)}
          className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded"
        >
          ＋ Tạo người dùng mới
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="tw-border-2 tw-rounded tw-p-4">
        <h2 className="tw-font-semibold tw-mb-3">Tìm kiếm người dùng</h2>
        <div className="tw-flex tw-items-center tw-max-w-md tw-space-x-2">
          <div className="tw-relative tw-flex-1">
            <span className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400">
              <FaSearch />
            </span>
            <input
              placeholder="Tìm kiếm..."
              className="tw-w-full tw-pl-10 tw-pr-3 tw-py-2 tw-border tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => fetchUsers(1, searchQuery)}
            className="tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Danh sách người dùng */}
      <div className="tw-border-2 tw-rounded-lg">
        <div className="tw-p-4 tw-border-b">
          <h2 className="tw-font-semibold tw-text-lg">Danh sách người dùng</h2>
          <p className="tw-text-sm tw-text-gray-500">
            {loading
              ? "Đang tải..."
              : `Trang ${currentPage}/${totalPages} / Tổng cộng ${totalUsers} người dùng`}
          </p>
        </div>

        <div className="tw-overflow-x-auto">
          <table className="tw-w-full tw-text-sm tw-text-left">
            <thead>
              <tr className="tw-border-b tw-bg-gray-50">
                <th className="tw-px-3 tw-py-2">ID</th>
                <th className="tw-px-3 tw-py-2">Họ và Tên</th>
                <th className="tw-px-3 tw-py-2">Email</th>
                <th className="tw-px-3 tw-py-2">Vai trò</th>
                <th className="tw-px-3 tw-py-2">Trạng thái</th>
                <th className="tw-px-3 tw-py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                Array.isArray(users) &&
                users.map((u) => (
                  <tr key={u.id} className="tw-border-b">
                    <td className="tw-px-3 tw-py-2">{u.id}</td>
                    <td className="tw-px-3 tw-py-2">{u.name}</td>
                    <td className="tw-px-3 tw-py-2">{u.email}</td>
                    <td className="tw-px-3 tw-py-2">
                      <span className="tw-bg-gray-200 tw-px-2 tw-py-1 tw-rounded tw-text-xs">
                        {u.role}
                      </span>
                    </td>
                    <td className="tw-px-3 tw-py-2">
                      <span
                        className={`tw-px-2 tw-py-1 tw-rounded tw-text-xs ${
                          u.status === "active"
                            ? "tw-bg-green-200"
                            : u.status === "locked"
                            ? "tw-bg-red-200 tw-text-red-700"
                            : "tw-bg-yellow-200"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="tw-px-3 tw-py-2 tw-space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setOpenEdit(true);
                        }}
                        className="tw-text-black-500 hover:tw-text-blue-700"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setOpenPermission(true);
                        }}
                        className="tw-text-black-500 hover:tw-text-green-700"
                      >
                        <FaShieldAlt />
                      </button>

                      <button
                        onClick={async () => {
                          if (
                            window.confirm(
                              "Bạn có chắc muốn xoá user này không?"
                            )
                          ) {
                            await handleDeleteUser(u.id);
                          }
                        }}
                        className="tw-text-red-500 hover:tw-text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <div className="tw-flex tw-justify-center tw-items-center tw-py-4 tw-space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`tw-px-3 tw-py-1 tw-rounded ${
                page === currentPage
                  ? "tw-bg-red-600 tw-text-white"
                  : "tw-bg-gray-200 tw-text-gray-700 hover:tw-bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* popup */}
      <UserCreateModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onUserCreated={() => fetchUsers(currentPage, searchQuery)}
      />
      <UserEditModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        user={selectedUser}
        onUserUpdated={(updatedUser) => {
          setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          );

          // gọi luôn handleUpdateStatus nếu cần cập nhật status riêng
          handleUpdateStatus(updatedUser.id, updatedUser.status); // hoặc trực tiếp truyền form.status từ modal
        }}
      />

      <UserPermissionModal
        isOpen={openPermission}
        onClose={() => setOpenPermission(false)}
        user={selectedUser}
        onRoleUpdated={handleUpdateRole}
      />
    </div>
  );
}
