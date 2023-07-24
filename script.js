document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("todo-form");
    const inputValue = document.getElementById("task-input");
    const timeValue = document.getElementById("task-time");
    const taskList = document.getElementById("task-list");
    const clearButton = document.getElementById("clear-button");
    
    form.addEventListener("submit", addTask);
    clearButton.addEventListener("click", clearAllTasks);
  
    displayTasks();
  
    function addTask(event) {
      event.preventDefault();
      
      if (inputValue.value === "" || inputValue.value.trim() === "") {
        return;
      }
  
      const task = {
        name: inputValue.value.trim(),
        time: timeValue.value,
        completed: false,
      };
      
      let tasks = [];
      
      if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
  
      inputValue.value = "";
      timeValue.value = "";
      
      displayTasks();
    }
  
    function displayTasks() {
      taskList.innerHTML = "";
      
      let tasks = [];
      
      if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      
      tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function() {
          toggleTaskCompleted(index);
        });
        
        const span = document.createElement("span");
        span.innerText = `${task.name} (${task.time})`;
        
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function() {
          deleteTask(index);
        });
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        
        if (task.completed) {
          li.classList.add("completed");
        }
        
        taskList.appendChild(li);
      });
    }
  
    function deleteTask(index) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      
      displayTasks();
    }
  
    function toggleTaskCompleted(index) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      
      displayTasks();
    }
  
    function clearAllTasks() {
      localStorage.removeItem("tasks");
      
      displayTasks();
    }
  });