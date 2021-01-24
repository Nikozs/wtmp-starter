import FazerLunchMenuEng from "../assets/fazer-week-example-en.json";
import FazerLunchMenuFin from "../assets/fazer-week-example.json";

let fazercoursesEn = [];
let fazercoursesFi = [];

const parseFazerMenuEng = (fazerDailyMenu) => {
   const fazLunchMenus = Object.values(fazerDailyMenu);

   for (const days of fazLunchMenus[1]) {
     for (const Menus of  Object.values(days.SetMenus)){
       for (const Meal of Menus.Meals){
     const meal=Object.entries(Meal);
     fazercoursesEn.push(Meal.Name);
       }
     }
   }
};

const parseFazerMenuFin = (fazerDailyMenu) => {
  const fazLunchMenus = Object.values(fazerDailyMenu);
  for (const days of fazLunchMenus[1]) {
    for (const Menus of  Object.values(days.SetMenus)){
      for (const Meal of Menus.Meals){
    const meal=Object.entries(Meal);
    fazercoursesFi.push(Meal.Name);
      }
    }

  }
};

parseFazerMenuEng(FazerLunchMenuEng);
parseFazerMenuFin(FazerLunchMenuFin);

const FazerData = { fazercoursesEn, fazercoursesFi };
export default FazerData;
