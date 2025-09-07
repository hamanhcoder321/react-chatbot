import { lockFolder } from "../services/folderService";

export default function LockFolderModal({ isOpen, onClose, folder, onLocked }) {
  if (!isOpen || !folder) return null;

  const handleLock = async () => {
    try {
      await lockFolder(folder.id);
      if (onLocked) onLocked(folder.id);
      onClose();
    } catch (err) {
      console.error("Lỗi khóa thư mục:", err);
      alert("Khóa thư mục thất bại!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Khóa thư mục</h2>
        <p>Bạn có chắc muốn khóa thư mục "{folder.name}"?</p>
        <button onClick={handleLock}>Khóa</button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
}
