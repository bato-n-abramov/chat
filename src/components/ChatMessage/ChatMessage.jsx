import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from '../ui/Button/Button';
import './styles.scss';

function ChatMessage({ message }) {
  const className = `chat-message ${message.type === 'assistant' ? 'chat-message-assistant' : 'chat-message-user'}`;

  return (
    <div className="chat-message-wrappper">
       {message.type === 'assistant' ? (
        <div className='chat-message-image'></div>
       ) : ''}
      <div className={className}>
        {message.type === 'assistant' ? (
          <>
            <Markdown
              remarkPlugins={[remarkGfm]}
              className = "chat-message-markdown"
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : 'markdown';

                  function copyToClipboard() {
                    navigator.clipboard.writeText(String(children));
                  }

                  return (
                    <div className="code-wrapper">
                      <div className="code-lang">
                        {language}
                      </div>
                      <SyntaxHighlighter
                        language={language}
                        style={oneDark}
                        PreTag="div"
                        className="my-0"
                        customStyle={{
                          margin: 0,
                          borderRadius: '0 0 0.3em 0.3em',
                        }}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                      <Button
                        variant="outline"
                        size="icon"
                        className=""
                        onClick={copyToClipboard}
                      >
                      </Button>
                    </div>
                  );
                },
                a({ href, children }) {
                  const videoLink = href?.match(/\.(mp4|webm|ogg)$/i)?.input;
                  if (videoLink) {
                    return (
                      <div className="my-4">
                        <video controls width="100%">
                          <source src={href} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    );
                  }
                  return <a href={href}>{children}</a>;
                },
              }}
            >
              {message.content}
            </Markdown>
          </>
        ) : (
          message.content
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
