const form = document.querySelector('#form');
const field = document.querySelector('#field');
const button = document.querySelector('#button');
const todoWrapper = document.querySelector('#todo-items');
const darkModeToggle = document.querySelector('#toggle-dark-mode');

// Dark mode-ni yoqish/o‘chirish funksiyasi
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  saveDarkModePreference();
});

// Dark mode sozlamasini saqlash
function saveDarkModePreference() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Sahifa yuklanganda dark mode sozlamasini yuklash
function loadDarkModePreference() {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = 'Dark Mode';
  }
}

function validate(field) {
  if (field.value.length < 4) {
    alert("todo eng kamida 4 ta harfdan iborat");
    field.focus();
    return false;
  }
  return true;
}

function createCard(data) {
  return `
    <div class="todo-item" data-id="${data.id}">
      <p>${data.name}</p>
      <span class="buttons">delete</span>
    </div>
  `;
}

function getDataFromLocalStorage() {
  let data = [];
  if (localStorage.getItem('todos')) {
    data = JSON.parse(localStorage.getItem('todos'));
  }
  return data;
}

function saveToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  let todos = getDataFromLocalStorage();
  todos.forEach(todo => {
    let card = createCard(todo);
    todoWrapper.innerHTML += card;
  });
}

button && button.addEventListener('click', function (event) {
  event.preventDefault();
  const isValid = validate(field);

  if (!isValid) {
    return;
  }

  const todo = {
    id: Date.now(),
    name: field.value
  };

  const card = createCard(todo);
  todoWrapper.innerHTML += card;
  field.value = '';

  let todos = getDataFromLocalStorage();
  todos.push(todo);
  saveToLocalStorage(todos);

  addDeleteEvent();
});

document.addEventListener('DOMContentLoaded', function () {
  renderTodos();
  addDeleteEvent();
  loadDarkModePreference();
});

function addDeleteEvent() {
  let buttons = document.querySelectorAll('.buttons');
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      let isDelete = confirm('Rostdan ham ochirmoqchimisiz?');
      if (isDelete) {
        const todoItem = this.parentElement;
        const todoId = Number(todoItem.getAttribute('data-id'));

        let todos = getDataFromLocalStorage();
        todos = todos.filter(todo => todo.id !== todoId);
        saveToLocalStorage(todos);

        todoItem.remove();
      }
    });
  });
}
