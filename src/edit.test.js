import {
  saveList,
  completeTaskListener,
  descriptionListener,
  taskUpdateListener,
} from './crud';
import ToDoList, { LIST_STORAGE_KEY } from './toDoList';
import eventMock from './mock';

describe('Update task status', () => {
  let tasksList = new ToDoList();
  const container = document.createElement('ul');

  beforeEach(() => {
    localStorage.clear();
    container.innerHTML = '';
    eventMock.container.innerHTML = '';
    tasksList = new ToDoList();
    saveList(tasksList);
    tasksList.addTask('First Task');
  });

  test('Test if the task is not completed by default', () => {
    expect(tasksList.list[0].completed).toBe(false);
  });

  test('Test if the task is not completed by default', () => {
    tasksList.list[0].toggleCompleted();
    expect(tasksList.list[0].completed).toBe(true);
  });

  test('Update local storage after toggle', () => {
    completeTaskListener(tasksList.list[0])(eventMock);
    const fetchedList = localStorage.getItem(LIST_STORAGE_KEY);
    expect(fetchedList).toEqual(JSON.stringify(tasksList.list));
  });

  test('Render on toggle', () => {
    completeTaskListener(tasksList.list[0])(eventMock);
    expect(eventMock.container.innerHTML).toContain('checked-task');
  });
});

describe('Edit task description', () => {
  let tasksList = new ToDoList();
  const container = document.createElement('ul');

  beforeEach(() => {
    localStorage.clear();
    container.innerHTML = '';
    eventMock.container.innerHTML = '';
    tasksList = new ToDoList();
    saveList(tasksList);
    tasksList.addTask('First Task');
  });

  test('Task#updateDesctiption', () => {
    tasksList.list[0].updateDesctiption('Updated Task');
    expect(tasksList.list[0].description).toEqual('Updated Task');
  });

  test('crud.js descriptionListener changes description to form', () => {
    descriptionListener(tasksList.list[0])(eventMock);
    const li = eventMock.container;
    expect(li.innerHTML).toContain('<form');
  });

  test('crud.js taskUpdateListener changes task\'s description', () => {
    taskUpdateListener(tasksList.list[0])(eventMock);
    expect(tasksList.list[0].description).toEqual('Mock description');
  });

  test('crud.js taskUpdateListener saves list', () => {
    taskUpdateListener(tasksList.list[0])(eventMock);
    const fetchedList = localStorage.getItem(LIST_STORAGE_KEY);
    expect(fetchedList).toEqual(JSON.stringify(tasksList.list));
  });

  test('crud.js taskUpdateListener renders', () => {
    taskUpdateListener(tasksList.list[0])(eventMock);
    const li = eventMock.container;
    expect(li.innerHTML).toContain('Mock description');
    expect(li.innerHTML).not.toContain('<form');
  });
});
