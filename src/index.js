import SodexoData from "./modules/sodexo-data";
import FazerData from "./modules/fazer-data";
import { fetchGetJson } from "./modules/network";

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('./service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

let currentLang = "fi";

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

  await render();
};

init();
