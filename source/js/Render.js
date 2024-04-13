import getApi from "./api/activities/get.js";
import deleteApi from "./api/activities/delete.js";
import { deleteTask } from "./main.js";
import { ClickOnPencil } from "./main.js";
function setHtml(arrActivity, parent, number) {
  number.innerText = arrActivity.length;
  parent.innerHTML = arrActivity
    .map(function (type) {
      return `
      <div class="background">
        <div class="content">
            <div class="header-content">
                <div class="lettre">
                    <p> ${type.category}</p>
            
                    <h2>${type.title}</h2>
                </div>
                <div class="header-icon">
                    <div class="icon">
                        <img taskedit = "${type.id}" class="pencil" src="source/img/Edit.png" alt="pencil">
                        <img taskid="${type.id}" class="bin" src="source/img/Delete.png" alt="bin">
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
}
export default async function Render() {
  const Activities = await getApi();

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

  setHtml(todo, todoList, numberToDo);
  setHtml(doing, doingList, numberDoing);
  setHtml(done, doneList, numberDone);
  setHtml(block, blockList, numberBlock);

  deleteTask();
  ClickOnPencil();
}
