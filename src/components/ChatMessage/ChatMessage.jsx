import React, {useState, useEffect } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as Dialog from '@radix-ui/react-dialog';

import Button from '../ui/Button/Button';
import './styles.scss';

function ChatMessage({ message }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (message.images) {
      const urls = message.images.map((img) => {
        if (img instanceof File) {
          return URL.createObjectURL(img);
        }
        return img; 
      });

      setImageUrls(urls);

  
      return () => {
        urls.forEach((url) => {
          if (typeof url === 'string' && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        });
      };
    }
  }, [message.images]);

  const className = `chat-message ${message.type === 'assistant' ? 'chat-message-assistant' : 'chat-message-user'}`;
  return (
    <div className="chat-message-wrappper">
      {message.type === 'assistant' ? (
        <div className="chat-message-avatar"></div>
      ) : ''}
      <div className={className}>
      {imageUrls.length > 0 && (
          <div className="chat-message-images">
            {imageUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Attachment ${index + 1}`}
                className="chat-message-image"
              />
            ))}
          </div>
        )}
        {message.content && (
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="chat-message-markdown"
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : 'markdown';

                function copyToClipboard() {
                  navigator.clipboard.writeText(String(children));
                }

                return (
                  <div className="code-wrapper">
                    <div className='code-header'>
                      <div className="code-lang">
                        {language}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className=""
                        onClick={copyToClipboard}
                      >
                        Copy Code
                      </Button>
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
                const imageLink = href?.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i)?.input;
                if (imageLink) {
                  return (
                    <div className="assistant-images">
                      <p>"Here is an example image:"</p>
                      <div className="assistant-images-wrapper">
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <div className="assistant-image">
                              <a href={href} className="assistant-image-download" download>Dowload</a>
                              <img src={href} alt="Attachment" />
                            </div>
                          </Dialog.Trigger>
                            <Dialog.Portal>
                               
                              <Dialog.Overlay  className="DialogOverlay" />
                              <Dialog.Close asChild>
                                    <button className="dialog-close" aria-label="Close">
                                      x
                                    </button>
                                </Dialog.Close>
                              <Dialog.Content className="DialogContent">
                                <div className="assistant-image">
                                  <a href={href} className="assistant-image-download" download>Dowload</a>
                                  <img src={href} alt="Attachment" />
                                </div>
                                
                              </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog.Root>
                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <div className="assistant-image">
                              <a href={href} className="assistant-image-download" download>Dowload</a>
                              <img src={href} alt="Attachment" />
                            </div>
                          </Dialog.Trigger>
                            <Dialog.Portal>
                              <Dialog.Overlay  className="DialogOverlay"  />
                                <Dialog.Close asChild>
                                    <button className="dialog-close" aria-label="Close">
                                      x
                                    </button>
                                </Dialog.Close>
                                <Dialog.Content className="DialogContent">
                                  <div className="assistant-image">
                                    <a href={href} className="assistant-image-download" download>Dowload</a>
                                    <img src={href} alt="Attachment" />
                                  </div>
                                  
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                        

                      </div>
                    </div>
                  );
                }
                
                return <a href={href}>{children}</a>;
              },
            }}
          >
            {message.content}
          </Markdown>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
