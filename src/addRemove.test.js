import { addTaskListener, clearCompletedListener } from './crud';
import ToDoList from './toDoList';

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
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock();

describe('Add Task', () => {
  let emptyList = new ToDoList();
  let tasksList = new ToDoList();

  beforeEach(() => {
    emptyList = new ToDoList();
    tasksList = new ToDoList();
    tasksList.addTask('First Task');
    tasksList.addTask('Second Task');
    tasksList.addTask('Third Task');
  });

  describe('ToDoList#addTask', () => {
    test('Adds a task to an empty list', () => {
      emptyList.addTask('First Task')
      expect(emptyList.list.length).toBe(1);
      expect(emptyList.list[0].description).toEqual("First Task");
    });

    test('Adds a task to a nonempty list', () => {
      tasksList.addTask('Fourth Task')
      expect(tasksList.list[3].description).toEqual("Fourth Task");
      expect(tasksList.list[3].index).toEqual(3);
    });
  });
});
