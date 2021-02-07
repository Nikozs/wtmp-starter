const today = "2021-02-09"; // new Date().toISOString().split('T')[0];
const dailyUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${today}`;

const parseSodexoMenu = (sodexoDailyMenu) => {
  const coursesEn = [];
  const coursesFi = [];
  const courses = Object.values(sodexoDailyMenu);

  for (const course of courses) {
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
  }
  return {fi: coursesFi, en: coursesEn};
};

const getDailyMenu = (menuData, lang, dayOfWeek = 0) => {
  let parsedMenu = {};
  let menu=[];
  try {
   parsedMenu = parseSodexoMenu(menuData.courses);
  menu=(lang === 'fi') ? parsedMenu.fi : parsedMenu.en;
  }
  catch (e)
  {
    console.log("error:" + e);
  }

    return menu;
};

const SodexoData = {getDailyMenu, dailyUrl};

export default SodexoData;
