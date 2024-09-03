# Sample Markdown Content

## Heading Level 2

This is a paragraph with **bold text** and *italic text*. 

Here is a list of items:
- Item 1
- Item 2
- Item 3

### Heading Level 3

You can also include [links](https://www.example.com) to external sites.

#### Code Example

Here is a code snippet in JavaScript:

```javascript
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

greet('World');



### Using the Markdown Content in Your Application

1. **Read the Markdown File:**

   If you're working in a React application, you might need to import this Markdown content or fetch it if it's hosted externally.

   **Importing Markdown File Directly (using `import`):**

   If your build setup supports importing Markdown files (e.g., with `raw-loader` in Webpack), you can import it directly:

   ```jsx
   import sampleMarkdown from './path/to/sample-content.md';



3. **Render the Markdown Content:**

Use the `ChatMessage` component to render the content as before:

```jsx
<ChatMessage
  message={{
    id: 'sample-content',
    content: responses.sampleContent[0],
    type: 'assistant',
    userId: '',
    conversationId: 'SOME_CONVERSATION_ID',
    createdAt: new Date(),
    updatedAt: new Date(),
  }}
/>
