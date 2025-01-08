const ws = new WebSocket(`ws://${window.location.host}/ws`);

const statusDiv = document.getElementById("status");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesList = document.getElementById("messages");

// Connection opened
ws.onopen = () => {
    console.log("Connected to WebSocket server");
    statusDiv.textContent = "🟢 Connected";
};

// Handle incoming messages
ws.onmessage = (event) => {
    const li = document.createElement("li");
    li.textContent = `🔹 ${event.data}`;
    messagesList.appendChild(li);
};

// Handle connection close
ws.onclose = () => {
    console.log("Disconnected from WebSocket server");
    statusDiv.textContent = "🔴 Disconnected";
};

// Send a message when clicking the button
sendBtn.addEventListener("click", () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
        ws.send(message);
        messageInput.value = ""; // Clear input field

        const li = document.createElement("li");
        li.textContent = `🟡 You: ${message}`;
        messagesList.appendChild(li);
    }
});

// Send message on Enter key press
messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendBtn.click();
    }
});
