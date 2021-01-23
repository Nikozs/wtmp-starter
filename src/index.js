import LunchMenu from "./assets/sodexo-day-example.json";

var ruokalista = document.querySelector(".ruokalista");

let coursesEn = [];
let coursesFi = [];

let currentLang = "FI";

coursesFi.forEach(function (ruoka) {
  ruokalista.innerHTML += "<li>" + ruoka + "</li>";
});

document.getElementsByClassName("ruokalista").innerHTML = ruokalista;

const printMenu = (menu) => {
  ruokalista.innerHTML = "";
  menu.forEach(function (ruoka) {
    ruokalista.innerHTML += "<li>" + ruoka + "</li>";
  });
};

const myFunction = () => {
  document.getElementById("myDropdown").classList.toggle("show");
};

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const valitsekieli = (lang) => {
  switch (lang) {
    case "EN":
      printMenu(coursesEn);
      currentLang = "EN";
      break;
    case "FI":
      printMenu(coursesFi);
      currentLang = "FI";
      break;
    default:
      printFi();
  }
};

let currentDirection = "ASC";

const sortArrayAlpha = (menu, direction) => {
  if (currentDirection === "ASC") {
    return menu.sort();
  } else if (currentDirection === "DESC") {
    return menu.reverse();
  }
};

const sortAlphabetically = () => {
  if (currentDirection === "ASC") {
    currentDirection = "DESC";
  } else {
    currentDirection = "ASC";
  }

  if (currentLang == "FI") {
    let menu = sortArrayAlpha(coursesFi, currentDirection);
    printMenu(menu);
  } else {
    let menu = sortArrayAlpha(coursesEn, currentDirection);
    printMenu(menu);
  }
};

 const pickRandomDish = () => {
  if (currentLang == "EN") {
    var dish = coursesEn[Math.floor(Math.random() * coursesEn.length)];
  } else {
    var dish = coursesFi[Math.floor(Math.random() * coursesFi.length)];
  }
  alert(dish);
};

const parseSodexoMenu = (sodexoDailyMenu) => {
  const courses = Object.values(sodexoDailyMenu);
  for (const course of courses) {
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
  }
};

const valitsekieliFi = () => {
  valitsekieli('FI');
};

const valitsekieliEn = () => {
  valitsekieli('EN');
};

const init = () => {
  parseSodexoMenu(LunchMenu.courses);
  document.querySelector('#sortBtn').addEventListener('click',sortAlphabetically);
  document.querySelector('#randomBtn').addEventListener('click',pickRandomDish);
  document.querySelector('#myDropdownbtn').addEventListener('click',myFunction);
  document.querySelector('#LangFi').addEventListener('click',valitsekieliFi);
  document.querySelector('#LangEn').addEventListener('click',valitsekieliEn);
  valitsekieli(currentLang);
};

init();
