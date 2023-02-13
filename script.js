let addTaskButton = document.querySelector('#add-task');
let tasksContainer = document.querySelector("#tasks-container")
let deleteTasksButton = document.querySelector("#delete-task")

let taskCounter = 0

let tasksInfo = {}

// localStorage.removeItem("todoObject")

updateInfo = () => {
    tasksContainer = document.querySelector("#tasks-container")
    tasksContainerChildren = Array.from(tasksContainer.children);
    taskIDs = tasksContainerChildren.map(element => { return element.id });
    taskCheckboxIDs = tasksContainerChildren.map(element => { return Array.from(element.children)[0].id })
}

getTasksObject = () => {
    updateInfo()
    tasksObject = new Object()
    for (let i = 1; i <= taskIDs.length; i++) {
        currentTaskChildren = document.getElementById(taskIDs[i - 1]).children
        tasksObject[`task${i}`] = {
            checkmark: {
                id: currentTaskChildren[0].id,
                value: currentTaskChildren[0].value
            },
            taskContent: {
                id: currentTaskChildren[1].id,
                value: currentTaskChildren[1].value
            },
            date: {
                id: currentTaskChildren[2].children[0].id,
                value: currentTaskChildren[2].children[0].value
            },
            time: {
                id: currentTaskChildren[2].children[1].id,
                value: currentTaskChildren[2].children[1].value
            },
            category: {
                id: currentTaskChildren[2].children[2].id,
                value: currentTaskChildren[2].children[2].value
            }
        }
    }
    let todoObject = JSON.stringify(tasksObject)
    localStorage.setItem('todoObject', todoObject)
    innerHTML = tasksContainer.innerHTML
}


handleAddTaskClick = () => {
    taskCounter = taskCounter + 1
    taskHTML = `<div id="task-${taskCounter}" class="task-container">
                    <input type = "checkbox" id = "task-${taskCounter}-checkbox" class="task-checkbox task-details" />
                    <input type="text" placeholder="Task name" id="task-${taskCounter}-task" class="task-content task-details">
                    <div id="task-${taskCounter}-details" class="task-details-container">
                        <input type="date" id="task-${taskCounter}-date" class="task-details task-day task-details-bottom">
                        <input type="time" id="task-${taskCounter}-time" class="task-details task-time task-details-bottom">
                        <select name="category-dropdown" id="task-${taskCounter}-category-dropdown" class="task-details task-details-bottom task-category">
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                        </select>
                    </div>
                </div>`
    currentInnerHTML = tasksContainer.innerHTML
    tasksContainer.innerHTML = currentInnerHTML + taskHTML
    for (let task_detail of document.querySelectorAll(".task-details")) {
        task_detail.addEventListener("change", getTasksObject)
    }
    updateInfo()
    correctIDs()
    getTasksObject()
}

handleDeleteButtonClick = () => {
    for (let taskID of taskCheckboxIDs) {
        currentIDToCheck = document.getElementById(taskID)
        if (currentIDToCheck.checked) {
            currentIDToCheck.parentNode.remove()
        }
    }
    updateInfo()
    correctIDs()
    getTasksObject()
}

correctIDs = () => {
    if (tasksContainer.children.length > 0) {
        for (let i = 1; i <= taskIDs.length; i++) {
            // console.log(taskIDs, i, tasksContainer.children)
            tasksContainer.children[i - 1].id = `task-${i}`
            currentElementChildren = tasksContainer.children[i - 1].children
            currentElementChildren[0].id = `task-${i}-checkbox`
            currentElementChildren[1].id = `task-${i}-task`
            currentElementChildren[2].children[0].id = `task-${i}-date`
            currentElementChildren[2].children[1].id = `task-${i}-time`
            currentElementChildren[2].children[2].id = `task-${i}-category-dropdown`
        }
    }
    updateInfo()
}

loadToDoObject = () => {
    if (localStorage.getItem("todoObject")) {
        tasksObject = JSON.parse(localStorage.getItem("todoObject"))
        populateToDoList(Object.keys(tasksObject).length)
        console.log(Object.keys(tasksObject).length)
    }
}

populateToDoList = (length) => {
    for (let i = 1; i <= length; i++) {
        handleAddTaskClick()
    }
}

loadToDoObject()

// setInterval(getTasksObject, 10);


addTaskButton.addEventListener('click', handleAddTaskClick)

deleteTasksButton.addEventListener("click", handleDeleteButtonClick)
