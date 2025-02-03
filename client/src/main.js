const serverUrl = 'ws://localhost:8080';

let socket;
let statusDiv;
let text;
let topic;
let creatorId;
let sendBtn;
let messagesList;
const setup = () => {
  statusDiv = document.getElementById('status');
  text = document.getElementById('text');
  creatorId = document.getElementById('creatorId');
  topic = document.getElementById('topic');
  sendBtn = document.getElementById('sendBtn');
  messagesList = document.getElementById('messages');

  sendBtn.addEventListener('click', sendMessage);
  openSocket(serverUrl);
};

const openSocket = (url) => {
  socket = new WebSocket(url);
  socket.addEventListener('open', openConnection);
  socket.addEventListener('close', closeConnection);
  socket.addEventListener('message', readIncomingMessage);
  socket.addEventListener('error', (err) => {
    console.error('WebSocket error:', err);
    statusDiv.textContent = '🔴 Error connecting to WebSocket';
  });
};

const openConnection = () => {
  console.log('Connected to WebSocket server');
  statusDiv.textContent = '🟢 Connected';
};

const closeConnection = () => {
  console.log('Disconnected from WebSocket server');
  statusDiv.textContent = '🔴 Disconnected. Reconnecting...';

  setTimeout(() => {
    console.log('Reconnecting...');
    openSocket(serverUrl);
  }, 3000); // Retry after 3 seconds
};

const readIncomingMessage = (e) => {
  const li = document.createElement('li');
  li.textContent = `🔹 Server: ${e.data}`;
  messagesList.appendChild(li);
};

const sendMessage = () => {
  let creator = creatorId.value;
  let topicVal = topic.value;
  let retroNote = text.value;

  if (
    creator.trim() !== '' &&
    topicVal.trim() !== '' &&
    retroNote.trim() !== ''
  ) {
    socket.send(
      JSON.stringify({
        creatorId: creator,
        topic: topicVal,
        text: retroNote,
      }),
    );

    const li = document.createElement('li');
    li.textContent = `🟡 You: I'am ${creator}. Regarding topic "${topicVal}" I think that ${retroNote}`;
    retroNote = ''; // Clear input field
    topicVal = '';
    creator = '';
    messagesList.appendChild(li);
  }
};

const inputMessage = (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
};

// add a listener for the page to load:
window.addEventListener('load', setup);

// close connection when the page unloads or refreshes
window.addEventListener('beforeunload', () => {
  if (socket) {
    socket.close();
  }
});
