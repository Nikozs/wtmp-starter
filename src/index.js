const menu = [
  {name: 'Lingonberry jam', price: 4.00},
  {name: 'Mushroom and bean casserole', price: 5.50},
  {name: 'Chili-flavoured wheat', price: 3.00},
  {name: 'Vegetarian soup', price: 4.80},
  {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00}
];

const validateMealName = (mealName) => {
  const namePattern = /^[A-ZÅÄÖ]{1}[a-zåäöA-ZÅÄÖ0-9\-\ \/,()]{3,63}$/;
  return namePattern.test(mealName);
};

console.log('mealname is valid:', validateMealName('Vegetarian soup'));

for (const item of Object.values(menu)) {
  console.log('Meal name: ' + item.name + ' is valid:', validateMealName(item.name));
}


const sortMenu = (menu) => {
  const sortedMenu = menu.sort((a, b) => a.price - b.price);
  return sortedMenu;
};
console.log('Sorted menu', sortMenu(menu));


const filterMealsByPriceLimit = (menu, priceLimit) => {
  return menu.filter(item => item.price < priceLimit);
};
console.log('Filtered menu', filterMealsByPriceLimit(menu, 5));


const raisePricesByPercent = (menu, percent) => {
  return menu.map(item => {
    return {
      name: item.name,
      price: item.price * (1 + percent / 100)
    };
  });
};
console.log('Price raised:', raisePricesByPercent(menu, 15));


const calculateMenuTotalPrice = (menu) => {
  return menu.reduce((a, b) => {
    return {price: a.price + b.price};
  });
};
console.log('Total cost', calculateMenuTotalPrice(menu));


import FazerMenu from './assets/fazer-week-example.json';
console.log('FazerMenu', FazerMenu);

const selectVegeMeals = (menuData) => {
  let vegeMeals = [];
  console.log(menuData.LunchMenus[0].SetMenus);
  for (const setMenu of menuData.LunchMenus[0].SetMenus) {
    console.log(setMenu);
    for (const meal of setMenu.Meals) {
      if (meal.Diets.includes('Veg')) {
        vegeMeals.push(meal.Name);
      }
    }
  }
  return vegeMeals;
};
console.log('test vege meal function', selectVegeMeals(FazerMenu));
