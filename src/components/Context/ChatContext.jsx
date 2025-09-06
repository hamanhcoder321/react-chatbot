// src/components/ChatContext/ChatContext.jsx
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../apiConfig.js";
import { useAuth } from "../AuthContext/AuthContext.jsx";

// Tạo context cho Chat
const ChatContext = createContext();

// Provider để bao bọc toàn bộ app, cung cấp state & hàm chat
export const ChatProvider = ({ children }) => {
  // Lấy các state & hàm từ AuthContext
  const {
    user, // thông tin user hiện tại
    token, // token xác thực
    history, // lịch sử hội thoại
    setHistory, // cập nhật lịch sử
    messages, // tin nhắn đang hiển thị
    setMessages, // cập nhật tin nhắn
    conversationId, // id cuộc trò chuyện hiện tại
    setConversationId, // cập nhật conversationId
    loading, // trạng thái đang load từ AuthContext
  } = useAuth();

  // State lưu conversation được chọn
  const [selectedId, setSelectedId] = useState(() =>
    localStorage.getItem("conversation_id")
  );

  // gợi ý câu hỏi
  const onAskQuestion = (q) => {
    sendMessage(q);
  };

  // State lưu tin nhắn user nhập theo từng conversation
  const [userMessages, setUserMessages] = useState({});

  // State quản lý gợi ý ban đầu (chỉ hiện khi chưa dùng suggestion)
  const [showSuggestions, setShowSuggestions] = useState(
    !localStorage.getItem("usedSuggestions")
  );

  // State id của cuộc hội thoại đang gửi
  const [sendingConversationId, setSendingConversationId] = useState(null);

  // State chặn spam khi gửi tin
  const [isSending, setIsSending] = useState(false);

  // Hàm xử lý thay đổi input theo conversation
  const handleInputChange = (id, value) => {
    setUserMessages((prev) => ({ ...prev, [id]: value }));
  };

  // Hàm gửi tin nhắn
  const sendMessage = async (customMessage) => {
    let raw = customMessage ?? userMessages[selectedId] ?? "";

    // Ép kiểu an toàn (tránh lỗi nếu value không phải string)
    if (typeof raw !== "string") {
      console.warn("sendMessage nhận sai kiểu:", raw);
      raw = "";
    }

    const query = raw.trim();
    if (isSending || !query || loading) return; // chặn gửi nếu đang gửi hoặc rỗng

    // Reset input nếu không phải customMessage
    if (!customMessage) {
      setUserMessages((prev) => ({ ...prev, [selectedId]: "" }));
    }

    if (!user?.id) return;

    setIsSending(true);
    setSendingConversationId(selectedId || conversationId);

    // Hiện tin nhắn user ngay lập tức
    setMessages((prev) => [
      ...prev,
      { type: "user", content: query, sender: user?.name },
    ]);

    try {
      // Gửi request tới API
      const res = await axios.post(
        API_ENDPOINTS.SEND_MESSAGE,
        {
          user_id: user.id,
          user: user.name,
          content: query,
          conversation_id: conversationId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Nhận dữ liệu phản hồi từ API
      const { response, conversation_id } = res.data.data;

      // Nếu server trả conversation_id mới → cập nhật
      if (conversation_id && conversation_id !== conversationId) {
        setConversationId(conversation_id);
        setSendingConversationId(conversation_id);
        localStorage.setItem("conversation_id", conversation_id);
      }

      // Cập nhật selectedId
      setSelectedId(conversation_id || conversationId);

      // Thêm tin nhắn từ assistant vào messages
      setMessages((prev) => {
        const newMsgs = [...prev];
        if (newMsgs[newMsgs.length - 1]?.type === "assistant_typing")
          newMsgs.pop(); // xoá "typing" nếu có
        newMsgs.push({ type: "assistant", content: response });
        return newMsgs;
      });

      const usedId = conversation_id || conversationId;

      // Cập nhật lịch sử hội thoại
      setHistory((prev) => {
        const updated = [...prev];
        const newMsgs = [
          { type: "user", content: query, sender: user.name },
          { type: "assistant", content: response },
        ];
        const index = updated.findIndex(
          (item) => item.conversation_id === usedId
        );

        if (index !== -1) {
          // Nếu có sẵn conversation thì thêm tin nhắn mới
          const oldMessages = updated[index].messages
            ? [...updated[index].messages]
            : [];
          updated[index] = {
            ...updated[index],
            messages: [...oldMessages, ...newMsgs],
            time: new Date().toLocaleString(),
          };
        } else {
          // Nếu chưa có thì tạo conversation mới
          updated.unshift({
            time: new Date().toLocaleString(),
            user_id: user.id,
            user: user.name,
            question: query,
            answer: response,
            conversation_id: usedId,
            messages: [...newMsgs],
            paramHistories: { request: query },
          });
        }
        return updated;
      });
    } catch (err) {
      // Lỗi thì push tin nhắn lỗi vào chat
      console.error("Lỗi gửi tin:", err.response?.data || err.message);
      setMessages((prev) => [
        ...prev,
        { type: "assistant", content: "Lỗi hệ thống, thử lại sau." },
      ]);
    } finally {
      // Reset trạng thái gửi
      setIsSending(false);
      setSendingConversationId(null);
    }
  };

  // Hàm reset toàn bộ chat
  const resetChat = () => {
    setMessages([]);
    setUserMessages((prev) => {
      const copy = { ...prev };
      delete copy[selectedId];
      return copy;
    });
    setConversationId(null);
    setSelectedId(null);
    localStorage.removeItem("conversation_id");
    localStorage.removeItem("usedSuggestions");
    setShowSuggestions(true);
  };

  return (
    <ChatContext.Provider
      value={{
        setMessages,
        setHistory,
        history,
        selectedId,
        setSelectedId,
        userMessages,
        handleInputChange,
        sendMessage,
        onAskQuestion,
        messages,
        isSending,
        sendingConversationId,
        resetChat,
        showSuggestions,
        setShowSuggestions,
        setConversationId,
        setUserMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook tiện lợi để gọi context
export const useChat = () => useContext(ChatContext);
