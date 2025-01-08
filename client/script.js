const serverUrl = "ws://localhost:8080";

let socket;
let statusDiv;
let messageInput;
let sendBtn;
let messagesList;
let messageOutput;
const setup = () => {
  statusDiv = document.getElementById("status");
  messageInput = document.getElementById("messageInput");
  sendBtn = document.getElementById("sendBtn");
  messagesList = document.getElementById("messages");

  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", inputMessage);

  openSocket(serverUrl);
};

const openSocket = (url) => {
  socket = new WebSocket(url);
  socket.addEventListener("open", openConnection);
  socket.addEventListener("close", closeConnection);
  socket.addEventListener("message", readIncomingMessage);
};

const openConnection = () => {
  console.log("Connected to WebSocket server");
  statusDiv.textContent = "🟢 Connected";
};

const closeConnection = () => {
  console.log("Disconnected from WebSocket server");
  statusDiv.textContent = "🔴 Disconnected";
};

const readIncomingMessage = (e) => {
  const li = document.createElement("li");
  li.textContent = `🔹 ${e.data}`;
  messagesList.appendChild(li);
};

const sendMessage = () => {
  const message = messageInput.value;
  if (message.trim() !== "") {
    ws.send(message);
    messageInput.value = ""; // Clear input field

    const li = document.createElement("li");
    li.textContent = `🟡 You: ${message}`;
    messagesList.appendChild(li);
  }
};

const inputMessage = (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
};

// add a listener for the page to load:
window.addEventListener("load", setup);
