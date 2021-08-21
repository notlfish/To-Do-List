// Complete button listener
export const completeTaskListener = (task) => (event) => {
  event.preventDefault();
  task.toggleCompleted();
  const li = event.target.closest('li');
  task.render(li);
};

// Description listener
export const descriptionListener = (task) => (event) => {
  event.preventDefault();
  const li = event.target.closest('li');
  task.render(li, true).focus();
};

// Task input listener
export const taskUpdateListener = (task) => (event) => {
  event.preventDefault();
  const description = event.target.getElementsByTagName('input')[0].value;
  const li = event.target.closest('li');
  task.updateDesctiption(description);
  task.render(li);
};

// Add task listener
export const addTaskListener = (list, container) => (event) => {
  event.preventDefault();
  const input = event.target.getElementsByTagName('input')[0];
  list.addTask(input.value);
  input.value = '';
  list.render(container);
};

// Delete completed tasks listener
export const clearCompletedListener = (list, container) => (event) => {
  event.preventDefault();
  list.deleteCompleted();
  list.render(container);
};
