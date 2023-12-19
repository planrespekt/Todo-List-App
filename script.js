// script.js

// Function to create a new todo item
function createTodoItem(text) {
    const li = document.createElement('li');
    li.textContent = text;
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Slett';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
      li.remove();
      saveTodos();
    };
  
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Ferdig';
    completeButton.className = 'complete';
    completeButton.onclick = function() {
      li.classList.toggle('completed');
      saveTodos();
    };
  
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
  
    return li;
  }
  
  // Function to save todos to localStorage
  function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(item => {
      todos.push({ 
        text: item.firstChild.textContent, 
        completed: item.classList.contains('completed') 
      });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  // Function to load todos from localStorage
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
      const li = createTodoItem(todo.text);
      if (todo.completed) {
        li.classList.add('completed');
      }
      document.getElementById('todo-list').appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Load stored todos
    loadTodos();
  
    // Add new todo on button click
    document.getElementById('add-todo').onclick = () => {
      const newTodoText = document.getElementById('new-todo').value;
      if (newTodoText) {
        const newTodoItem = createTodoItem(newTodoText);
        document.getElementById('todo-list').appendChild(newTodoItem);
        document.getElementById('new-todo').value = '';
        saveTodos();
      }
    };
  });
  