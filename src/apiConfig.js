export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Gom tất cả endpoint của Laravel API vào đây
// Gom tất cả endpoint của Laravel API vào đây
export const API_ENDPOINTS = {
  // ================= AUTH =================
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
  ME: `${API_BASE_URL}/auth/me`,
  DELETE_ACCOUNT: `${API_BASE_URL}/auth/delete`,

  // ================= CHAT =================
  SEND_MESSAGE: `${API_BASE_URL}/messages`,
  CHAT_HISTORY: (conversationId) =>
    `${API_BASE_URL}/messages/history/${conversationId}`,
  RECENT_CONVERSATIONS: `${API_BASE_URL}/messages/recent`,
  DELETE_CONVERSATION: (conversationId) =>
    `${API_BASE_URL}/messages/conversation/${conversationId}`,

  // ================= FORGOT PASSWORD =================
  FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/reset-password`,

  // ================= ADMIN - USER =================
  ADMIN_USERS_LIST: `${API_BASE_URL}/admin/users`, // GET danh sách

  ADMIN_CREATE_USER: `${API_BASE_URL}/admin/users`, // POST tạo user

  ADMIN_UPDATE_USER: (id) => `${API_BASE_URL}/admin/users/${id}`, // PUT cập nhật

  ADMIN_DELETE_USER: (id) => `${API_BASE_URL}/admin/users/${id}`, // DELETE

  ADMIN_UPDATE_ROLE: (id) => `${API_BASE_URL}/admin/users/${id}/role`, // PUT đổi quyền

  ADMIN_UPDATE_STATUS: (id) => `${API_BASE_URL}/admin/users/${id}/status`, // PUT khóa/mở

  ADMIN_SET_PERMISSIONS: (id) =>
    `${API_BASE_URL}/admin/users/${id}/permissions`, // PUT set quyền

  ADMIN_ADD_PERMISSION: (id) => `${API_BASE_URL}/admin/users/${id}/permissions`, // POST thêm quyền

  ADMIN_GET_PERMISSIONS: (id) =>
    `${API_BASE_URL}/admin/users/${id}/permissions`, // GET danh sách quyền

  // ================= ADMIN - FOLDER =================
  ADMIN_FOLDERS_LIST: `${API_BASE_URL}/admin/folders`, // GET danh sách
  ADMIN_CREATE_FOLDER: `${API_BASE_URL}/admin/folders`, // POST tạo folder
  ADMIN_UPDATE_FOLDER: (id) => `${API_BASE_URL}/admin/folders/${id}`, // PUT cập nhật
  ADMIN_DELETE_FOLDER: (id) => `${API_BASE_URL}/admin/folders/${id}`, // DELETE

  // Folder contents
  ADMIN_FOLDER_CONTENTS: (id) => `${API_BASE_URL}/admin/folders/${id}/contents`, // GET

  // Upload document
  ADMIN_UPLOAD_DOCUMENT: (id) => `${API_BASE_URL}/admin/folders/${id}/upload`, // POST
  // ================= ADMIN - DOCUMENT =================
  ADMIN_UPLOAD_DOCUMENT_WITHOUT_FOLDER: `${API_BASE_URL}/admin/documents/upload`,
  // POST upload không cần folder

  // Lock folder
  ADMIN_LOCK_FOLDER: (id) => `${API_BASE_URL}/admin/folders/${id}/lock`, // PUT

  // Folder permissions
  ADMIN_FOLDER_PERMISSIONS: (id) =>
    `${API_BASE_URL}/admin/folders/${id}/permissions`, // PUT

  // ================= ADMIN - CATEGORY =================
  ADMIN_CATEGORIES_LIST: `${API_BASE_URL}/admin/categories`, // GET danh sách

  ADMIN_CREATE_CATEGORY: `${API_BASE_URL}/admin/categories`, // POST tạo

  ADMIN_UPDATE_CATEGORY: (id) => `${API_BASE_URL}/admin/categories/${id}`, // PUT cập nhật

  ADMIN_DELETE_CATEGORY: (id) => `${API_BASE_URL}/admin/categories/${id}`, // DELETE

  ADMIN_ROOT_ITEMS: `${API_BASE_URL}/admin/root-items`,

  ADMIN_SET_FOLDER_PERMISSIONS: (id) =>
    `${API_BASE_URL}/admin/folders/${id}/permissions`,

  ADMIN_SET_ROOT_FOLDER_PERMISSIONS: () => `${API_BASE_URL}/admin/folders/root/permissions`,
};
