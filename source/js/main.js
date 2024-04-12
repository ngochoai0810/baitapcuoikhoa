import getApi from "./api/activities/get.js";
import postActivity from "./api/activities/post.js";
import deleteApi from "./api/activities/delete.js";

function Task(category, title, description, type) {
  const newDate = new Date();
  const hours = newDate.getHours();
  const minute = newDate.getMinutes();
  const datee = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  this.category = category;
  this.title = title;
  this.description = description;
  this.type = type;
  this.time = `${hours}:${minute} ${datee}/${month}/${year}`;
}

function DeleteTask(title) {
  for (let i = 0; i < Activities.length; i++) {
    if (Activities[i].title === title) {
      Activities.splice(i, 1);

      return true;
    }
  }
  console.log("Khong xoa duoc task");
  return false;
}

function EditTask(title, NewTitle, NewDescription, NewCategory, NewType) {
  for (let i = 0; i < Activities.length; i++) {
    if (Activities[i].title === title) {
      Activities[i].title = NewTitle;
      Activities[i].description = NewDescription;
      Activities[i].category = NewCategory;
      Activities[i].type = NewType;

      return true;
    }
  }

  return false;
}

export async function Render() {
  const Activities = await getApi();
  const CloseTask = await deleteApi();
  const todoHtml = document.querySelector("#todo");
  const numberToDo = todoHtml.querySelector(".number");
  const doingHtml = document.querySelector("#doing");
  const numberDoing = doingHtml.querySelector(".number");
  const doneHtml = document.querySelector("#done");
  const numberDone = doneHtml.querySelector(".number");
  const blockHtml = document.querySelector("#block");
  const numberBlock = blockHtml.querySelector(".number");
  const todoList = document.querySelector(".todo-list");
  const doingList = document.querySelector(".doing-list");
  const doneList = document.querySelector(".done-list");
  const blockList = document.querySelector(".block-list");

  const todo = Activities.filter((task) => task.type === "todo");
  const doing = Activities.filter((task) => task.type === "doing");
  const done = Activities.filter((task) => task.type === "done");
  const block = Activities.filter((task) => task.type === "block");

  numberToDo.innerText = todo.length;

  numberDoing.innerText = doing.length;

  numberDone.innerText = done.length;

  numberBlock.innerText = block.length;

  doingList.innerHTML = doing
    .map(function (type) {
      return `<div class="background">
    <div class="content">
        <div class="header-content">
            <div class="lettre">
                <p> ${type.category}</p>
       
                <h2>${type.title}</h2>
            </div>
            <div class="header-icon">
                <div class="icon">
                    <img class="pencil" src="source/img/Edit.png" alt="pencil">
                    <img class="bin" src="source/img/Delete.png" alt="bin">
                </div>
            </div>
        </div>
        <div class="line-grey"></div>
        <div class="main-content">
            <p>${type.description} </p>
            <div class="clock">
                <img src="source/img/Vector.png" alt="clock">
                <p>${type.time}</p>
            </div>
        </div>
    </div>
</div>`;
    })
    .join(" ");

  todoList.innerHTML = todo
    .map(function (type) {
      return `<div class="background">
  <div class="content">
      <div class="header-content">
          <div class="lettre">
              <p> ${type.category}</p>
        
              <h2>${type.title}</h2>
          </div>
          <div class="header-icon">
              <div class="icon">
                  <img class="pencil" src="source/img/Edit.png" alt="pencil">
                  <img class="bin" src="source/img/Delete.png" alt="bin">
              </div>
          </div>
      </div>
      <div class="line-grey"></div>
      <div class="main-content">
          <p>${type.description} </p>
          <div class="clock">
              <img src="source/img/Vector.png" alt="clock">
              <p>${type.time}</p>
          </div>
      </div>
  </div>
</div>`;
    })
    .join(" ");

  doneList.innerHTML = done
    .map(function (type) {
      return `<div class="background">
    <div class="content">
        <div class="header-content">
            <div class="lettre">
                <p> ${type.category}</p>
        
                <h2>${type.title}</h2>
            </div>
            <div class="header-icon">
                <div class="icon">
                    <img class="pencil" src="source/img/Edit.png" alt="pencil">
                    <img class="bin" src="source/img/Delete.png" alt="bin">
                </div>
            </div>
        </div>
        <div class="line-grey"></div>
        <div class="main-content">
            <p>${type.description} </p>
            <div class="clock">
                <img src="source/img/Vector.png" alt="clock">
                <p>${type.time}</p>
            </div>
        </div>
    </div>
</div>`;
    })
    .join(" ");

  blockList.innerHTML = block
    .map(function (typesxx) {
      return `<div class="background">
    <div class="content">
        <div class="header-content">
            <div class="lettre">
                <p> ${typesxx.category}</p>
             
                <h2>${typesxx.title}</h2>
            </div>
            <div class="header-icon">
                <div class="icon">
                    <img class="pencil" src="source/img/Edit.png" alt="pencil">
                    <img class="bin" src="source/img/Delete.png" alt="bin">
                </div>
            </div>
        </div>
        <div class="line-grey"></div>
        <div class="main-content">
            <p>${typesxx.description} </p>
            <div class="clock">
                <img src="source/img/Vector.png" alt="clock">
                <p>${typesxx.time}</p>
            </div>
        </div>
    </div>
</div>`;
    })
    .join(" ");
}
Render();

async function AddNewTask() {
  document.querySelector(".button-add").addEventListener("click", function () {
    const addcategory = document.querySelector(".add-category").value;
    const addtitle = document.querySelector(".add-title").value;
    const adddescription = document.querySelector(".add-description").value;
    const newTask = new Task(addcategory, addtitle, adddescription, "todo");

    postActivity(newTask);
    Render();
  });
}
AddNewTask();
function AddForm() {
  const addForm = document.querySelector(".modal-background");
  document
    .querySelector("#ButtonNewTask")
    .addEventListener("click", function () {
      addForm.style.display = "flex";
    });
}
AddForm();

function closeForm() {
  const closeForm = document.querySelector(".modal-background");
  document.querySelector(".back-ground").addEventListener("click", function () {
    closeForm.style.display = "none";
  });
}
closeForm();

function deleteTask() {
  Render();
  document.querySelectorAll(".bin").forEach((bin) => {
    bin.addEventListener("click", async function (event) {
      console.log(1);
      // const taskId = event.target.id.replace("bin", "");
      // const response = await deleteApi(taskId);

      // if (response.ok) {
      //   document.getElementById("task" + taskId).remove();
      //   console.log("Congratulation");
      // }
    });
  });
}
deleteTask();
