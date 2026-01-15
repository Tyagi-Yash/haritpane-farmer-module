export default function MessageBubble({ msg }) {
  const isMine = msg.senderType === "farmer";

  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div className={`msg ${isMine ? "from" : "to"}`}>
      <div>{msg.message}</div>
      <div className="send-info">
        <small>{formatTime(msg.createdAt)}</small>
      </div>
    </div>
  );
}
