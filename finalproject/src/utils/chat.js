import {
  getFirebaseDocument,
  updateFirebaseDocument,
  getFirebaseDatabaseRef,
  getFirebaseServerTimestamp,
} from './firebase';

export default class Chat {
  constructor(senderUserUid, targetUserUid) {
    this.sender = senderUserUid;
    this.target = targetUserUid;
    this.chatRoomId = '';
  }

  loadChatRoomFromDB() {
    return getFirebaseDocument('users', this.sender).then((data) => {
      if (data.chatRooms[this.target]) {
        return data.chatRooms[this.target];
      }
      return null;
    });
  }

  openChatRoom() {
    return this.loadChatRoomFromDB().then((roomId) => {
      if (!roomId) {
        this.chatRoomId = `@room-${this.sender}-${this.target}`;
        return Promise.all([
          updateFirebaseDocument('users', this.sender, {
            [`chatRooms.${this.target}`]: this.chatRoomId,
          }),
          updateFirebaseDocument('users', this.target, {
            [`chatRooms.${this.sender}`]: this.chatRoomId,
          }),
        ]).then(() => Promise.resolve(this.chatRoomId));
      }

      this.chatRoomId = roomId;
      return Promise.resolve(roomId);
    });
  }

  startLoadMessages(callback) {
    if (this.chatRoomId) {
      this.messageRef = getFirebaseDatabaseRef(`Messages/${this.chatRoomId}`);
      const displayMessages = (data) => {
        callback(data.val());
      };
      this.messageRef.limitToLast(100).on('child_added', displayMessages);
    }
  }

  sendMessage(message) {
    const messageRefKey = this.messageRef.push().key;
    return firebase
      .database()
      .ref(`Messages/${this.chatRoomId}/${messageRefKey}`)
      .set({
        sender: this.sender,
        message,
        timestamp: getFirebaseServerTimestamp(),
      });
  }
}
