export default class State {
  constructor(storage) {
    this.storage = storage;
  }

  saver(state) {
    this.storage.setItem('state', JSON.stringify(state));
  }

  loader() {
    try {
      return JSON.parse(this.storage.getItem('state'));
    } catch (e) {
      throw new Error('Invalid state');
    }
  }
}
