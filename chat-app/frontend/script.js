const messagesList = document.getElementById("messages-list");
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");

const BACKEND_URL = "http://127.0.0.1:3000";

// Fetch and display messages
async function loadMessages() {
  const response = await fetch(`${BACKEND_URL}/messages`);
  const messages = await response.json();
  messagesList.innerHTML = "";
  messages.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = `${msg.username}: ${msg.text}`;
    messagesList.appendChild(li);
  });
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newMessage = {
    username: "User",
    text: input.value,
  };

  await fetch(`${BACKEND_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  });

  input.value = "";
  loadMessages();
});
