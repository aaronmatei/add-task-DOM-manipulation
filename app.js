// define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();
// function to Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  //   Remove task event
  taskList.addEventListener('click', removeTask);
  //   clear all tasks event
  clearBtn.addEventListener('click', clearTasks);
  //   filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// get Tasks from localstorage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    //   create list element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //   create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //   create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    //   appending the li to the ul
    taskList.appendChild(li);
  });
}

// Add Task from input

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add task');
    return '';
  }
  //   create list element
  const li = document.createElement('li');
  li.className = 'collection-item';
  //   create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  //   create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  //   appending the li to the ul
  taskList.appendChild(li);
  //   Store in localstorage
  storeTaskInLocalStorage(taskInput.value);

  //   clear input
  taskInput.value = '';
  e.preventDefault();
}
// function for storing task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// function remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete?')) {
      e.target.parentElement.parentElement.remove();
      //   remove from localstorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// remove from localstorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// function clear tasks
function clearTasks(e) {
  // using innerHtml
  //   taskList.innerHTML = '';
  //   using removeChild
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear local storage
  clearTasksFromLocalStorage();
}
// function to clear local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
// filter function
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
