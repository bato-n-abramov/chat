import React, { useEffect, useRef, useMemo } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import './styles.scss';

const MemoizedChatMessage = React.memo(ChatMessage);

const ProgressMessage = React.memo(({ messageInProgress }) => {
  if (!messageInProgress) return null;

  return (
    <ChatMessage
      message={{
        id: "BOT_MESSAGE_LOADING",
        content: messageInProgress,
        userId: "",
        type: "assistant",
        conversationId: "SOME_CONVERSATION_ID",
        createdAt: new Date(),
        updatedAt: new Date(),
      }}
    />
  );
});

function ChatMessageWindow({ messages, messageInProgress }) {
  const scrollToBottom = useRef(null);

  useEffect(() => {
    scrollToBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messageInProgress]);

  const memoizedMessages = useMemo(
    () => messages.map((message) => (
      <MemoizedChatMessage message={message} key={message.id} />
    )),
    [messages] 
  );

  return (
    <div className="ChatMessageWindow">
      {memoizedMessages}
      <ProgressMessage messageInProgress={messageInProgress} />
      <div ref={scrollToBottom} />
    </div>
  );
}

export default React.memo(ChatMessageWindow);
