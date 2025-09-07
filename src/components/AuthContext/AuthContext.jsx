// src/components/AuthContext/AuthContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom"; // Hook để điều hướng trang
import axios from "axios"; // Dùng để gọi API
import { jwtDecode } from "jwt-decode"; // Giải mã token JWT
import { API_ENDPOINTS } from "../../apiConfig"; // Chứa các endpoint API

// Tạo context để chia sẻ state Auth trong toàn bộ app
const AuthContext = createContext();

// Provider bao bọc toàn bộ app để cung cấp state cho các component con
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Các state quản lý thông tin user, token, lịch sử hội thoại, tin nhắn, ...
  const [user, setUser] = useState(null); // Lưu thông tin user hiện tại
  const [token, setToken] = useState(localStorage.getItem("token")); // Lưu token (lấy từ localStorage nếu có)
  const [history, setHistory] = useState([]); // Lưu lịch sử hội thoại (các conversation)
  const [messages, setMessages] = useState([]); // Lưu tin nhắn trong 1 conversation
  const [conversationId, setConversationId] = useState(null); // ID của conversation đang active
  const [loading, setLoading] = useState(true); // Đang check auth hay không

  // Hàm logout → xóa token, reset state và chuyển hướng về trang login
  const logout = useCallback(() => {
    localStorage.removeItem("token"); // Xóa token trong localStorage
    setToken(null); // Reset token
    setUser(null); // Reset user
    navigate("/login"); // Điều hướng về trang login
  }, [navigate]);

  // Hàm login → lưu token mới, gọi API lấy thông tin user
  // AuthContext.jsx
  const login = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    // Reset các state cũ
    setHistory([]);
    setMessages([]);
    setConversationId(null);

    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

    try {
      const res = await axios.post(API_ENDPOINTS.ME);
      setUser(res.data);
      return res.data; // TRẢ VỀ user để Login.jsx nhận được
    } catch (err) {
      console.error("Login fetch ME error:", err);
      logout();
      throw err; // nhớ throw để bên ngoài còn bắt được
    }
  };

  // useEffect → chạy khi app load hoặc khi token thay đổi
  useEffect(() => {
    const initAuth = async () => {
      // Nếu không có token thì set loading = false luôn
      if (!token) return setLoading(false);

      try {
        // Giải mã token để check hạn
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
          // Nếu token hết hạn → logout
          setLoading(false);
          return logout();
        }

        // Nếu token hợp lệ thì set vào axios header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Gọi API song song:
        // - user info
        // - danh sách hội thoại gần đây
        const [userRes, historyRes] = await Promise.all([
          axios.post(API_ENDPOINTS.ME),
          axios.get(API_ENDPOINTS.RECENT_CONVERSATIONS),
        ]);

        // Lưu user vào state
        setUser(userRes.data);

        // Map lại dữ liệu từ API để đồng bộ với UI
        const mappedHistory = (historyRes.data.data || []).map((conv) => ({
          user_id: conv.user_id,
          conversation_id: conv.conversation_id,
          time: conv.messages[0]?.created_at, // thời gian tin nhắn đầu
          user: conv.messages[0]?.user, // user gửi
          question: conv.messages[0]?.content, // câu hỏi đầu
          answer: conv.messages[0]?.response, // câu trả lời đầu
          messages: conv.messages.flatMap((msg) => [
            { type: "user", content: msg.content, sender: msg.user },
            { type: "assistant", content: msg.response },
          ]),
          paramHistories: { request: conv.messages[0]?.content },
        }));

        setHistory(mappedHistory);

        // Lấy conversation_id đang lưu trong localStorage
        const storedId = localStorage.getItem("conversation_id");

        // Kiểm tra xem nó có tồn tại trong history không
        const existing = mappedHistory.find(
          (item) => item.conversation_id === storedId
        );

        if (existing) {
          // Nếu có thì set lại conversation hiện tại + tin nhắn
          setConversationId(existing.conversation_id);
          setMessages(existing.messages);
        }
      } catch (err) {
        console.error("Auth init error:", err);
        logout(); // Nếu lỗi thì logout
      } finally {
        // Dù thành công hay thất bại cũng tắt trạng thái loading
        setLoading(false);
      }
    };

    initAuth();
  }, [token, logout]);

  // Trả state và hàm ra context để component con dùng được
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        history,
        setHistory,
        messages,
        setMessages,
        conversationId,
        setConversationId,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để dùng nhanh AuthContext trong các component khác
export const useAuth = () => useContext(AuthContext);
