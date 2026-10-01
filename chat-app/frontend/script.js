import { Picker } from "https://cdn.jsdelivr.net/npm/emoji-mart@5.6.0/+esm";

const emojiBtn = document.getElementById("emoji-btn");
const pickerContainer = document.getElementById("picker-container");
const chatInput = document.getElementById("chat-input");
const messagesList = document.getElementById("messages-list");
const form = document.getElementById("message-form");

const input = document.getElementById("chat-input");
const usernameInput = document.getElementById("username-input");

const BACKEND_URL =
  "https://h1mxhiv9k4q0px4jq6tmtush.grads.hosting.cyf.academy";

// Fetch and display messages
async function loadMessages() {
  const response = await fetch(`${BACKEND_URL}/messages`);
  if (!response.ok) {
    throw new Error(`Failed to load messages: ${response.status}`);
  }
  const messages = await response.json();
  messagesList.innerHTML = "";

  messages.forEach((msg) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="message-header">
        <span class="username"><strong>${msg.username}</strong></span>
        <span class="timestamp">${msg.timeStamp}</span>
      </div>
      <div class="message-text">${msg.text}</div>
    `;
    messagesList.appendChild(li);
  });
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newMessage = {
    username: usernameInput.value,
    text: input.value,
    timeStamp: new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };

  try {
    const response = await fetch(`${BACKEND_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status}`);
    }

    input.value = "";
    usernameInput.value = "";
    await loadMessages();
  } catch (error) {
    console.error(error);
  }
});
const picker = new Picker({
  theme: "light", // Options: 'light', 'dark', 'auto'
  set: "native", // Uses system native emojis
  navPosition: "bottom", // Puts category tabs at bottom like WhatsApp mobile
  previewPosition: "none", // Hides the bulky bottom preview card for a cleaner look
  onEmojiSelect: (emoji) => {
    insertAtCursor(chatInput, emoji.native);
  },
});

// Append it inside our wrapper element
pickerContainer.appendChild(picker);

// 3. Toggle Picker Display
emojiBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevents instant closing from event bubbling
  pickerContainer.classList.toggle("picker-hidden");
});

// 4. Close picker when clicking anywhere outside (Essential UX)
document.addEventListener("click", (e) => {
  if (!pickerContainer.contains(e.target) && e.target !== emojiBtn) {
    pickerContainer.classList.add("picker-hidden");
  }
});

// 5. Smart Helper: Inserts emoji wherever the flashing text cursor is
function insertAtCursor(input, value) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const text = input.value;

  input.value = text.substring(0, start) + value + text.substring(end);

  // Reposition cursor right after the newly inserted emoji
  input.selectionStart = input.selectionEnd = start + value.length;
  input.focus();
}
// Refresh messages every 2 seconds
try {
  await loadMessages();
} catch (error) {
  console.error(error);
}
setInterval(() => {
  loadMessages().catch((error) => console.error(error));
}, 2000);
