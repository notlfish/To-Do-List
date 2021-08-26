import Task from './task';

export const LIST_STORAGE_KEY = 'ToDoList';

export default class ToDoList {
  constructor() {
    const lsList = JSON.parse(localStorage.getItem(LIST_STORAGE_KEY));
    if (lsList) {
      this.list = lsList.map((task) => new Task(task.description, task.index, task.completed));
    } else {
      this.list = [];
    }
  }

  save() {
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(this.list));
  }

  render(container) {
    container.innerHTML = '';
    this.list.sort((task1, task2) => task1.index - task2.index)
      .forEach((task) => {
        const li = document.createElement('li');
        task.render(li);
        container.appendChild(li);
      });
  }

  addTask(description) {
    const index = this.list.length;
    const task = new Task(description, index);
    this.list.push(task);
  }

  deleteCompleted() {
    this.list = this.list.filter((task) => !task.completed);
    this.list.forEach((task, index) => {
      task.index = index;
    });
  }

  taskReorder(oldIndex, newIndex) {
    this.list.forEach((task) => {
      if(task.index === oldIndex) {
        task.index = newIndex
      } else if(task.index >= newIndex) {
        task.index += 1
      }
    });
    this.list = this.list.sort((task1, task2) => task1.index - task2.index);
  }
}
