import FazerLunchMenuEng from "../assets/fazer-week-example-en.json";
import FazerLunchMenuFin from "../assets/fazer-week-example.json";

let fazercoursesEn = [];
let fazercoursesFi = [];

const getDailyMenu = (lang, dayOfWeek = 0) => {
  return (lang === 'fi') ?
    parseDailyMenu(FazerLunchMenuFin, dayOfWeek)
    :
    parseDailyMenu(FazerLunchMenuEng, dayOfWeek);
};

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




const FazerData = { fazercoursesEn, fazercoursesFi, getDailyMenu };
export default FazerData;
