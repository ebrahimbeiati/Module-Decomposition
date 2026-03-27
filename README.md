# [Chat App](https://uretqju43s9008b1nyjk586m.hosting.codeyourfuture.io)

A full-stack chat application built with:

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express

Users can send messages, see existing messages, and view updates from others.

## Features

- Send a message with username and text
- Fetch and display all chat messages
- Auto-refresh messages every 2 seconds
- Timestamp shown on each message

## Project Structure

```text
chat-app/
	backend/
		package.json
		server.js
	frontend/
		index.html
		script.js
		styles.css
```

## Run Locally

### 1. Start the backend

From the backend folder, install dependencies and run the server:

```bash
cd chat-app/backend
npm install
node server.js
```

Backend runs on http://localhost:3000

### 2. Start the frontend

Open chat-app/frontend/index.html in your browser.

If you want to use local backend instead of deployed backend, set BACKEND_URL in script.js to:

http://127.0.0.1:3000

## API

- GET /messages: returns all messages
- POST /messages: adds a new message

Example message object:

```json
{
  "username": "Alex",
  "text": "Hello everyone",
  "timeStamp": "3:45 PM"
}
```

## Learning Goals

- Build a frontend and backend that communicate using HTTP
- Practice working with JSON data
- Understand simple full-stack deployment flow
