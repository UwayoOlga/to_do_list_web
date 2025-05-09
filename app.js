// let isLoggedIn = false;
// let tasks = [];

// document.getElementById('login-button').addEventListener('click', login);
// document.getElementById('signup-button').addEventListener('click', signup);
// document.getElementById('show-signup').addEventListener('click', showSignup);
// document.getElementById('switch-to-login').addEventListener('click', showLogin);
// document.getElementById('addTaskButton').addEventListener('click', addTask);
// document.getElementById('show-all').addEventListener('click', showAllTasks);
// document.getElementById('show-completed').addEventListener('click', showCompletedTasks);
// document.getElementById('show-uncompleted').addEventListener('click', showUncompletedTasks);

// // Login function
// function login() {
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   if (username && password) {
//     isLoggedIn = true;
//     switchToTodoSection();
//   } else {
//     alert('Please enter username and password.');
//   }
// }

// // Signup function
// function signup() {
//   const username = document.getElementById('new-username').value;
//   const password = document.getElementById('new-password').value;

//   if (username && password) {
//     alert('Signup successful! Now log in.');
//     showLogin();
//   } else {
//     alert('Please enter username and password.');
//   }
// }

// // Toggle between Login and Signup forms
// function showSignup() {
//   document.getElementById('auth-title').textContent = 'Sign Up';
//   document.getElementById('login-form').style.display = 'none';
//   document.getElementById('signup-form').style.display = 'block';
// }

// function showLogin() {
//   document.getElementById('auth-title').textContent = 'Login';
//   document.getElementById('signup-form').style.display = 'none';
//   document.getElementById('login-form').style.display = 'block';
// }

// // Switch to Todo section after login
// function switchToTodoSection() {
//   document.getElementById('auth-section').style.display = 'none';
//   document.getElementById('todo-section').style.display = 'block';
// }

// // Add Task
// function addTask() {
//   const taskInput = document.getElementById('taskInput');
//   const taskText = taskInput.value.trim();

//   if (taskText === '') {
//     alert('Please enter a task!');
//     return;
//   }

//   const task = {
//     text: taskText,
//     completed: false
//   };

//   tasks.push(task);
//   renderTasks();
//   taskInput.value = '';
// }

// // Render tasks
// function renderTasks() {
//   const taskList = document.getElementById('taskList');
//   taskList.innerHTML = '';

//   tasks.forEach((task, index) => {
//     const taskItem = document.createElement('li');
//     taskItem.classList.add('task-item');
    
//     const taskContent = document.createElement('span');
//     taskContent.classList.add('task-text');
//     taskContent.textContent = task.text;
//     if (task.completed) {
//       taskContent.style.textDecoration = 'line-through';
//       taskContent.style.color = 'gray';
//     }

//     const deleteButton = document.createElement('button');
//     deleteButton.classList.add('delete-task');
//     deleteButton.textContent = 'Delete';
//     deleteButton.addEventListener('click', () => deleteTask(index));

//     const completeButton = document.createElement('button');
//     completeButton.classList.add('delete-task');
//     completeButton.textContent = task.completed ? 'Undo' : 'Complete';
//     completeButton.addEventListener('click', () => toggleTaskCompletion(index));

//     taskItem.appendChild(taskContent);
//     taskItem.appendChild(completeButton);
//     taskItem.appendChild(deleteButton);

//     taskList.appendChild(taskItem);
//   });
// }

// // Toggle task completion status
// function toggleTaskCompletion(index) {
//   tasks[index].completed = !tasks[index].completed;
//   renderTasks();
// }

// // Delete task
// function deleteTask(index) {
//   tasks.splice(index, 1);
//   renderTasks();
// }

// // Show all tasks
// function showAllTasks() {
//   renderTasks();
// }

// // Show completed tasks
// function showCompletedTasks() {
//   const filteredTasks = tasks.filter(task => task.completed);
//   renderFilteredTasks(filteredTasks);
// }

// // Show uncompleted tasks
// function showUncompletedTasks() {
//   const filteredTasks = tasks.filter(task => !task.completed);
//   renderFilteredTasks(filteredTasks);
// }

// // Render filtered tasks
// function renderFilteredTasks(filteredTasks) {
//   const taskList = document.getElementById('taskList');
//   taskList.innerHTML = '';

//   filteredTasks.forEach((task, index) => {
//     const taskItem = document.createElement('li');
//     taskItem.classList.add('task-item');
    
//     const taskContent = document.createElement('span');
//     taskContent.classList.add('task-text');
//     taskContent.textContent = task.text;
//     if (task.completed) {
//       taskContent.style.textDecoration = 'line-through';
//       taskContent.style.color = 'gray';
//     }

//     const deleteButton = document.createElement('button');
//     deleteButton.classList.add('delete-task');
//     deleteButton.textContent = 'Delete';
//     deleteButton.addEventListener('click', () => deleteTask(index));

//     const completeButton = document.createElement('button');
//     completeButton.classList.add('delete-task');
//     completeButton.textContent = task.completed ? 'Undo' : 'Complete';
//     completeButton.addEventListener('click', () => toggleTaskCompletion(index));

//     taskItem.appendChild(taskContent);
//     taskItem.appendChild(completeButton);
//     taskItem.appendChild(deleteButton);

//     taskList.appendChild(taskItem);
//   });
// }
document.addEventListener("DOMContentLoaded", function() {
  // Select elements
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const completedTaskList = document.getElementById("completedTaskList");

  // Load saved tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to render tasks
  function renderTasks() {
      taskList.innerHTML = '';
      completedTaskList.innerHTML = '';
      
      tasks.forEach((task, index) => {
          const taskElement = document.createElement("li");
          taskElement.innerHTML = `
              <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
              <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
          `;

          if (task.completed) {
              completedTaskList.appendChild(taskElement);
          } else {
              taskList.appendChild(taskElement);
          }
      });
  }

  // Function to add a new task
  function addTask() {
      const taskText = taskInput.value.trim();

      if (taskText !== "") {
          tasks.push({
              text: taskText,
              completed: false
          });

          taskInput.value = ''; // Clear input field
          saveTasks();
          renderTasks();
      }
  }

  // Function to toggle task completion
  window.toggleComplete = function(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
  };

  // Save tasks to local storage
  function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Event listener for adding tasks
  addTaskBtn.addEventListener("click", addTask);

  // Render tasks on page load
  renderTasks();
});
