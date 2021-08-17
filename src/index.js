import './style.css';

function component() {
  const element = document.createElement('h1');

  element.innerHTML = 'Hello To Do List';

  return element;
}

document.body.appendChild(component());
