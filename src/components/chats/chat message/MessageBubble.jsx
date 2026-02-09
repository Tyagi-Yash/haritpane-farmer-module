import { formatDateTo12Hour } from "../../../utils/formatTime12Hour";

export default function MessageBubble({ msg }) {
  const isMine = msg.senderType === "farmer";

  return (
    <div className={`msg ${isMine ? "from" : "to"}`}>
      <div>{msg.message}</div>
      <div className="send-info">
        <small>{formatDateTo12Hour(msg.createdAt)}</small>
      </div>
    </div>
  );
}
