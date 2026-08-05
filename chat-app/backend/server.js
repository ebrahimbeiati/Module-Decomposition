import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
<<<<<<< HEAD

app.use(express.json());
app.use(cors());

const messages = [];
=======
app.use(express.json());
app.use(cors());
let messages = [];
>>>>>>> sprint3-middleware

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
<<<<<<< HEAD
  const { username, text } = req.body;
  const message = { username, text, timeStamp: new Date().toISOString() };
=======
  const message = req.body;
>>>>>>> sprint3-middleware
  messages.push(message);
  res.status(201).json(message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
