import MessageSkeleton from "./MessageSkeleton";

function ChatMessageSkeleton() {
  return (
    <>
      <MessageSkeleton align="left" />
      <MessageSkeleton align="left" />
      <MessageSkeleton align="right" />
      <MessageSkeleton align="left" />
      <MessageSkeleton align="right" />
      <MessageSkeleton align="right" />
    </>
  );
}

export default ChatMessageSkeleton;
