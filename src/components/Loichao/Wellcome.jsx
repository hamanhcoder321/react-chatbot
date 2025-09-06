import "./Wellcome.css";
import { useState, useEffect } from "react";

const Wellcome = () => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    // Bắt đầu gõ dòng đầu tiên
    setShowFirst(true);

    // Sau khi dòng 1 gõ xong thì gõ dòng 2
    const timer = setTimeout(() => {
      setShowSecond(true);
    }, 3500); // 3.5s = thời gian đủ để dòng đầu xong

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-gap-3">
      {/* Dòng 1 */}
      {showFirst && (
        <h3 className="tw-text-black tw-font-bold tw-text-xl typewriter">
          Chào mừng đến với Chatbot hỗ trợ sinh viên!
        </h3>
      )}

      {/* Dòng 2 */}
      {showSecond && (
        <p className="tw-text-black tw-font-semibold tw-text-base typewriter">
          Hãy nhập câu hỏi của bạn về chuyên ngành, môn học... để được hỗ trợ thêm.
        </p>
      )}
    </div>
  );
};

export default Wellcome;
