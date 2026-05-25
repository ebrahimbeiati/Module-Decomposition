const messagesList = document.getElementById("messages-list");
const form = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const usernameInput = document.getElementById("username-input");

const BACKEND_URL =
  "https://xwc7hmpmk5kvt9ktptcvuuke.hosting.codeyourfuture.io";

//Utility: sanitize input to prevent HTML injection
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Fetch and display messages
async function loadMessages() {
  try {
    const response = await fetch(`${BACKEND_URL}/messages`);
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const messages = await response.json();
    messagesList.innerHTML = "";

    messages.forEach((msg) => {
      const li = document.createElement("li");
      const header = document.createElement("div");
      header.className = "message-header";

      const usernameSpan = document.createElement("span");
      usernameSpan.className = "username";
      usernameSpan.textContent = msg.username;

      const timestamp = document.createElement("span");
      timestamp.className = "timestamp";
      timestamp.textContent = new Date(msg.timeStamp).toLocaleString();



      header.appendChild(usernameSpan);
      header.appendChild(timestamp);

      const textDiv = document.createElement("div");
      textDiv.className = "message-text";
      textDiv.textContent = msg.text;

      li.appendChild(header);
      li.appendChild(textDiv);
      messagesList.appendChild(li);
    });
    // Scroll to the bottom to show the latest message
    messagesList.scrollTop = messagesList.scrollHeight;
  } catch (error) {
    console.error("Error loading messages:", error);
    messagesList.innerHTML =
      "<li>Error loading messages. Please try again later.</li>";
  }
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const text = messageInput.value.trim();

  if (!username || !text) {
    alert("Please enter both a username and a message.");
    return;
  }
  const newMessage = { username, text };

  try {
    const response = await fetch(`${BACKEND_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    messageInput.value = "";
    usernameInput.value = "";
    loadMessages();
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send message. Please try again.");
  }
});
loadMessages();

// Refresh messages every 2 seconds
setInterval(loadMessages, 2000);
