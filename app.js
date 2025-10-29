// ===== Theme Toggle Function =====
function toggleTheme() {
    const body = document.body;
    const toggleSlider = document.querySelector('.toggle-slider');
    
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        toggleSlider.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleSlider.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

// ===== Load Saved Theme on Page Load =====
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const toggleSlider = document.querySelector('.toggle-slider');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleSlider.textContent = '🌙';
    } else {
        toggleSlider.textContent = '☀️';
    }
}

const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const totalTasksEl = document.getElementById('totalTasks');
        const completedTasksEl = document.getElementById('completedTasks');

        let tasks = [];

        addBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });

        function addTask() {
            const taskText = taskInput.value.trim();

            if (taskText === '') {
                taskInput.focus();
                taskInput.style.borderColor = '#fd6060ff';
                setTimeout(() => {
                    taskInput.style.borderColor = '#e0e0e0';
                }, 500);
                return;
            }

            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };

            tasks.push(task);
            taskInput.value = '';
            taskInput.focus();

            renderTasks();
        }

        function renderTasks() {
            taskList.innerHTML = '';
            if (tasks.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';

                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.className = `task-item ${task.completed ? 'completed' : ''}`;
                    li.setAttribute('data-task-id', task.id);
                    li.innerHTML = `
                        <input 
                            type="checkbox" 
                            class="task-checkbox" 
                            ${task.completed ? 'checked' : ''}
                            onchange="toggleTask(${task.id})"
                        >
                        <span class="task-text">${task.text}</span>
                        <button class="delete-btn" onclick="deleteTask(${task.id})" aria-label="Delete task">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        </button>
 `;
                    taskList.appendChild(li);
                });
            }
            updateStats();
        }
        function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        
        const taskElement = document.querySelector(`[data-task-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.toggle('completed');
        }
        
        updateStats();
    }
}
        function deleteTask(id) {
    const taskElement = document.querySelector(`[data-task-id="${id}"]`);
    
    if (taskElement) {
        taskElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            taskElement.remove();
            tasks = tasks.filter(t => t.id !== id);
            updateStats();
            if (tasks.length === 0) {
                emptyState.style.display = 'block';
            }
        }, 300);
    }
}
        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;

            totalTasksEl.textContent = total;
            completedTasksEl.textContent = completed;
        }
        renderTasks();

        // Load theme when page loads
loadTheme();