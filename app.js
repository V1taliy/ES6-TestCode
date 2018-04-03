/*const li = document.createElement('li');
li.className = 'collection-item';

li.id = 'new-item';

li.setAttribute('title', 'New Item');


li.appendChild(document.createTextNode('Hello World'));
document.querySelector('ul').appendChild(li);

console.log(li);


const newHeading = document.createElement('h2');
newHeading.id = 'task-titile';
newHeading.appendChild(document.createTextNode('Tasl List'));
const oldHeading = document.getElementById('task-title');
const cardAction = document.querySelector('.card-action');

cardAction.replaceChild(newHeading, oldHeading);
//REMOVE ELEMENT
const lis = document.querySelectorAll('li');
const list = document.querySelector('ul');
lis[0].remove();
list.removeChild(lis[3]);

console.log(newHeading)
*/

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

loadEventListeners();
function loadEventListeners() {
//DOM Load events
document.addEventListener('DOMcontentLoaded', getTasks); 
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter Tasks event
    filter.addEventListener('keyup', filterTasks);
}
//Get Task from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
  //Create li element 
  const li = document.createElement('li');
  //add class
      li.className = 'collection-item'; 
  //create text node and append to li
  li.appendChild(document.createTextNode(task));
  //create new link element
  const link = document.createElement('a');
   link.className = 'delete-item secondary-content';
  
   //Add icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   
   //Append the link to li
  
   li.appendChild(link);
  
  
  //Append li to ul
  taskList.appendChild(li);
    });
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task')
    }
    //Create li element
    const li = document.createElement('li');
//add class
    li.className = 'collection-item';
//create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
//create new link element
const link = document.createElement('a');
 link.className = 'delete-item secondary-content';

 //Add icon html
 link.innerHTML = '<i class="fa fa-remove"></i>';
 
 //Append the link to li

 li.appendChild(link);


//Append li to ul
taskList.appendChild(li);

//Store in LS
storeTaskInLocalStorage(taskInput.value);


 //clear input 
 taskInput.value = '';
    e.preventDefault(); 
    }

    //Store Task
    function storeTaskInLocalStorage(task) {
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    //Remove
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure')) {

        }
        e.target.parentElement.parentElement.remove(); 
    }
}
//clear tasks
function clearTasks() {
   //tasklist.innerHTML = '';
//Faaster
while(taskList.firstChild) { 
    taskList.removeChild(taskList.firstChild);
}    
}
///Filter Tasks
 function filterTasks(e) {
     const text = e.target.value.toLowerCase();

     document.querySelectorAll('.collection-item').forEach(function(task){
         const item = task.firstChild.textContent;
         if(item.toLowerCase().indexOf(text) != -1) {
             task.style.display = 'block';
         } else {
             task.style.display = 'none';
         }
     });
}
