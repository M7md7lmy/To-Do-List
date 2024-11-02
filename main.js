const container = document.querySelector(".container");
const button = document.querySelector(".add-Btn");
const form = document.querySelector("form");
const input = document.querySelector(".input");


// I used form and submet event because it's the best practice
form.addEventListener("submit", (eo) => {
  eo.preventDefault();
  const content = `
   <div class="task">
      <span class="icon-star icon"> </span>
      <p class="task-text">${input.value}</p>
      <div>
        <span class="icon-trash-o icon"> </span>
        <span class="icon-angry2 icon"> </span>
      </div>
    `;

  container.innerHTML += content;
  input.value = "";
});

// Delete Task when i click on the trash , add heart and line above words

// container.style.border = "5px solid red"; It's a parent

container.addEventListener("click", (eo) => {
  // Using If statement

  // if (eo.target.className == "icon-trash-o icon") {
  //   eo.target.parentElement.parentElement.remove();
  // } else if (eo.target.className == "icon-angry2 icon") {
  //   eo.target.classList.replace("icon-angry2", "icon-heart");
  //   eo.target.parentElement.parentElement
  //     .getElementsByClassName("task-text")[0]
  //     .classList.add("finish");
  // } else if (eo.target.className == "icon-heart icon") {
  //   eo.target.parentElement.parentElement
  //     .getElementsByClassName("task-text")[0]
  //     .classList.remove("finish");
  //   console.log("hi");
  //   eo.target.classList.replace("icon-heart", "icon-angry2");
  // } else if (eo.target.className == "icon-star icon") {
  //   eo.target.classList.add("orange");
  //   container.prepend(eo.target.parentElement);
  // }else if(eo.target.className == "icon-star icon orange"){
  //   eo.target.classList.remove("orange");
  //   container.append(eo.target.parentElement);
  // }

  // Using Switch case statement

  switch (eo.target.className) {
    case "icon-trash-o icon":
      eo.target.parentElement.parentElement.remove();
      break;
    case "icon-angry2 icon":
      eo.target.classList.replace("icon-angry2", "icon-heart");
      eo.target.parentElement.parentElement
        .getElementsByClassName("task-text")[0]
        .classList.add("finish");
      break;
    case "icon-heart icon":
      eo.target.parentElement.parentElement
        .getElementsByClassName("task-text")[0]
        .classList.remove("finish");
      console.log("hi");
      eo.target.classList.replace("icon-heart", "icon-angry2");
      break;
    case "icon-star icon":
      eo.target.classList.add("orange");
      container.prepend(eo.target.parentElement);
      break;
    case "icon-star icon orange":
      eo.target.classList.remove("orange");
      container.append(eo.target.parentElement);
      break;
  }
});
