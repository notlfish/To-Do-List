import Task from './task';

export default class ToDoList {
  constructor(tasks = []) {
    const lsList = JSON.parse(localStorage.getItem('ToDoList'));
    if (lsList) {
      this.list = lsList.map(task => new Task(task.description, task.index, task.completed));
    } else {
      this.list = tasks;
    }
  }

  save() {
    localStorage.setItem('ToDoList', JSON.stringify(this.list));
  }

  render(container) {
    container.innerHTML = '';
    this.list.sort((task1, task2) => task1.index - task2.index)
      .forEach((task) => {
        console.log(task);
        const { html, button } = task.render();

        container.appendChild(html);
      });
  };
}
