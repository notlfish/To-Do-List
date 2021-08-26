import { saveList, addTaskListener, clearCompletedListener } from './crud';
import ToDoList, { LIST_STORAGE_KEY } from './toDoList';
import eventMock from './mock';

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

  describe('Add elements functionality', () => {
    describe('ToDoList#addTask', () => {
      test('Adds a task to an empty list; check description', () => {
        emptyList.addTask('First Task');
        expect(emptyList.list.length).toBe(1);
        expect(emptyList.list[0].description).toEqual('First Task');
      });

      test('Adds a task to a nonempty list; check description and index', () => {
        tasksList.addTask('Fourth Task');
        expect(tasksList.list[3].description).toEqual('Fourth Task');
        expect(tasksList.list[3].index).toEqual(3);
      });
    });

    describe('crud.js addTaskListener()', () => {
      const container = document.createElement('ul');

      beforeEach(() => {
        container.innerHTML = '';
        saveList(tasksList);
      });

      test('Adds task to the list object', () => {
        addTaskListener(emptyList, container)(eventMock);
        expect(emptyList.list.length).toBe(1);
      });

      test('Renders list object', () => {
        addTaskListener(tasksList, container)(eventMock);
        expect(container.innerHTML).toContain('Mock description');
      });

      test('Saves list', () => {
        addTaskListener(tasksList, container)(eventMock);
        const fetchedList = localStorage.getItem(LIST_STORAGE_KEY);
        expect(fetchedList).toEqual(JSON.stringify(tasksList.list));
      });
    });
  });
});

describe('Remove task', () => {
  let tasksList = new ToDoList();
  const container = document.createElement('ul');

  beforeEach(() => {
    localStorage.clear();
    container.innerHTML = '';

    tasksList = new ToDoList();
    saveList(tasksList);
    tasksList.addTask('First Task');
    tasksList.addTask('Second Task');
    tasksList.addTask('Third Task');

    tasksList.list[0].toggleCompleted();
    tasksList.list[1].toggleCompleted();
  });

  test('Remove completed tasks test task array', () => {
    tasksList.deleteCompleted();
    expect(tasksList.list.length).toBe(1);
  });

  test('Update index after task is deleted', () => {
    tasksList.deleteCompleted();
    expect(tasksList.list[0].index).toBe(0);
  });

  test('Update localStorage after deleting  elements', () => {
    clearCompletedListener(tasksList, container)(eventMock);
    const fetchedList = localStorage.getItem(LIST_STORAGE_KEY);
    expect(fetchedList).toEqual(JSON.stringify(tasksList.list));
  });

  test('Update dom after deleting compelted elements', () => {
    clearCompletedListener(tasksList, container)(eventMock);
    expect(container.innerHTML).not.toContain('First Task');
    expect(container.innerHTML).not.toContain('Second Task');
  });
});

describe('Drag & drop functionality', () => {
  let tasksList = new ToDoList();

  beforeEach(() => {
    localStorage.clear();
    tasksList = new ToDoList();
    tasksList.addTask('Zeroth Task');
    tasksList.addTask('First Task');
    tasksList.addTask('Second Task');
    tasksList.addTask('Third Task');
  });

  test('ToDoList#taskReorder updates bigger indices', () => {
    tasksList.taskReorder(3, 0);

    const indices = tasksList.list.map((task) => task.index);
    const descriptions = tasksList.list.map((task) => task.description)
          .join(', ');
    const expectedDescriptions = 'Third Task, Zeroth Task, First Task, Second Task';

    expect(indices).toEqual([0, 1, 2, 3]);
    expect(descriptions).toEqual(expectedDescriptions);
  })
});
