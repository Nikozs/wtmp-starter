import SodexoData from "./modules/sodexo-data";
import FazerData from "./modules/fazer-data";
import { fetchGetJson } from "./modules/network";

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
 }

let currentLang = "fi";

const userSettings = {
theme: 'light'
};

let defval=localStorage.getItem('userConfig');
if (!defval) {
    localStorage.setItem('userConfig', JSON.stringify(userSettings));
};


const updateSettings = () => {
  localStorage.setItem('userConfig', JSON.stringify(userSettings));
};


const toggleTheme = () => {
  if (JSON.parse(localStorage.getItem('userConfig')).theme == "light") {

    userSettings.theme = 'dark';
    document.body.classList = "dark-theme";

    updateSettings();

    console.log('toggleTheme userSettings theme should be dark: ' + JSON.stringify(userSettings));
    console.log('toggleTheme userConfig theme should be dark: ' +JSON.parse(localStorage.getItem('userConfig')).theme);
  } else {

    userSettings.theme = 'light';
    document.body.classList = "";

    updateSettings();

    console.log('toggleTheme userSettings theme should be light: ' + JSON.stringify(userSettings));
    console.log('toggleTheme userConfig theme should be light: ' +JSON.parse(localStorage.getItem('userConfig')).theme);
  }
  // render();
};













/**
 * Displays lunch menu items as html list
 *
 * @param {Array} menuData - Lunch menu array
 * @param {string} restaurant - element target id
 */
const renderMenu = (menuData, restaurant) => {
  const list = document.querySelector("#" + restaurant);
  list.innerHTML = "";
  for (const item of menuData) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  }
};

/**
 * Switch app lang en/fi
 */
const switchLanguage = (parsedMenu) => {
  if (currentLang === "fi") {
    currentLang = "en";
  } else {
    currentLang = "fi";
  }
  render();
  console.log("change language to: ", currentLang);
};

/**
 * Sorts menu alphapetically
 *
 * @param {Array} menu
 * @param {string} order
 * @returns Sorted menu array
 */
const sortMenu = (menu, order) => {
  if (order == "DESC") {
    return menu.sort().reverse();
  } else {
    return menu.sort();
  }
};

/**
 * Eventhandler for sort menu button
 */
let currentDirection = "ASC";
const renderSortedMenu = async () => {
  if (currentDirection === "ASC") {
    currentDirection = "DESC";
  } else {
    currentDirection = "ASC";
  }
  await render();
};

/**
 * Picks a random dish from lunch menu array
 *
 * @param {Array} menu
 * @returns string dish name
 */
const pickRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random() * menu.length);
  return menu[randomIndex];
};

const displayRandomDish = async () => {
  const dailyMenuJson = await fetchGetJson(SodexoData.dailyUrl);
  alert(pickRandomDish(SodexoData.getDailyMenu(dailyMenuJson, currentLang)));
};

const render = async () => {
  try {
    const dailyMenuJson = await fetchGetJson(SodexoData.dailyUrl);
    const parsedMenu = SodexoData.getDailyMenu(dailyMenuJson, currentLang);
    renderMenu(sortMenu(parsedMenu, currentDirection), "sodexo");
  } catch (error) {
    console.error(error);
    alert("Error getting sodexo data");
  }

  try {
    let weeklyMenuJson = "";

    if (currentLang == "en") {
      weeklyMenuJson = await fetchGetJson(FazerData.weeklyUrlEn, true);
    } else {
      weeklyMenuJson = await fetchGetJson(FazerData.weeklyUrlFi, true);
    }

    // Get number of the weekday (0: Sun, 1: Mon, etc.)
    const weekDay = new Date().getDay();
    const parsedMenu = FazerData.getDailyMenu(
      weeklyMenuJson,
      currentLang,
      weekDay
    );
    renderMenu(sortMenu(parsedMenu, currentDirection), "fazer");
  } catch (error) {
    console.error(error);
    alert("Error getting fazer data");
  }
};
   if (JSON.parse(localStorage.getItem('userConfig')).theme == "dark") {
      document.body.classList = "dark-theme";
    } else {
      document.body.classList = "";
    };
const init = async () => {
  document
    .querySelector("#switchBtn")
    .addEventListener("click", switchLanguage);
  document
    .querySelector("#sortBtn")
    .addEventListener("click", renderSortedMenu);
  document
    .querySelector("#randomBtn")
    .addEventListener("click", displayRandomDish);
  document
    .querySelector("#toggleTheme")
    .addEventListener("click", toggleTheme);

  await render();
};

init();





/* draggable grid items */
document.addEventListener('DOMContentLoaded', (event) => {

  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
    console.log(items);
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';

    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }


  let items = document.querySelectorAll('.grid-item');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
console.log(items);
});
