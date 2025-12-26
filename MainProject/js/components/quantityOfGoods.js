import { getGoodsFromServer } from "./getGoodsFromServer.js";

export async function quantityInCategory(elem, category) {
  const data = await getGoodsFromServer();
  let sum = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].type.includes(category)) {
        sum++;
      }
    }
    elem.textContent = sum;
    return
}