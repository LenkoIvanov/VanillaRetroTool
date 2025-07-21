const serverUrl = 'ws://localhost:8080';

export const openSocket = (onIncomingMessage) => {
  const socket = new WebSocket(serverUrl);
  socket.addEventListener('open', openConnection);
  socket.addEventListener('close', closeConnection);
  socket.addEventListener('message', onIncomingMessage);
  socket.addEventListener('error', (err) => {
    console.error('WebSocket error:', err);
  });

  return socket;
};

const openConnection = () => {
  console.log('Connected to WebSocket server');
};

const closeConnection = () => {
  console.log('Disconnected from WebSocket server');

  setTimeout(() => {
    console.log('Reconnecting...');
    openSocket(serverUrl);
  }, 5000);
};
