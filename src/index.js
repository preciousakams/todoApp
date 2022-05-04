import './style.css';

// Get saved todos from local storage

function loadTasks() {
  if (localStorage.getItem('tasks') === null) return;

  const tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
  tasks.forEach((task) => {
    const list = document.querySelector('ul');
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
    <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="fa-solid fa-ellipsis-vertical" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}
window.onload = loadTasks;

// eslint-disable-next-line consistent-return
function addTask() {
  const task = document.querySelector('form input');
  const list = document.querySelector('ul');
  if (task.value === '') {
    return false;
  }
  // check if todo exists
  if (document.querySelector(`input[value="${task.value}"]`)) {
    return false;
  }
  // add to local storage
  localStorage.setItem('tasks', JSON.stringify([...JSON.parse(localStorage.getItem('tasks') || '[]'), { task: task.value, completed: false }]));

  const li = document.createElement('li');
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa-solid fa-ellipsis-vertical" onclick="removeTask(this)"></i>`;
  list.insertBefore(li, list.children[0]);
  // clear input
  task.value = '';
}
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});
function taskComplete(event) {
  const tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
  tasks.forEach((task) => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle('completed');
}
taskComplete();