document.addEventListener('DOMContentLoaded', function () {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            data.forEach(task => addTaskToList(task));
        });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTaskToList(taskText);
        saveTaskToServer(taskText);
        taskInput.value = '';
    }
}

function addTaskToList(taskText) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;
    li.innerHTML += '<button onclick="deleteTask(this)">Delete</button>';
    taskList.appendChild(li);
}

function deleteTask(taskElement) {
    const index = Array.from(taskElement.parentElement.parentElement.children).indexOf(taskElement.parentElement);
    taskElement.parentElement.remove();
    deleteTaskFromServer(index);
}

function saveTaskToServer(taskText) {
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: taskText })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteTaskFromServer(index) {
    fetch(`/tasks/${index}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
