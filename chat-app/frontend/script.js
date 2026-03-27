const messagesList = document.getElementById("messages-list");
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const usernameInput = document.getElementById("username-input");

const BACKEND_URL = "http://127.0.0.1:3000";

// Fetch and display messages
async function loadMessages() {
  const response = await fetch(`${BACKEND_URL}/messages`);
  const messages = await response.json();
  messagesList.innerHTML = "";
  messages.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = `${msg.username} (${msg.timeStamp}): ${msg.text}`;
    messagesList.appendChild(li);
  });
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newMessage = {
    username: usernameInput.value,
    text: input.value,
    timeStamp: new Date().toLocaleTimeString(),
  };

  await fetch(`${BACKEND_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  });

  input.value = "";
  usernameInput.value = "";
  loadMessages();
});

// Refresh messages every 2 seconds
setInterval(loadMessages, 2000);
