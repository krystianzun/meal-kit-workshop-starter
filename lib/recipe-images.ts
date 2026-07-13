// ============================================================================
// RECIPE PLACEHOLDER IMAGES
// Semi-accurate food photos hotlinked from TheMealDB (themealdb.com) — a
// free, no-API-key recipe database with a stable image CDN. Each URL was
// hand-matched to the closest-looking dish (the comment names the actual
// TheMealDB meal). To swap an image: search themealdb.com and replace the URL.
//
// Recipes without an entry here fall back to their emoji tile, so adding a
// new recipe never breaks the UI.
// ============================================================================

import { Recipe } from "./recipes";

export const RECIPE_IMAGES: Record<string, string> = {
  "chili-tofu-stirfry": "https://www.themealdb.com/images/media/meals/1525874812.jpg", // Ma Po Tofu
  "black-bean-tacos": "https://www.themealdb.com/images/media/meals/ypxvwv1505333929.jpg", // Crock Pot Chicken Baked Tacos
  "peanut-noodles": "https://www.themealdb.com/images/media/meals/rg9ze01763479093.jpg", // Pad Thai
  "lentil-bolognese": "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg", // Spaghetti Bolognese
  "chickpea-curry": "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg", // Dal fry
  "bbq-tempeh-bowl": "https://www.themealdb.com/images/media/meals/tytyxu1515363282.jpg", // Jerk chicken with rice & peas
  "seitan-fajitas": "https://www.themealdb.com/images/media/meals/tvtxpq1511464705.jpg", // Chickpea Fajitas
  "quinoa-veg-salad": "https://www.themealdb.com/images/media/meals/02s6gc1763799560.jpg", // Aubergine couscous salad
  "halloumi-burgers": "https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg", // Chicken & halloumi burgers
  "paneer-tikka": "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg", // Matar Paneer
  "caprese-gnocchi": "https://www.themealdb.com/images/media/meals/wspuvp1511303478.jpg", // Spinach & Ricotta Cannelloni
  "bean-quesadillas": "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg", // Chicken Enchilada Casserole
  "shakshuka": "https://www.themealdb.com/images/media/meals/g373701551450225.jpg", // Shakshuka
  "mushroom-risotto": "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg", // Salmon Prawn Risotto
  "miso-salmon": "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg", // Honey Teriyaki Salmon
  "shrimp-linguine": "https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg", // Chilli prawn linguine
  "fish-tacos": "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg", // Cajun spiced fish tacos
  "lemon-cod": "https://www.themealdb.com/images/media/meals/4yjart1763248459.jpg", // Pan-fried hake
  "tuna-poke": "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg", // Sushi
  "honey-garlic-chicken": "https://www.themealdb.com/images/media/meals/cj56fs1762340001.jpg", // Sticky Chicken
  "chicken-burrito-bowl": "https://www.themealdb.com/images/media/meals/fk80jp1763280767.jpg", // Chicken & chorizo rice pot
  "tuscan-chicken": "https://www.themealdb.com/images/media/meals/4htbtm1783803558.jpg", // Creamy Mustard Chicken
  "chicken-tikka-skewers": "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg", // Tandoori chicken
  "chicken-katsu": "https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg", // Katsu Chicken curry
  "greek-chicken-bowl": "https://www.themealdb.com/images/media/meals/k29viq1585565980.jpg", // Chicken Quinoa Greek Salad
  "buffalo-wraps": "https://www.themealdb.com/images/media/meals/jyylmo1763790808.jpg", // Cumin lamb wrap with slaw
  "smash-burgers": "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg", // Big Mac
  "beef-bibimbap": "https://www.themealdb.com/images/media/meals/z0ageb1583189517.jpg", // Beef Banh Mi Bowls
  "pork-carnitas": "https://www.themealdb.com/images/media/meals/cybyue1614349443.jpg", // Portuguese barbecued pork
  "spaghetti-meatballs": "https://www.themealdb.com/images/media/meals/72fgzj1764109947.jpg", // Lamb & apricot meatballs
  "steak-fajita-skillet": "https://www.themealdb.com/images/media/meals/kyuxew1763479470.jpg", // Thai beef stir-fry
  "lamb-kofta": "https://www.themealdb.com/images/media/meals/04axct1763793018.jpg", // Adana kebab
  "berry-overnight-oats": "https://www.themealdb.com/images/media/meals/sng9bm1765320170.jpg", // Cornmeal porridge
  "chia-mango-pudding": "https://www.themealdb.com/images/media/meals/8hx4fi1780087744.jpg", // Mango chow
  "green-smoothie-bowl": "https://www.themealdb.com/images/media/meals/io2u3z1779551885.jpg", // Haft Mewa (fruit bowl)
  "tofu-scramble": "https://www.themealdb.com/images/media/meals/0nswfe1763279040.jpg", // Pisto con huevos
  "yogurt-granola-pots": "https://www.themealdb.com/images/media/meals/hyk47c1762772689.jpg", // Sour cream porridge pot
  "spinach-feta-omelette": "https://www.themealdb.com/images/media/meals/yvpuuy1511797244.jpg", // French Omelette
  "banana-pancakes": "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg", // Pancakes
  "salmon-bagels": "https://www.themealdb.com/images/media/meals/1550440197.jpg", // Salmon Eggs Benedict
  "breakfast-burritos": "https://www.themealdb.com/images/media/meals/xd9aj21740432378.jpg", // Migas
  "rainbow-grain-bowl": "https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg", // Koshari
  "falafel-pitas": "https://www.themealdb.com/images/media/meals/ae6clc1760524712.jpg", // Falafel Pita Sandwich
  "miso-soba-soup": "https://www.themealdb.com/images/media/meals/ip5xtp1769779958.jpg", // Ramen Noodles
  "caprese-panini": "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg", // Grilled cheese sandwich
  "halloumi-quinoa-salad": "https://www.themealdb.com/images/media/meals/bqx8mc1782684286.jpg", // Shopska Salad
  "tuna-nicoise": "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg", // Tuna Nicoise
  "chicken-caesar-wraps": "https://www.themealdb.com/images/media/meals/hcg6l91763596970.jpg", // Chicken Shawarma
  "steak-chimichurri-salad": "https://www.themealdb.com/images/media/meals/st9shl1763755808.jpg", // Steak & noodle salad
};

/** Image URL for a recipe, if one has been matched.
 *  (Full-size images — TheMealDB's {url}/preview thumbnails exist but are
 *  generated on the fly and load far slower than the cached originals.) */
export function recipeThumb(recipe: Recipe): string | undefined {
  return RECIPE_IMAGES[recipe.id];
}
