ruokalista = document.querySelector(".ruokalista");

const coursesEn = [
  "Hamburger, cream sauce and poiled potates",
  "Goan style fish curry and whole grain rice",
  "Vegan Chili sin carne and whole grain rice",
  "Broccoli puree soup, side salad with two napas",
  "Lunch baguette with BBQ-turkey filling",
  "Cheese / Chicken / Vege / Halloum burger and french fries",
];

const coursesFi = [
  "Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
  "Goalaista kalacurrya ja täysjyväriisiä",
  "vegaani Chili sin carne ja täysjyväriisi",
  "Parsakeittoa,lisäkesalaatti kahdella napaksella",
  "Lunch baguette with BBQ-turkey filling",
  "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset",
];

let currentLang = "FI";

coursesFi.forEach(function (ruoka) {
  ruokalista.innerHTML += "<li>" + ruoka + "</li>";
});

document.getElementsByClassName("ruokalista").innerHTML = ruokalista;

printMenu = (menu) => {
  ruokalista.innerHTML = "";
  menu.forEach(function (ruoka) {
    ruokalista.innerHTML += "<li>" + ruoka + "</li>";
  });
};

myFunction = () => {
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

valitsekieli = (lang) => {
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

sortArrayAlpha = (menu, direction) => {
  if (currentDirection === "ASC") {
    return menu.sort();
  } else if (currentDirection === "DESC") {
    return menu.reverse();
  }
};

sortAlphabetically = () => {
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

pickRandomDish = () => {
  var dish = coursesFi[Math.floor(Math.random() * coursesFi.length)];
  alert(dish);
};
