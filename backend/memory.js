class Memory {
  constructor() {
    this.sessions = new Map();
  }

  get(id) {
    if (!this.sessions.has(id)) {
      this.sessions.set(id, []);
    }
    return this.sessions.get(id);
  }

  set(id, data) {
    this.sessions.set(id, data);
  }
}

module.exports = { Memory };