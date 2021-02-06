import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

let currentLang = 'fi';

/**
 * Displays lunch menu items as html list
 *
 * @param {Array} menuData - Lunch menu array
 * @param {string} restaurant - element target id
 */
const renderMenu = (menuData, restaurant) => {
  const list = document.querySelector('#' + restaurant);
  list.innerHTML = '';
  for (const item of menuData) {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  }
};

/**
 * Switch app lang en/fi
 */
const switchLanguage = () => {
  if (currentLang === 'fi') {
    currentLang = 'en';
  } else {
    currentLang = 'fi';
  }
  renderMenu(SodexoData.getDailyMenu(currentLang), 'sodexo');
  renderMenu(FazerData.getDailyMenu(currentLang), 'fazer');
  console.log('change language to: ', currentLang);
};

/**
 * Sorts menu alphapetically
 *
 * @param {Array} menu
 * @param {string} order
 * @returns Sorted menu array
 */
const sortMenu = (menu, order) => {
  if (order == 'DESC') {

  console.log('ord: ' + order);
    return menu.sort().reverse();
  } else {

  console.log('ord: ' + order);
    return menu.sort();
  }

};

/**
 * Eventhandler for sort menu button
 */
let currentDirection = "ASC";
const renderSortedMenu = () => {

  if (currentDirection === "ASC") {
    currentDirection = "DESC";
  } else {
    currentDirection = "ASC";
  }
console.log('curr: ' + currentDirection);
    renderMenu(sortMenu(SodexoData.getDailyMenu(currentLang), currentDirection), 'sodexo');
    renderMenu(sortMenu(FazerData.getDailyMenu(currentLang), currentDirection), 'fazer');
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

const displayRandomDish = () => {
  alert(pickRandomDish(SodexoData.getDailyMenu(currentLang)));
};


const init = () => {
  document.querySelector('#switchBtn').addEventListener('click', switchLanguage);
  document.querySelector('#sortBtn').addEventListener('click', renderSortedMenu);
  document.querySelector('#randomBtn').addEventListener('click', displayRandomDish);
  renderMenu(SodexoData.getDailyMenu(currentLang), 'sodexo');
  renderMenu(FazerData.getDailyMenu(currentLang), 'fazer');
};

init();
