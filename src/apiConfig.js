export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
  SEARCH_MESSAGES: (conversationId) =>
    `${API_BASE_URL}/messages/search/${conversationId}`,
  MARK_AS_READ: (id) => `${API_BASE_URL}/messages/${id}/read`,
  MARK_AS_UNREAD: (id) => `${API_BASE_URL}/messages/${id}/unread`,

  // ================= FORGOT PASSWORD =================
  FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/reset-password`,

  // ================= ADMIN - USER =================
  ADMIN_USERS_LIST: `${API_BASE_URL}/admin/users`, // GET
  ADMIN_CREATE_USER: `${API_BASE_URL}/admin/users`, // POST
  ADMIN_UPDATE_USER: (id) => `${API_BASE_URL}/admin/users/${id}`, // PUT
  ADMIN_DELETE_USER: (id) => `${API_BASE_URL}/admin/users/${id}`, // DELETE
  ADMIN_UPDATE_ROLE: (id) => `${API_BASE_URL}/admin/users/${id}/role`, // PUT
  ADMIN_UPDATE_STATUS: (id) => `${API_BASE_URL}/admin/users/${id}/status`, // PUT
  ADMIN_SET_PERMISSIONS: (id) =>
    `${API_BASE_URL}/admin/users/${id}/permissions`, // PUT
  ADMIN_ADD_PERMISSION: (id) => `${API_BASE_URL}/admin/users/${id}/permissions`, // POST
  ADMIN_GET_PERMISSIONS: (id) =>
    `${API_BASE_URL}/admin/users/${id}/permissions`, // GET

  // ================= ADMIN - FOLDER =================
  ADMIN_FOLDERS_LIST: `${API_BASE_URL}/admin/folders`, // GET
  ADMIN_CREATE_FOLDER: `${API_BASE_URL}/admin/folders`, // POST
  ADMIN_UPDATE_FOLDER: (id) => `${API_BASE_URL}/admin/folders/${id}`, // PUT
  ADMIN_DELETE_FOLDER: (id) => `${API_BASE_URL}/admin/folders/${id}`, // DELETE
  ADMIN_LOCK_FOLDER: (id) => `${API_BASE_URL}/admin/folders/${id}/lock`, // PUT
  ADMIN_FOLDER_CONTENTS: (id) => `${API_BASE_URL}/admin/folders/${id}/contents`, // GET
  ADMIN_UPLOAD_DOCUMENT: (id) => `${API_BASE_URL}/admin/folders/${id}/upload`, // POST
  ADMIN_SET_FOLDER_PERMISSIONS: (id) =>
    `${API_BASE_URL}/admin/folders/${id}/permissions`, // PUT
  ADMIN_GET_FOLDER_PERMISSIONS: (id) =>
    `${API_BASE_URL}/admin/folders/${id}/permissions`, // GET

  // Root container APIs
  ADMIN_CREATE_ROOT_CONTAINER: `${API_BASE_URL}/admin/folders/root-container`, // POST
  ADMIN_MOVE_ROOT_TO_CONTAINER: `${API_BASE_URL}/admin/folders/move-root-to-container`, // POST
  ADMIN_ROOT_IN_CONTAINER: `${API_BASE_URL}/admin/folders/root-in-container`, // GET
  ADMIN_SET_ROOT_PERMISSIONS: `${API_BASE_URL}/admin/folders/root/permissions`, // POST
  ADMIN_GET_ROOT_PERMISSIONS: `${API_BASE_URL}/admin/folders/root-container/permissions`, // GET

  // ================= ADMIN - DOCUMENT =================
  ADMIN_DELETE_DOCUMENT: (id) => `${API_BASE_URL}/admin/documents/${id}`, // DELETE
  ADMIN_UPDATE_DOCUMENT: (id) => `${API_BASE_URL}/admin/documents/${id}`, // PUT
  ADMIN_UPLOAD_DOCUMENT_WITHOUT_FOLDER: `${API_BASE_URL}/admin/documents/upload`, // POST
  ADMIN_DOCUMENTS_LIST: `${API_BASE_URL}/admin/documents`,

  // ================= ADMIN - CATEGORY =================
  ADMIN_CATEGORIES_LIST: `${API_BASE_URL}/admin/categories`, // GET
  ADMIN_CREATE_CATEGORY: `${API_BASE_URL}/admin/categories`, // POST
  ADMIN_UPDATE_CATEGORY: (id) => `${API_BASE_URL}/admin/categories/${id}`, // PUT
  ADMIN_DELETE_CATEGORY: (id) => `${API_BASE_URL}/admin/categories/${id}`, // DELETE
};
