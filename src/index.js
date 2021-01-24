//import LunchMenu from "./assets/sodexo-day-example.json";
import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';

var ruokalista = document.querySelector(".ruokalista");
var ruokalistafazer = document.querySelector(".ruokalistafazer");


let currentLang = "FI";

SodexoData.coursesFi.forEach(function (ruoka) {
  ruokalista.innerHTML += "<li>" + ruoka + "</li>";
});

document.getElementsByClassName("ruokalista").innerHTML = ruokalista;

FazerData.fazercoursesFi.forEach(function (ruoka) {
  ruokalistafazer.innerHTML += "<li>" + ruoka + "</li>";
});

document.getElementsByClassName("ruokalistafazer").innerHTML = ruokalistafazer;

const printMenu = (menu) => {
  ruokalista.innerHTML = "";
  menu.forEach(function (ruoka) {
    ruokalista.innerHTML += "<li>" + ruoka + "</li>";
  });
};

const printFazerMenu = (menu) => {
  ruokalistafazer.innerHTML = "";
  menu.forEach(function (ruoka) {
    ruokalistafazer.innerHTML += "<li>" + ruoka + "</li>";
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
      printMenu(SodexoData.coursesEn);
      printFazerMenu(FazerData.fazercoursesEn);
      currentLang = "EN";
      break;
    case "FI":
      printMenu(SodexoData.coursesFi);
      printFazerMenu(FazerData.fazercoursesFi);
      currentLang = "FI";
      break;
    default:
      printFi();
  }
};

let currentDirection = "ASC";

const sortArrayAlpha = (menu, direction) => {
  if (direction === "ASC") {
    return menu.sort();
  } else if (direction === "DESC") {
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
    let menu = sortArrayAlpha(SodexoData.coursesFi, currentDirection);
    printMenu(menu);
    let fmenu = sortArrayAlpha(FazerData.fazercoursesFi, currentDirection);
    printFazerMenu(fmenu);
  } else {
    let menu = sortArrayAlpha(SodexoData.coursesEn, currentDirection);
    printMenu(menu);
    let fmenu = sortArrayAlpha(FazerData.fazercoursesEn, currentDirection);
    printFazerMenu(fmenu);
  }
};

 const pickRandomDish = () => {
  if (currentLang == "EN") {
    var dish = SodexoData.coursesEn[Math.floor(Math.random() * SodexoData.coursesEn.length)];
    var dishf = FazerData.fazercoursesEn[Math.floor(Math.random() * FazerData.fazercoursesEn.length)];
  } else {
    var dish = SodexoData.coursesFi[Math.floor(Math.random() * SodexoData.coursesFi.length)];
    var dishf = FazerData.fazercoursesFi[Math.floor(Math.random() * FazerData.fazercoursesFi.length)];
  }
  alert("Metropolia: "+dish+ "\r\n\r\nFazer: "+dishf);
};


const valitsekieliFi = () => {
  valitsekieli('FI');
};

const valitsekieliEn = () => {
  valitsekieli('EN');
};

const init = () => {
  document.querySelector('#sortBtn').addEventListener('click',sortAlphabetically);
  document.querySelector('#randomBtn').addEventListener('click',pickRandomDish);
  document.querySelector('#myDropdownbtn').addEventListener('click',myFunction);
  document.querySelector('#LangFi').addEventListener('click',valitsekieliFi);
  document.querySelector('#LangEn').addEventListener('click',valitsekieliEn);
  valitsekieli(currentLang);
};

init();
