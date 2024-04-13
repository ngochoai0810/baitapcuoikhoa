import postActivity from "./api/activities/post.js";
import deleteApi from "./api/activities/delete.js";
import Render from "./Render.js";
import getActivities from "./api/activities/getApibyID.js";
import editApi from "./api/activities/edit.js";
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

// function EditTask(title, NewTitle, NewDescription, NewCategory, NewType) {
//   for (let i = 0; i < Activities.length; i++) {
//     if (Activities[i].title === title) {
//       Activities[i].title = NewTitle;
//       Activities[i].description = NewDescription;
//       Activities[i].category = NewCategory;
//       Activities[i].type = NewType;

//       return true;
//     }
//   }

//   return false;
// }

Render();

function AddNewTask() {
  document
    .querySelector(".button-add")
    .addEventListener("click", async function () {
      const addcategory = document.querySelector(".add-category");
      const addtitle = document.querySelector(".add-title");
      const adddescription = document.querySelector(".add-description");
      const closeForm = document.querySelector(".modal-background");
      const newTask = new Task(
        addcategory.value,
        addtitle.value,
        adddescription.value,
        "todo"
      );
      if (
        addcategory.value === "" ||
        addtitle.value === "" ||
        adddescription.value === ""
      ) {
        if (addcategory.value === "") {
          addcategory.style.border = "1px solid red";
        }
        if (addtitle.value === "") {
          addtitle.style.border = "1px solid red";
        }
        if (adddescription.value === "") {
          adddescription.style.border = "1px solid red";
        }
        return;
      } else {
        await postActivity(newTask);
        await Render();
        closeForm.style.display = "none";
      }
    });
}

AddNewTask();

function AddForm() {
  const addForm = document.querySelector(".modal-background");
  const activeStatus = document.querySelector(".active-status");
  document
    .querySelector("#ButtonNewTask")
    .addEventListener("click", function () {
      addForm.style.display = "flex";
      activeStatus.style.display = "none";
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
function closeEditForm() {
  const editForm = document.querySelector(".edit-task-form");
  document.querySelector(".bgredit").addEventListener("click", function () {
    editForm.style.display = "none";
  });
}
closeEditForm();

export async function deleteTask() {
  const bin = document.querySelectorAll(".bin");

  bin.forEach((bin) => {
    bin.addEventListener("click", async function (event) {
      const taskId = event.target.getAttribute("taskid");

      const response = await deleteApi(taskId);
      Render();
    });
  });
}
export async function ClickOnPencil() {
  const pencil = document.querySelectorAll(".pencil");
  const EditTask = document.querySelector(".edit-task-background");
  const editTaskBackground = document.querySelector(".edit-task-background");
  const activeStatus = document.querySelector(".active-status");
  const editForm = document.querySelector(".edit-task-form");
  pencil.forEach((pencil) => {
    pencil.addEventListener("click", async function (event) {
      editForm.style.display = "flex";
      activeStatus.style.display = "flex";
      const taskedit = event.target.getAttribute("taskedit");
      const task = await getActivities(taskedit);
      console.log(task);
      const editTaskBackground = document.querySelector(
        ".edit-task-background"
      );
      const editcategory = editTaskBackground.querySelector(".add-category");
      const edittitle = editTaskBackground.querySelector(".add-title");
      const editdescription =
        editTaskBackground.querySelector(".add-description");

      editcategory.value = task.category;
      edittitle.value = task.title;
      editdescription.value = task.description;
      switch (task.type) {
        case "todo":
          const input1 = editTaskBackground.querySelector("#html");
          input1.checked = true;
          break;
        case "doing":
          const input2 = editTaskBackground.querySelector("#css");
          input2.checked = true;
          break;
        case "done":
          const input3 = editTaskBackground.querySelector("#javascript");
          input3.checked = true;
          break;
      }

      if (EditTask) {
        editTaskBackground
          .querySelector(".button-add")
          .addEventListener("click", async function () {
            const input = editTaskBackground.querySelector(
              'input[type="radio"]:checked'
            );
            const newTask = new Task(
              editcategory.value,
              edittitle.value,
              editdescription.value,
              input.value
            );
            await editApi(task.id, newTask);
            console.log(newTask);
            await Render();
            editForm.style.display = "none";
          });
      }
    });
  });
}
