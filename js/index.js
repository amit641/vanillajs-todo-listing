const todoList = document.querySelector("#todo-list");
const fetchTodoList = () => {
  return fetch("https://dummyjson.com/todos?limit=10&skip=80")
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data);
      renderTodoList(formatTodoList(data.todos));
    })
    .catch((error) => console.log(error));
};

function checkTodo(val) {
  let status = "false";
  val ? (status = "Completed") : (status = "Not Completed");
  return status;
}

// function to segregate data based on userId
function formatTodoList(data) {
  let todoList = [];
  let userIds = [];
  data.forEach((todoItem) => {
    if (userIds.indexOf(todoItem.userId) === -1) {
      userIds.push(todoItem.userId);
      todoList.push({ ...todoItem, todo: [todoItem.todo] });
    } else {
      todoList[userIds.indexOf(todoItem.userId)].todo.push(todoItem.todo);
    }
  });
  return todoList;
}

function renderTodoList(data) {
  console.log("formatTodoList: ", formatTodoList(data));
  todoList.innerHTML = "";
  const todoContent = data.map((todo) => {
    let todoTextContent = todo.todo.map((item) => {
      return `<div class="list-item__title">${item}</div>`;
    });
    return `<li class="list-item">
     <div class="list-item__title">UserId # ${todo.userId}</div>
        ${todoTextContent.join("")}`;
  });
  todoList.innerHTML = todoContent.join("");
}

fetchTodoList();
