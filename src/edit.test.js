import { saveList, addTaskListener, clearCompletedListener, completeTaskListener } from './crud';
import ToDoList, { LIST_STORAGE_KEY } from './toDoList';
import {eventMock} from './mock.js'


describe('Update task status', () => {
  let tasksList = new ToDoList();
  const container = document.createElement('ul');

  beforeEach(() => {
    localStorage.clear();
    container.innerHTML = '';
    eventMock.container.innerHTML = "";
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
