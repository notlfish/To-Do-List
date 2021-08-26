const eventMock = {
  container: document.createElement('li'),
  preventDefault: () => {},
  target: {
    getElementsByTagName: () => [{ value: 'Mock description' }],
    closest: () => eventMock.container,
  },
};

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

export default eventMock;
