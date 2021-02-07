const weeklyUrlFi = 'https://www.fazerfoodco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=2020-01-14';
const weeklyUrlEn = 'https://www.fazerfoodco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=2020-01-14';

const parseDailyMenu = (menuData, dayOfWeek) => {

  let dailyMenu = menuData.LunchMenus[dayOfWeek].SetMenus.map(setMenu => {
    let mealName = setMenu.Name;
    let dishes = setMenu.Meals.map(dish => {
      return `${dish.Name} (${dish.Diets.join(', ')})`;
    });
    return mealName ? `${mealName}: ${dishes.join(', ')}` : dishes.join(', ');
  });
  return dailyMenu;
};


const getDailyMenu = (menuData, lang, dayOfWeek = 1) => {
  let menu= [];
  try {
  dayOfWeek -= 1;
  if (dayOfWeek === -1) {
    dayOfWeek = 0;
  }
 menu =parseDailyMenu(menuData, dayOfWeek);
}
catch (e)
{
  console.log("error:" + e);
}
  return menu;
};

const FazerData = {getDailyMenu, weeklyUrlFi, weeklyUrlEn};

export default FazerData;
