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
    return completeButton;
  }

  renderDescriptionP() {
    const descriptionP = document.createElement('p');
    descriptionP.classList.add('task-description');
    descriptionP.innerHTML = this.description;
    if (this.completed) descriptionP.classList.add('completed-task');

    return descriptionP;
  }

  renderDescriptionInput() {
    const descriptionInput = document.createElement('input');
    descriptionInput.classList.add('task-description');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = this.description;

    return descriptionInput;
  }

  render(withInput) {
    const container = document.createElement('li');
    container.classList.add('to-do-task');
    container.classList.add('app-entry');
    const containerLeft = document.createElement('div');

    const button = this.renderCompleteButton();
    const description = withInput ? this.renderDescriptionInput()
      : this.renderDescriptionP();
    const drag = document.createElement('p');
    drag.innerHTML = '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>';
    drag.classList.add('gray-icon');

    containerLeft.append(button, description);
    container.append(containerLeft, drag);

    return {
      html: container,
      button,
      description,
      drag,
    };
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  updateDesctiption(newDescription) {
    this.description = newDescription;
  }
}
