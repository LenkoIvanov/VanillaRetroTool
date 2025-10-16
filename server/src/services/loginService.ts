import { v4 as uuidv4 } from 'uuid';
import { Participant, participantsStorageSingleton } from '../singletons/Participants.js';

class LoginService {
  loginParticipant(name: string) {
    const participantId = uuidv4();
    const newParticipant = new Participant(participantId, name);
    participantsStorageSingleton.addNewParticipant(newParticipant);
  }

  getAllParticipants() {
    return {
      participants: participantsStorageSingleton.getParticipants(),
    };
  }
}

export const loginService = new LoginService();
