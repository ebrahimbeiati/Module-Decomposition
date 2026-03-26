const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let messages = [];

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const message = req.body;
  messages.push(message);
  res.status(201).json(message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
