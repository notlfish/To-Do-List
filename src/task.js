export default class Task {
  constructor(description, index, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  render() {
    const taskContainer = document.createElement('li');
    taskContainer.classList.add('to-do-task');
    taskContainer.classList.add('app-entry');

    const taskLeft = document.createElement('div');
    const taskCompleteButton = document.createElement('button');

    const taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
    taskDescription.innerHTML = this.description;

    if (this.completed) {
      taskCompleteButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
      taskDescription.classList.add('completed-task');
      taskCompleteButton.classList.add('checked-task');
    } else {
      taskCompleteButton.innerHTML = '<i class="fa fa-square-o" aria-hidden="true"></i>';
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

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
