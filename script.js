const addTodoBtn = document.querySelector('#add-new-todo-btn');
const newTodoInput = document.querySelector('#new-todo-input');
const ulTodoList = document.querySelector('#todo-list');

const storageTodos = JSON.parse(localStorage.getItem('todos'));

let todos = storageTodos != null ? storageTodos : [];

// 1 -> todos = ['Todo 1', 'Todo 2']
// 2 -> todos = [{id: 1, text: 'Todo 1'}, {id: 2, text: 'Todo 2'}]

function deleteTodo(todoText) {
  // Ex: todos = ['a', 'b', 'c']
  // todoText = 'a'
  // index = 0
  const index = todos.findIndex((t) => t === todoText);

  // array.splice will remove that item from that index
  todos.splice(index, 1); // todos = ['b', 'c']

  updateStorage(todos);
  initRender();
}

// 1 -> todos = ['Todo 1', 'Todo 2']
function createList(todoText) {
  const listItem = `
    <li class="single-todo">
      <p class="single-todo-text">${todoText}</p>
      <input type="text" class="edit-single-todo" />
      <button onclick="deleteTodo('${todoText}')" class="delete-btn">Delete</button>
    </li>
  `;

  ulTodoList.innerHTML += listItem;
}

// 2 -> todos = [{id: 1, text: 'Todo 1'}, {id: 2, text: 'Todo 2'}]
// function createList(todo) {
//   const listItem = `
//     <li class="single-todo">
//       <p class="single-todo-text">${todo.text}</p>
//       <input type="text" class="edit-single-todo" />
//       <button class="delete-btn">Delete</button>
//     </li>
//   `;

//   ulTodoList.innerHTML += listItem;
// }

function initRender() {
  ulTodoList.innerHTML = '';

  // 1
  for (let i = 0; i < todos.length; i++) {
    createList(todos[i]);
  }

  // 2
  // for (let todo of todos) {
  //   createList(todo);
  // }
}

initRender();

function updateStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

const addTodoFn = function () {
  const inputValue = newTodoInput.value;

  // 1 -> todos = ['Todo 1', 'Todo 2']
  if (inputValue !== '') {
    todos.push(inputValue);
    createList(inputValue);
    updateStorage(todos);
  }

  // 2 -> todos = [{id: 1, text: 'Todo 1'}, {id: 2, text: 'Todo 2'}]
  // if (inputValue !== '') {
  //   const newTodo = {
  //     id: todos.length ? todos[todos.length - 1].id + 1 : 1,
  //     text: inputValue,
  //   };
  //   todos.push(newTodo);
  //   updateStorage(todos);
  //   createList(newTodo);
  // }

  // Reset input value
  newTodoInput.value = '';
};

addTodoBtn.addEventListener('click', addTodoFn);
