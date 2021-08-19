import './style.css';
import 'font-awesome/css/font-awesome.css';
import Task from './task';
import ToDoList from './toDoList';

const toDoUl = document.getElementById('to-do-list');

const toDoList = new ToDoList([
  new Task('Bathe the dog', 1, false),
  new Task('Fix the sink', 3, false),
  new Task('Feed the kitty cat', 2, true),
]);

toDoList.render(toDoUl);
