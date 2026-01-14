function MessageSkeleton({ align = "left" }) {
  return (
    <div
      className={`msg-skeleton ${align === "right" ? "from" : "to"}`}
      style={{
        height: "50px",
        width: Math.random() * 120 + 60,
        background: "#7c7c7c",
        borderRadius: 6,
      }}
    >
      <div> </div>
      <div className="send-info">
        <small> </small>
      </div>
    </div>
  );
}

export default MessageSkeleton;
