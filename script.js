document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load saved tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render saved tasks
    tasks.forEach(task => addTask(task));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText === '') return;
        const task = { text: taskText, completed: false };
        addTask(task);
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            tasks.splice(tasks.indexOf(task), 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        list.appendChild(li);
    }
});
