import "./LoadingOverlay.css";
function LoadingOverlay({ message = "Đang xử lý..." }) {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default LoadingOverlay;