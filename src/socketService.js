class SocketService {
  constructor() {
    this.socket = null;
  }

  init(socket) {
    this.socket = socket;
  }
}

export default new SocketService();
