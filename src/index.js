import './style.css';
import 'font-awesome/css/font-awesome.css';

class Task {
  constructor (description, index, completed) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  render() {
    let taskContainer = document.createElement('li');
    taskContainer.classList.add('to-do-task');
    taskContainer.classList.add('app-entry');

    let taskLeft = document.createElement('div');
    const taskCompleteButton = document.createElement('button');

    const taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
    taskDescription.innerHTML = this.description;

    if (this.completed) {
      taskCompleteButton.innerHTML =
        '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
      taskDescription.classList.add('completed-task');
    } else {
      taskCompleteButton.innerHTML =
        '<i class="fa fa-square-o" aria-hidden="true"></i>';
    }

    const taskDrag = document.createElement('p');
    taskDrag.innerHTML = '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>';
    taskDrag.classList.add('gray-icon');

    taskLeft.appendChild(taskCompleteButton);
    taskLeft.appendChild(taskDescription);
    taskContainer.appendChild(taskLeft);
    taskContainer.appendChild(taskDrag);

    return { html: taskContainer, button: taskCompleteButton, drag: taskDrag };
  }
}

export const toDoUl = document.getElementById('to-do-list');

const toDoList = [
  new Task('Bathe the dog', 1, false),
  new Task('Fix the sink', 3, false),
  new Task('Feed the kitty cat', 2, true),
]

const renderList = (list, container) => {
  list.sort((task1, task2) => task1.index - task2.index)
    .forEach(task => {
      const { html } = task.render();
      console.log(html);
      container.appendChild(html);
    });
}

renderList(toDoList, toDoUl);
