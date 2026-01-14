import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";
import sendIcon from "../../../assets/images/send-icon.svg";

export default function MessageInput() {
  const { activeChat } = useSelector((s) => s.services.chatSlice);

  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
  }, [activeChat]);

  const sendMessage = () => {
    if (!text.trim()) return;
    if (!activeChat) return;

    const payload = {
      roomId: activeChat.roomId,
      senderId: activeChat.farmerId,
      message: text,
      msgType: "text",
      senderType: "farmer",
      fileUrl: "",
    };

    getSocket()?.emit("sendMessage", payload);

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-footer">
      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />

        <button className="send" onClick={sendMessage}>
          <img src={sendIcon} alt="send" className="link-icon" />
        </button>
      </div>
    </div>
  );
}
