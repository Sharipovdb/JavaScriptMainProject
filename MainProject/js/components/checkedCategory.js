import { getGoodsFromServer } from "./getGoodsFromServer.js";
import { renderGoodCards } from "./getGoods.js";

export async function FilterCategory() {
  const checkedCategoryList = [];
  const isPendantChecked = document.querySelector('#pendant').checked;
  if (isPendantChecked) {
    checkedCategoryList.push('pendant');
  }
  const isCeilingChecked = document.querySelector('#ceiling').checked;
  if (isCeilingChecked) {
    checkedCategoryList.push('ceiling');
  }
  const isOverheadChecked = document.querySelector('#overhead').checked;
  if (isOverheadChecked) {
    checkedCategoryList.push('overhead');
  }
  const isPointChecked = document.querySelector('#point').checked;
  if (isPointChecked) {
    checkedCategoryList.push('point');
  }
  const isNightlightsChecked = document.querySelector('#nightlights').checked;
  if (isNightlightsChecked) {
    checkedCategoryList.push('nightlights');
  }

  const city = document.querySelector('.location__city-name').id;
  const status = document.querySelector('#instock').checked ? 'instock' : 'all-item';
  let resultList = [];

  const data = await getGoodsFromServer();
  if (status === 'all-item') {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < checkedCategoryList.length; j++) {
        if (data[i].type.includes(checkedCategoryList[j]) && !resultList.includes(data[i])) {
          resultList.push(data[i]);
          break;
        }
      }
    }
  } else if (status === 'instock') {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < checkedCategoryList.length; j++) {
        if (data[i].type.includes(checkedCategoryList[j]) && data[i].availability[city] > 0 && !resultList.includes(data[i])) {
          resultList.push(data[i]);
          break;
        }
      }
    }
  }
  if (checkedCategoryList.length === 0 && status === 'all-item') {
    resultList = data;
  }
  if (checkedCategoryList.length === 0 && status === 'instock') {
    for (let i = 0; i < data.length; i++) {
      if (data[i].availability[city] > 0) {
        resultList.push(data[i]);
      }
    }
  }

  const sortType = document.querySelector('.catalog__sort-select').value;
  switch (sortType) {
    case 'price-min':
      resultList.sort((a, b) => a.price.new - b.price.new);
      break;  
    case 'price-max':
      resultList.sort((a, b) => b.price.new - a.price.new);
      break;
    case 'rating-max':
      resultList.sort((a, b) => b.rating - a.rating);
      break;
  }


  renderGoodCards(resultList);
}
