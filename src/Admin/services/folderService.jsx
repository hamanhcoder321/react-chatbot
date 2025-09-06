import axios from "axios";
import { API_ENDPOINTS } from "../../apiConfig.js";

const token = localStorage.getItem("token");

// Lấy danh sách folders
export const fetchFolders = async (params = {}) => {
  const response = await axios.get(API_ENDPOINTS.ADMIN_FOLDERS_LIST, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Tạo folder mới
export const createFolder = async (name, description, parentId = null) => {
  const response = await axios.post(
    API_ENDPOINTS.ADMIN_CREATE_FOLDER,
    { name, description, parent_id: parentId, category_id: 1 },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Xóa folder
export const deleteFolder = async (id) => {
  const response = await axios.delete(API_ENDPOINTS.ADMIN_DELETE_FOLDER(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Cập nhật folder
export const updateFolder = async (id, name) => {
  const response = await axios.put(
    API_ENDPOINTS.ADMIN_UPDATE_FOLDER(id),
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Lấy nội dung folder (folders con + documents)
export const getFolderContents = async (id) => {
  const response = await axios.get(API_ENDPOINTS.ADMIN_FOLDER_CONTENTS(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Upload document vào folder
export const uploadDocument = async (file, folderId = null) => {
  const formData = new FormData();
  formData.append("file", file);

  let url;
  if (folderId) {
    // Upload vào folder
    url = API_ENDPOINTS.ADMIN_UPLOAD_DOCUMENT(folderId);
  } else {
    // Upload không cần folder
    url = API_ENDPOINTS.ADMIN_UPLOAD_DOCUMENT_WITHOUT_FOLDER;
  }

  const response = await axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Lock folder
export const lockFolder = async (id) => {
  const response = await axios.put(
    API_ENDPOINTS.ADMIN_LOCK_FOLDER(id),
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const fetchAllUsers = async () => {
  const token = localStorage.getItem("token");
  let page = 1;
  let allUsers = [];
  let lastPage = 1;

  do {
    const res = await axios.get(
      `${API_ENDPOINTS.ADMIN_USERS_LIST}?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    allUsers = [...allUsers, ...res.data.data];
    lastPage = res.data.last_page;
    page++;
  } while (page <= lastPage);

  return allUsers;
};

// Lấy danh sách categories
export const fetchCategories = async (params = {}) => {
  const response = await axios.get(API_ENDPOINTS.ADMIN_CATEGORIES_LIST, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


// Lấy folder root + documents không thuộc folder nào
export const fetchRootItems = async () => {
  const response = await axios.get(API_ENDPOINTS.ADMIN_ROOT_ITEMS, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // giả sử response trả về { folders: [...], documents: [...] }
};


// Tạo category mới
export const createCategory = async (name, description = "") => {
  const response = await axios.post(
    API_ENDPOINTS.ADMIN_CREATE_CATEGORY,
    { name, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Sửa danh mục (category)
export const updateCategory = async (id, name, description = "") => {
  const response = await axios.put(
    API_ENDPOINTS.ADMIN_UPDATE_CATEGORY(id),
    { name, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Xóa danh mục (category)
export const deleteCategory = async (id) => {
  const response = await axios.delete(
    API_ENDPOINTS.ADMIN_DELETE_CATEGORY(id),
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};


// Cập nhật phân quyền folder
export const setFolderPermissions = async (folderId, permissions) => {
  let url;
  if (folderId) {
    url = API_ENDPOINTS.ADMIN_SET_FOLDER_PERMISSIONS(folderId);
  } else {
    url = API_ENDPOINTS.ADMIN_SET_ROOT_FOLDER_PERMISSIONS(); // gọi API root
  }

  const response = await axios.put(
    url,
    { permissions },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};


// Xóa user
export const deleteUser = async (id) => {
  const response = await axios.delete(API_ENDPOINTS.ADMIN_DELETE_USER(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

