const form = document.querySelector('#form');
const field = document.querySelector('#field');
const button = document.querySelector('#button');
const todoWrapper = document.querySelector('#todo-items');

function validate(field) {
  if (field.value.length < 4) {
    alert('todo eng kamida 4 ta belgidan iborat bolsin');
    field.focus();
    return false;
  }

  return true;
}

function createCard(data) {
  return `
  <div id="todo-item">
        <div class="todo-item">
          <p>${data.name}</p>
          <span data-id =${data.id} class = "delete">delete</span>
        </div>
`;
}

function getDataFromLocalStorage() {
  let data = []
  if (localStorage.getItem('todos')) {
    data = JSON.parse(localStorage.getItem('todos'))
  }

  return data
}

button &&
  button.addEventListener('click', function (event) {
    event.preventDefault();
    const isValid = validate(field);
    if (!isValid) {
      return;
    }

    const todo = {
      id: Date.now(),
      name: field.value,
    };

    const card = createCard(todo);
    todoWrapper.innerHTML += card;
    field.value = '';

    let todos = getDataFromLocalStorage()
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
  });


document.addEventListener('DOMContentLoaded', function () {
  let todos = getDataFromLocalStorage()


  todos.forEach(todo => {
    let card = createCard(todo)
    todoWrapper.innerHTML += card
  })

  let buttons = document.querySelectorAll('.delete')
  buttons.length > 0 && buttons.forEach(btn => {
    btn && btn.addEventListener('click', function (event) {
      let isDelete = confirm('Rostdan ham ochirmoqchimisiz?')
      if (isDelete) {
        this.parentNode.remove()
        let id = this.getAttribute('data-id');
        if (id) {
          todos = todos.filter(value => {
            return value.id != id
          })
          localStorage.setItem('todos', JSON.stringify(todos))
        }
      }
    })
  })

})