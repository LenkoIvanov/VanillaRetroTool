import {
  emptyAllNoteSections,
  createNewNote,
  appendCreatedNote,
} from './domFunctions';

const serverUrl = 'ws://localhost:8080';

export const openSocket = () => {
  const socket = new WebSocket(serverUrl);
  socket.addEventListener('open', openConnection);
  socket.addEventListener('close', closeConnection);
  socket.addEventListener('message', handleBroadcastReceive);
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

const handleBroadcastReceive = (ev) => {
  console.log('Broadcast received:', ev);
  const parsedData = JSON.parse(structuredClone(ev.data));
  console.log(parsedData);
  if (typeof parsedData.notes !== 'undefined') {
    emptyAllNoteSections();
    parsedData.notes.forEach((note) => {
      const domNote = createNewNote(
        note.creatorId,
        note.noteId,
        note.topic,
        note.text,
      );
      appendCreatedNote(domNote, note.topic);
    });
  } else if (parsedData.participants) {
    const newParticipant =
      parsedData.participants[parsedData.participants.length - 1];
    const userNameList = parsedData.participants.map((user) => user.name);
    localStorage.setItem('userList', JSON.stringify(userNameList));
    localStorage.setItem('user', JSON.stringify(newParticipant));
    window.location.reload();
  } else if (parsedData.participantId) {
    localStorage.removeItem('user');
    window.location.reload();
  }
};

export const socketInstance = openSocket();
