let addTaskButton = document.querySelector('#add-task');
let tasksContainer = document.querySelector("#tasks-container")

let taskCounter = 0

let tasksInfo = {}

handleAddTaskClick = () => {
    taskCounter = taskCounter + 1
    taskHTML = `<div id="task${taskCounter}" class="task-container">
    <input type = "radio" id = "task${taskCounter}-radio" class="task-radio" /><input type="text" placeholder="Task name" id="task${taskCounter}-task"
                            class="task-content"><span class="material-symbols-outlined delete-button">
                        delete
                    </span>
                    <div id="task${taskCounter}-details" class="task-details-container">
                        <input type="date" id="task${taskCounter}-date" class="task-details task-day">
                        <input type="time" id="task${taskCounter}-time" class="task-details task-time">
                        <select name="category-dropdown" id="task${taskCounter}-category-dropdown" class="task-details task-category">
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                        </select>
                    </div>
                </div>`
    currentInnerHTML = tasksContainer.innerHTML
    tasksContainer.innerHTML = currentInnerHTML + taskHTML
    let tasksContainerChildren = Array.from(tasksContainer.children);
    taskIDs = tasksContainerChildren.map(element => { return element.id });
}

addTaskButton.addEventListener('click', handleAddTaskClick)