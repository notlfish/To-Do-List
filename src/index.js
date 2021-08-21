import './style.css';
import 'font-awesome/css/font-awesome.css';
import ToDoList from './toDoList';
import { addTaskListener, clearCompletedListener } from './crud';

const toDoUl = document.getElementById('to-do-list');

const toDoList = new ToDoList();

const newTaskForm = document.getElementById('new-task');
newTaskForm.addEventListener('submit', addTaskListener(toDoList, toDoUl));

const clearCompletedButton = document.getElementById('clear-completed');
clearCompletedButton.addEventListener('click', clearCompletedListener(toDoList, toDoUl));

toDoList.render(toDoUl);

window.addEventListener('unload', () => {
  toDoList.save();
});
