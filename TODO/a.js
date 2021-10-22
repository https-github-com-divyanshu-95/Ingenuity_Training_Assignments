showTasks();
let addBtn = document.getElementById('addbtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addtxt');
    let title = document.getElementById('title');
    let tasks = localStorage.getItem('mytasks');
    if (tasks == null) {    
        tasksObj = [];
    }
    else {
        tasksObj = JSON.parse(tasks);
    }
    tasksObj.push([title.value, addTxt.value]);
    localStorage.setItem("mytasks", JSON.stringify(tasksObj));
    addTxt.value = "";
    title.value = ""
    showTasks();
});
function showTasks() {
    let tasks = localStorage.getItem('mytasks');
    if (tasks == null) {
        tasksObj = [];
    }
    else {
        tasksObj = JSON.parse(tasks);
    }
    let html = "";
    if (tasksObj.length > 0) {
    tasksObj.forEach(function (element, index) {
        html += `
            <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${index + 1}.&nbsp${element[0]}</h5>
                <p class="card-text">${element[1]}</p>
                <button id='${index}' onclick=deleteTask(this.id)  class="btn btn-primary">Delete Task
                </button>
            </div>
        </div>
            `
    });
    }
    let elem = document.getElementById('tasks');
    if (tasksObj.length == 0) {
        elem.innerText = "No tasks to show . ";
    }
    else {
        elem.innerHTML = html;
    }
}
function deleteTask(index) {
    let tasks = localStorage.getItem('mytasks');
    if (tasks == null) {
        tasksObj = null;
    }
    else {
        tasksObj = JSON.parse(tasks);
    }
    tasksObj.splice(index, 1);
    localStorage.setItem("mytasks", JSON.stringify(tasksObj));
    showTasks();
}