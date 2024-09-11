import React, {useState, useEffect } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Highlight from 'react-highlight';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as Dialog from '@radix-ui/react-dialog';
import AssistantAvatar from "../ui/Icons/AssistantAvatar";
import Edit from "../ui/Icons/Edit";
import Button from '../ui/Button/Button';
import Video from "../ui/Video/Video";
import Download from "../ui/Icons/Download";
import Like from "../ui/Icons/Like";
import Dislike from "../ui/Icons/Dislike";
import Close from "../ui/Icons/Close";

import './styles.scss';


function ChatMessage({ message }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  }
  
  const handleDislike = () => {
    setDislike(!dislike);
  }

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

  return (
    <div className="chat-message-wrappper">
      {message.type === 'assistant' ? (
        <div>
               <div className="chat-message-avatar">
                  <AssistantAvatar />
              </div>
              <div className=' chat-message chat-message-assistant'>
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
                          const language = match ? match[1] : '';
        
                          function copyToClipboard() {
                            navigator.clipboard.writeText(String(children));
                          }
        
                          return (
                            <div className="code-wrapper">
                               {language && (
                                <div className='code-header'>
                                    <div className="code-lang">
                                      {language}
                                    </div>
                                    <Button
                                      variant="outline btn-primary"
                                      size="icon"
                                      className="code-copy"
                                      onClick={copyToClipboard}
                                    >
                                      Copy Code
                                    </Button>
                                  </div>
                                )}

                              <Highlight
                                language={language}
                                style={oneDark}
                                PreTag="div"
                                className="my-0"
                              >
                                {String(children).replace(/\n$/, '')}
                              </Highlight>
                            </div>
                          );
                        },
                        a({ href, children }) {
                          const videoLink = href?.match(/\.(mp4|webm|ogg)$/i)?.input;
                          if (videoLink) {
                            return (
                              <div className="my-4">
                                <Video href = {href} />
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
                                        <a href={href} className="assistant-image-download" download><Download /></a>
                                        <img src={href} alt="Attachment" />
                                      </div>
                                    </Dialog.Trigger>
                                      <Dialog.Portal>
                                        <Dialog.Overlay  className="DialogOverlay" />
                                        <Dialog.Close asChild>
                                              <button className="dialog-close" aria-label="Close">
                                              <Close />
                                              </button>
                                          </Dialog.Close>
                                        <Dialog.Content className="DialogContent">
                                          <div className="assistant-image">
                                            <a href={href} className="assistant-image-download" download><Download /></a>
                                            <img src={href} alt="Attachment" />
                                          </div>
                                          
                                        </Dialog.Content>
                                    </Dialog.Portal>
                                  </Dialog.Root>
                                  <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                      <div className="assistant-image">
                                        <a href={href} className="assistant-image-download" download><Download /></a>
                                        <img src={href} alt="Attachment" />
                                      </div>
                                    </Dialog.Trigger>
                                      <Dialog.Portal>
                                        <Dialog.Overlay  className="DialogOverlay"  />
                                          <Dialog.Close asChild>
                                              <button className="dialog-close" aria-label="Close">
                                                <Close />
                                              </button>
                                          </Dialog.Close>
                                          <Dialog.Content className="DialogContent">
                                            <div className="assistant-image">
                                              <a href={href} className="assistant-image-download" download><Download /></a>
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
                  <div className="chat-message-assistant-buttons">
                        <div className="chat-message-assistant-btn chat-message-assistant-copy">Copy</div>
                        <div className="chat-message-assistant-btn chat-message-assistant-regenerate">Regenerate response</div>
                        <div className="chat-message-assistant-btn chat-message-assistant-reactions">
                          <Button onClick={handleLike} className={like ? 'active' : ''}>
                            <Like />
                          </Button>
                         <Button onClick={handleDislike} className={dislike ? 'active' : ''}>
                            <Dislike  />
                         </Button>
                        </div>
                  </div>
              </div>
        </div>
      ) : <div className="chat-message-user">
              {message.content}
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
         <div className="chat-message-user-edit"><Edit /></div></div>}

      </div>
  );
}

export default ChatMessage;
