import './style.css';

const form = document.querySelector('.form');
const input = document.querySelector('.todoInput');
const list = document.querySelector('.todoList');

let todoItems = [];

function renderTodo(todo) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  const item = document.querySelector(`[data-key='${todo.index}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = '';
    return;
  }

  const iscompleted = todo.completed ? 'done' : '';
  const node = document.createElement('li');
  node.setAttribute('class', `todo-item ${iscompleted}`);
  node.setAttribute('data-key', todo.index);
  node.innerHTML = `
    <input index="${todo.index}" type="checkbox"/>
    <label for="${todo.index}" class="tick js-tick"></label>
    <input value="${todo.description}" class="todo" ></input>
  
    <i class="fa-solid fa-ellipsis-vertical js-delete-todo"></i>
   
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}
function addTodo(description) {
  const todo = {
    description,
    completed: false,
    index: Date.now(),
  };
  todoItems.push(todo);
  renderTodo(todo);
}
function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.index === Number(key));
  todoItems[index].completed = !todoItems[index].completed;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.index === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems = todoItems.filter((item) => item.index !== Number(key));
  renderTodo(todo);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const description = input.value.trim();
  if (description !== '') {
    addTodo(description);
    input.value = '';
    input.focus();
  }
});

list.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});