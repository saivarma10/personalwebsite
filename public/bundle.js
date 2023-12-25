(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// App.js
// Your main application logic
class App {
    render() {
        // Your application logic goes here
        // Use JavaScript to interact with the DOM
        console.log('Hello from App.js!');
    }
}

module.exports = App;


},{}],2:[function(require,module,exports){
// main.js
// import App from './App';
 
const App = require('./App');
const app = new App();
app.render();

// Function to save notepad entry
function saveNotepad() {
    const notepadContent = document.getElementById('notepadContent').value;

    // Example API usage to save notepad data
    fetch('/api/notepad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: notepadContent,
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error saving notepad data:', error));
}

// Function to retrieve notepad entries
function retrieveNotepad() {
    // Example API usage to retrieve notepad data
    fetch('/api/notepad')
        .then(response => response.json())
        .then(data => displayNotepad(data))
        .catch(error => console.error('Error retrieving notepad data:', error));
}

// Function to display notepad entries
function displayNotepad(notepadEntries) {
    const notepadEntriesDiv = document.getElementById('notepadEntries');
    notepadEntriesDiv.innerHTML = '<h2>Notepad Entries:</h2>';

    if (notepadEntries.length > 0) {
        notepadEntries.forEach(entry => {
            notepadEntriesDiv.innerHTML += `<p>${entry.content}</p>`;
        });
    } else {
        notepadEntriesDiv.innerHTML += '<p>No notepad entries found.</p>';
    }
}

// Function to save task
function saveTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDueDate = document.getElementById('taskDueDate').value;

    // Example API usage to save task data
    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error saving task data:', error));
}

// // Function to retrieve all tasks
function retrieveTasks() {
    // Example API usage to retrieve all tasks
    fetch('/api/tasks')
        .then(response => response.json())
        .then(data => displayTasks(data, 'All Tasks'))
        .catch(error => console.error('Error retrieving tasks:', error));
}

// // Function to retrieve completed tasks this week
function retrieveCompletedTasksThisWeek() {
    // Example API usage to retrieve completed tasks this week
    fetch('/api/tasks/completedThisWeek')
        .then(response => response.json())
        .then(data => displayTasks(data, 'Completed Tasks This Week'))
        .catch(error => console.error('Error retrieving completed tasks this week:', error));
}

// Function to display tasks
function displayTasks(tasks, heading) {
    const taskEntriesDiv = document.getElementById('taskEntries');
    taskEntriesDiv.innerHTML = `<h2>${heading}</h2>`;

    if (tasks.length > 0) {
        tasks.forEach(task => {
            taskEntriesDiv.innerHTML += `<p>${task.title} - ${task.description} - Due: ${new Date(task.dueDate).toLocaleDateString()}</p>`;
        });
    } else {
        taskEntriesDiv.innerHTML += '<p>No tasks found.</p>';
    }
}

// ... (rest of the code)


},{"./App":1}]},{},[2]);
