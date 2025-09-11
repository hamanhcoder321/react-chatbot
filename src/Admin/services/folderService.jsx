import axios from "axios";
import { API_ENDPOINTS } from "../../apiConfig.js";

// Helper để lấy token mới nhất
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/* ================= FOLDERS ================= */

// Lấy tất cả folder gốc (trong thư mục tổng)
export const fetchRootItems = async () => {
  const response = await axios.get(API_ENDPOINTS.ADMIN_FOLDERS_LIST, {
    params: { per_page: 1000 }, // lấy nhiều để tránh phân trang
    headers: getAuthHeaders(),
  });

  const allFolders = response.data.data || [];
  const rootFolders = allFolders.filter((folder) => folder.parent_id === null);

  return {
    folders: rootFolders,
    documents: [], // hiện API index chưa trả về documents
  };
};

// Tạo thư mục tổng
export const createRootContainer = async () => {
  const response = await axios.post(
    API_ENDPOINTS.ADMIN_CREATE_ROOT_CONTAINER,
    {},
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Chuyển tất cả folder gốc vào thư mục tổng
export const moveRootFolders = async () => {
  const response = await axios.post(
    API_ENDPOINTS.ADMIN_MOVE_ROOT_FOLDERS,
    {},
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// tạo folder nằm trong thu mục tổng
export const createFolder = async (
  name,
  description,
  parentId = null,
  categoryid
) => {
  const response = await axios.post(
    API_ENDPOINTS.ADMIN_CREATE_FOLDER,
    {
      name,
      description,
      parent_id: parentId,
      category_id: categoryid,
    },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Cập nhật folder
export const updateFolder = async (id, name, description = "") => {
  const response = await axios.put(
    API_ENDPOINTS.ADMIN_UPDATE_FOLDER(id),
    { name, description },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Xóa folder
export const deleteFolderAdmin = async (id) => {
  const response = await axios.delete(API_ENDPOINTS.ADMIN_DELETE_FOLDER(id), {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Lấy nội dung folder (subfolders + documents)
export const getFolderContents = async (id) => {
  const response = await axios.get(API_ENDPOINTS.ADMIN_FOLDER_CONTENTS(id), {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/* ================= DOCUMENTS ================= */

// Lấy tất cả documents (ngoài hoặc trong folder)
export const fetchAllDocuments = async () => {
  const response = await axios.get(API_ENDPOINTS.ADMIN_DOCUMENTS_LIST, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Upload document
export const uploadDocument = async (file, folderId = null) => {
  const formData = new FormData();
  formData.append("file", file);

  const url = folderId
    ? API_ENDPOINTS.ADMIN_UPLOAD_DOCUMENT(folderId) // vào folder
    : API_ENDPOINTS.ADMIN_UPLOAD_DOCUMENT_WITHOUT_FOLDER; // ngoài folder

  const response = await axios.post(url, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ================= CATEGORIES ================= */

export const fetchCategories = async () => {
  const response = await axios.get(API_ENDPOINTS.ADMIN_CATEGORIES_LIST, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const createCategory = async (name, description = "") => {
  const response = await axios.post(
    API_ENDPOINTS.ADMIN_CREATE_CATEGORY,
    { name, description },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const updateCategory = async (id, name, description = "") => {
  const response = await axios.put(
    API_ENDPOINTS.ADMIN_UPDATE_CATEGORY(id),
    { name, description },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(API_ENDPOINTS.ADMIN_DELETE_CATEGORY(id), {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/* ================= PERMISSIONS ================= */

// Lấy quyền folder
export const getFolderPermissions = async (folderId) => {
  const response = await axios.get(
    API_ENDPOINTS.ADMIN_GET_FOLDER_PERMISSIONS(folderId),
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Set quyền folder / root
export const setFolderPermissions = async (folderId, permissions) => {
  if (folderId) {
    const response = await axios.put(
      API_ENDPOINTS.ADMIN_SET_FOLDER_PERMISSIONS(folderId),
      { permissions },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } else {
    const response = await axios.post(
      API_ENDPOINTS.ADMIN_SET_ROOT_PERMISSIONS,
      { permissions },
      { headers: getAuthHeaders() }
    );
    return response.data;
  }
};

// Lấy quyền root container
export const getRootFolderId = async () => {
  const response = await axios.get(API_ENDPOINTS.ADMIN_GET_ROOT_PERMISSIONS, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/* ================= USERS ================= */

export const fetchAllUsers = async () => {
  let page = 1;
  let allUsers = [];
  let lastPage = 1;

  do {
    const res = await axios.get(
      `${API_ENDPOINTS.ADMIN_USERS_LIST}?page=${page}`,
      { headers: getAuthHeaders() }
    );
    allUsers = [...allUsers, ...res.data.data];
    lastPage = res.data.last_page;
    page++;
  } while (page <= lastPage);

  return allUsers;
};

export const searchUsers = async (
  search = "",
  role = "",
  status = "",
  per_page = 10
) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (role) params.append("role", role);
  if (status) params.append("status", status);
  params.append("per_page", per_page);

  const response = await axios.get(
    `${API_ENDPOINTS.ADMIN_USERS_LIST}?${params.toString()}`,
    { headers: getAuthHeaders() }
  );

  return response.data;
};

// Xóa user
export const deleteUser = async (id) => {
  const response = await axios.delete(API_ENDPOINTS.ADMIN_DELETE_USER(id), {
    headers: getAuthHeaders(),
  });
  return response.data;
};
