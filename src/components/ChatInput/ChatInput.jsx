import React, { useRef, useState } from "react";
import Textarea from "../ui/Textarea/Textarea";
import Button from "../ui/Button/Button";
import Switcher from "../ui/Switcher/Switcher";
import * as Separator from '@radix-ui/react-separator';
import Send from "../ui/Icons/Send";
import Attach from "../ui/Icons/Attach";
import Close from "../ui/Icons/Close";
import "./styles.scss";

export default function ChatInput({
  disabledTextArea = false,
  disabledSendMessage = false,
  onSendMessage,
  onAttachImage,
}) {
  const [userPrompt, setUserPrompt] = useState("");
  const [websearch, setWebsearch] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);

  async function sendMessage(event) {
    event.preventDefault();
    if (!userPrompt && attachedFiles.length === 0) {
      return;
    }

    if (onSendMessage) {
      onSendMessage(userPrompt, attachedFiles);
    }
    setUserPrompt("");
    setAttachedFiles([]);
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

  function handleAttachClick() {
    fileInputRef.current.click(); 
  }

  function handleFileChange(event) {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      
      setAttachedFiles((prevFiles) => [...prevFiles, ...files]);
      if (onAttachImage) {
        onAttachImage(files);
      }
    }
  }

  function handleRemoveFile(index) {
    setAttachedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }

  const isSendButtonDisabled = !userPrompt && attachedFiles.length === 0 || disabledSendMessage;


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
        </div>
        <Separator.Root
          className="SeparatorRoot"
          decorative
          orientation="vertical"
          style={{ margin: '0 15px' }}
        />
        <form onSubmit={sendMessage} className="chatInput-form">
          <Textarea
            className="chatInput-textarea"
            placeholder="Enter your request"
            value={userPrompt}
            onKeyDown={handleKeydown}
            disabled={disabledTextArea}
            onChange={(e) => {
              setUserPrompt(e.target.value);
            }}
          />
          <Button type="button" className="chatInput-attach btn-transparent" onClick={handleAttachClick}>
              <Attach />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            multiple 
          />
          <div className="chatInput-files">
            {attachedFiles.map((file, index) => (
              <div key={index} className="chatInput-file">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Attached file ${index + 1}`}
                  className="chatInput-file-preview"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="chatInput-file-remove"
                  onClick={() => handleRemoveFile(index)}
                >
                  <Close />
                </Button>
              </div>
            ))}
          </div>
            <Button
              type="submit"
              className="chatInput-send"
              disabled={isSendButtonDisabled}
            >
              <Send />
            </Button>
        </form>
      </div>
    </div>
  );
}
