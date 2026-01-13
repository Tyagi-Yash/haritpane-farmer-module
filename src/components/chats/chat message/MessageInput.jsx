import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "../../../config/config";
import { getSocket } from "../../../socket/socket";
import sendIcon from "../../../assets/images/send-icon.svg";
import attachIcon from "../../../assets/images/attach-icon.svg";

export default function MessageInput() {
  const { activeChat } = useSelector((s) => s.services.chatSlice);

  const [text, setText] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const onFileSelect = async (file) => {
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/saveImageToAwsFarmer", formData);
      setUploadedUrl(res.data.data[0]);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed");
      clearAttachment();
    } finally {
      setUploading(false);
    }
  };

  const clearAttachment = () => {
    setPreviewUrl("");
    setUploadedUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sendMessage = () => {
    if (!text.trim() && !uploadedUrl) return;
    if (uploading) return;

    const payload = {
      roomId: activeChat.roomId,
      senderId: activeChat.farmerId,
      message: text,
      msgType: uploadedUrl ? "image" : "text",
      senderType: "farmer",
      fileUrl: uploadedUrl || "",
    };

    getSocket().emit("sendMessage", payload);

    setText("");
    clearAttachment();
  };

  const fileInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-footer">
      {previewUrl && (
        <div className="attachment-preview">
          <img src={previewUrl} alt="preview" className="preview-img" />

          {uploading && <span className="uploading">Uploading...</span>}

          {!uploading && (
            <button className="remove" onClick={clearAttachment}>
              x
            </button>
          )}
        </div>
      )}

      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={uploading}
        />

        <button className="send" onClick={sendMessage} disabled={uploading}>
          <img src={sendIcon} alt="send" className="link-icon" />
        </button>

        <label>
          <img src={attachIcon} alt="attach" className="link-icon" />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => onFileSelect(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
}
