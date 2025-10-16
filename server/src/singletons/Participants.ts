export class Participant {
  participantId: string;
  name: string;

  constructor(participantId: string, name: string) {
    this.participantId = participantId;
    this.name = name;
  }
}

class ParticipantsStorage {
  participants: Participant[];

  constructor() {
    this.participants = [];
  }

  getParticipants() {
    return this.participants;
  }

  addNewParticipant(participant: Participant) {
    const participantsCopy = this.getParticipants();
    participantsCopy.push(participant);
    this.participants = participantsCopy;
  }
}

export const participantsStorageSingleton = new ParticipantsStorage();
