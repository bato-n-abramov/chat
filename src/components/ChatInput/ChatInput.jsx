import React, { useRef, useState } from "react";
import Textarea from "../ui/Textarea/Textarea";
import Button from "../ui/Button/Button";
import Switcher from "../ui/Switcher/Switcher";
import * as Separator from '@radix-ui/react-separator';
import "./styles.scss";

export default function ChatInput({
  disabledTextArea = false,
  disabledSendMessage = false,
  stopMessageGeneration = () => {},
  onSendMessage,
}) {
  const [userPrompt, setUserPrompt] = useState("");
  const [websearch, setWebsearch] = useState(false);
  const textareaRef = useRef(null);

  async function sendMessage(event) {
    event.preventDefault();
    if (!userPrompt) {
      return;
    }
    onSendMessage(userPrompt);
    setUserPrompt("");
  }

  function handleKeydown(event) {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        event.preventDefault();
        const textarea = event.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value =
          textarea.value.substring(0, start) +
          "\n" +
          textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      } else {
        event.preventDefault();
        sendMessage(event);
      }
    }
  }

  return (
    <div className="chatInput">
      <div className="chatInput-wrapper">
        <div className="chatInput-web">
          <span>Search web</span>
          <Switcher
            disabled={disabledTextArea}
            checked={websearch}
            onCheckedChange={() => setWebsearch((value) => !value)}
          />
          {disabledTextArea && (
            <button onClick={stopMessageGeneration} className=""></button>
          )}
        </div>
        <Separator.Root
          className="SeparatorRoot"
          decorative
          orientation="vertical"
          style={{ margin: '0 15px' }}
        />
        <form onSubmit={sendMessage} className="chatInput-form">
          <Textarea
            ref={textareaRef}
            className="chatInput-textarea"
            placeholder="Enter your request"
            value={userPrompt}
            onKeyDown={handleKeydown}
            disabled={disabledTextArea}
            onChange={(e) => {
              setUserPrompt(e.target.value);
            }}
          />
          <div className="chatInput-btn">
            <Button
              type="submit"
              disabled={!userPrompt || disabledSendMessage}
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
