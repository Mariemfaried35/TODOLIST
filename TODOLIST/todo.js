document.addEventListener("DOMContentLoaded",()=>{
  let todoForm= document.getElementById("tdForm");
  let newtask= document.getElementById("todo");
  let duedate = document.getElementById("duedate");
  let addtask = document. getElementById("addtask");
  let Pendingtasks = document.getElementById("pendingtasks");
  let completedtasks = document.getElementById("completedtasks");

  let taskslist=[];
  let editId = null;
  function rendertasks(){
    completedtasks.innerHTML="";
    Pendingtasks.innerHTML="";
    taskslist.forEach(task => {
      let li= document.createElement('li');
      li.className="list-group-item todo-item"
      li.innerHTML= `
          <div>
            <span class="${task.completed?"done":""}">
                ${task.id}.${task.title} - ${task.taskduedate}
            </span>
            <div>
                <button class="btn btn-success" onclick="completetask(${task.id})"> ${task.completed?"Undo":"Complete"}</button>
                <button class="btn btn-warning" onclick="edittask(${task.id})"  ${task.completed?"disabled":""} > Edit</button>
                <button  class="btn btn-danger" onclick="deletetask(${task.id})">Delete</button>
            </div>
        </div> `
        if(task.completed){
          completedtasks.appendChild(li) ;
           }
           else{
            Pendingtasks.appendChild(li);
           }
        
    });

   }
  function deletetask( id){
   taskslist= taskslist.filter(task => task.id!== id);
   console.log(taskslist);
   rendertasks();
  }

  function completetask(id){
    let existingtask= taskslist.find(task=> task.id === id);
    if(existingtask){
      existingtask.completed = !existingtask.completed;
    }
    rendertasks();
  }
  function edittask(id){
    let task= taskslist.find(task=> task.id === id);
    if(task){
       newtask.value= task.title;
       duedate.value = task.taskduedate;
       editId=id;
     
    }
  }
  todoForm.addEventListener("submit",function addtask(event){
    event.preventDefault();
    let taskname = newtask.value;
    let taskdate = duedate.value;
    if(taskname && taskdate){
    if(editId!=null){
      let task = taskslist.find(task=> task.id=== editId);
      if(task){
        task.title = taskname;
        task.taskduedate = taskdate;
        editId= null;
      }
    }
    else{
    let maxid=0;
    for (i=0;i<taskslist.length;i++){
      if (taskslist[i].id>maxid) {
        maxid=taskslist[i].id;
      }
    }
    maxid++;

     let newtsk={id:maxid ,title:taskname,taskduedate:taskdate,completed:false}
      taskslist.push(newtsk);
  }
      todoForm.reset();
      console.log(taskslist);
      rendertasks();
    }
    
  });

  window.deletetask=deletetask;
  window.completetask=completetask;
  window.edittask=edittask;

});