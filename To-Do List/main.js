const taskInput = document.querySelector(".add-task-container input");
const addTaskBtn = document.querySelector(".add-task-container button");
const taskContainer = document.querySelector(".task-container");


addTaskBtn.addEventListener("click", addTask);





function addTask()
{
  const taskName = taskInput.value.trim(); 
  if (taskName !== "")
  {
    let task = `<div class="task">
        <input type="checkbox" onclick="handleClick()">
        <p class="task-name">${taskName}</p>
        <div class="action-btns">
          <svg onclick="dltTask(event)" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
      </div>`;

    const tasks = JSON.parse(localStorage.getItem("task")) || [];
    if (tasks.length == 0) 
    {
      taskContainer.innerHTML = "";
    }
    taskContainer.insertAdjacentHTML("beforeend", task);
    taskInput.value = "";
    const taskObj = { "taskName": taskName, "isChecked": false };
    tasks.push(taskObj);
    localStorage.setItem("task", JSON.stringify(tasks));

  }
  else {
    window.alert("Task Can't be Empty ");
  }
}

function dltTask(event) 
{
  const button = event.target;
  const actionBtns = button.parentNode;
  const taskCon = actionBtns.parentNode;
  const taskNameElement = taskCon.querySelector(".task-name");
  const taskName = taskNameElement.textContent;


  const tasks = JSON.parse(localStorage.getItem("task")) || [];
  const index = tasks.findIndex(task => task.taskName === taskName); // Find the task by name

  if (index !== -1) {
    taskCon.classList.add("task-item-deleting");
    taskCon.addEventListener("animationend", () => {
      tasks.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(tasks));
      taskCon.remove();
      if(tasks.length === 0) 
      {
        setTimeout(()=>{
          const animation = `<lottie-player src="Animation - 1744638787983 (1).json" background="transparent" speed="1" style="width: 300px; height: 300px; margin:0 auto;" loop autoplay ></lottie-player>`;
          taskContainer.innerHTML = animation;
        },500);
      }
    });
  }
}

window.addEventListener("load", () => {

  const tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks.forEach(task => {
    const taskName = task.taskName;
    const isChecked = task.isChecked ? "checked" : ""; 
    let taskCon = `<div class="task">
        <input type="checkbox" onclick="handleClick(event)" ${isChecked}>
        <p class="task-name">${taskName}</p>
        <div class="action-btns">
          <svg onclick="dltTask(event)" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
      </div>`;
    taskContainer.insertAdjacentHTML("beforeend", taskCon);
  });

  if (tasks.length === 0)
  {
    const animation = `<lottie-player src="Animation - 1744638787983 (1).json" background="transparent" speed="1" style="width: 300px; height: 300px; margin:0 auto;" loop autoplay ></lottie-player>`;
    taskContainer.innerHTML = animation;
  }

});

function handleClick(event)
{
  const checkbox = event.target;
  const tasks = JSON.parse(localStorage.getItem("task")) || [];
  const currentTaskName = checkbox.parentNode.querySelector("p").textContent;
  const index = tasks.findIndex(task => task.taskName === currentTaskName);

  if (index !== -1) {
    tasks[index].isChecked = checkbox.checked;
    localStorage.setItem("task", JSON.stringify(tasks));
  }
}
