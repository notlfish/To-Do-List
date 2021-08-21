import {
  completeTaskListener,
  descriptionListener,
  taskUpdateListener,
} from './crud';

export default class Task {
  constructor(description, index, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  renderCompleteButton() {
    const completeButton = document.createElement('button');
    if (this.completed) {
      completeButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
      completeButton.classList.add('checked-task');
    } else {
      completeButton.innerHTML = '<i class="fa fa-square-o" aria-hidden="true"></i>';
    }

    completeButton.addEventListener('click', completeTaskListener(this));

    return completeButton;
  }

  renderDescriptionP() {
    const descriptionP = document.createElement('p');
    descriptionP.classList.add('task-description');
    descriptionP.innerHTML = this.description;
    if (this.completed) descriptionP.classList.add('completed-task');

    descriptionP.addEventListener('click', descriptionListener(this));

    return descriptionP;
  }

  renderDescriptionInput() {
    const form = document.createElement('form');
    form.classList.add('task-description');
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = this.description;
    form.appendChild(descriptionInput);
    form.addEventListener('submit', taskUpdateListener(this));

    return form;
  }

  render(container, withInput = false) {
    container.innerHTML = '';
    container.classList.add('to-do-task');
    container.classList.add('app-entry');
    const containerLeft = document.createElement('div');

    const button = this.renderCompleteButton();
    const description = withInput ? this.renderDescriptionInput()
      : this.renderDescriptionP();
    containerLeft.append(button, description);

    const drag = document.createElement('p');
    drag.innerHTML = '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>';
    drag.classList.add('gray-icon');
    container.append(containerLeft, drag);
    return description;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  updateDesctiption(newDescription) {
    this.description = newDescription;
  }
}
