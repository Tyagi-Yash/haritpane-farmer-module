export default function MessageBubble({ msg }) {
  const isMine = msg.senderType === "farmer";

  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toLocaleTimeString();
  };

  return (
    <div className={`msg ${isMine ? "from" : "to"}`}>
      {msg.msgType === "image" && msg.fileUrl && (
        <img
          src={msg.fileUrl}
          className="chat-img"
          onLoad={() => {
            document.querySelector(".chat-body")?.scrollTo({
              top: document.querySelector(".chat-body").scrollHeight,
              behavior: "smooth",
            });
          }}
        />
      )}

      {msg.message && <div>{msg.message}</div>}

      <div className="send-info">
        <small>{formatTime(msg.createdAt)}</small>
      </div>
    </div>
  );
}
