import { openBurger, closeBurger } from "./components/burger.js";
import { openCloseCityListByBtn, chooseCityFromList } from "./components/citys-list.js";
// import { renderGoodCards } from "./components/getGoods.js";
import { quantityInCategory } from "./components/quantityOfGoods.js";
import { FilterCategory } from "./components/checkedCategory.js";
import { openCloseAccordion } from "./components/accordion.js";
import { renderDayProducts } from "./components/slider.js";
// import { validator } from "./components/formValid.js";
// import { availabilityInCity } from "./components/cardInformation.js";

window.addEventListener('DOMContentLoaded', () => {

  const openBurgerBtn = document.querySelector('.header__catalog-btn');
  openBurgerBtn.addEventListener("click", () => {
    openBurger();
  });
  const closeBurgerBtn = document.querySelector('.main-menu__close');
  closeBurgerBtn.addEventListener("click", () => {
    closeBurger();
  });

  const CityListByBtn = document.querySelector('.location__city');
  CityListByBtn.addEventListener("click", () => {
    openCloseCityListByBtn(CityListByBtn);
  });
  const CityListItems = document.querySelectorAll('.location__sublink');
  CityListItems.forEach(item => {
    item.addEventListener("click", () => {
      chooseCityFromList(item);
      openCloseCityListByBtn(CityListByBtn);
      FilterCategory();
    });
  });

  // renderGoodCards();
  document.querySelector('.catalog-form__reset').addEventListener('click', (e) => {
    e.preventDefault();
    const filters = document.querySelectorAll('.custom-checkbox__field');
    filters.forEach((el) => el.checked = false);
    document.querySelector('#instock').checked = false;
    document.querySelector('.catalog__sort-select').value = 'price-min';
    FilterCategory();
  });

  FilterCategory();
  // const CategoryPedant = document.querySelector('#pendant');
  // CategoryPedant.addEventListener('change', () => {
  //   FilterCategory();
  // });
  // const CategoryCeiling = document.querySelector('#ceiling');
  // CategoryCeiling.addEventListener('change', () => {
  //   FilterCategory();
  // });
  // const CategoryOverhead = document.querySelector('#overhead');
  // CategoryOverhead.addEventListener('change', () => {
  //   FilterCategory();
  // });
  // const CategoryPoint = document.querySelector('#point');
  // CategoryPoint.addEventListener('change', () => {
  //   FilterCategory();
  // });
  // const CategoryNightlights = document.querySelector('#nightlights');
  // CategoryNightlights.addEventListener('change', () => {
  //   FilterCategory();
  // });

  document.querySelector('.catalog-form__list-col').addEventListener('click', e => {
  const item = e.target.closest('input[name="type"]');
  item.addEventListener('change', () => {
    FilterCategory();
  });
});

  const status = document.querySelectorAll('input[name="status"]');
  status.forEach(item => {
    item.addEventListener('change', () => {
      FilterCategory();
    });
  });
  const sortType = document.querySelector('.catalog__sort-select')
  sortType.addEventListener('change', () => {
    FilterCategory();
  });


  let categoryPedant = document.querySelector('.custom-checkbox--pendant').lastElementChild.lastElementChild;
  quantityInCategory(categoryPedant, 'pendant');
  let categoryCeiling = document.querySelector('.custom-checkbox--ceiling').lastElementChild.lastElementChild;
  quantityInCategory(categoryCeiling, 'ceiling');
  let categoryOverhead = document.querySelector('.custom-checkbox--overhead').lastElementChild.lastElementChild;
  quantityInCategory(categoryOverhead, 'overhead');
  let categoryPoint = document.querySelector('.custom-checkbox--point').lastElementChild.lastElementChild;
  quantityInCategory(categoryPoint, 'point');
  let categoryNightlights = document.querySelector('.custom-checkbox--nightlights').lastElementChild.lastElementChild;
  quantityInCategory(categoryNightlights, 'nightlights');

  const busket_el = document.querySelector('.basket');
  const busket_btn = document.querySelector('.header__user-btn');
  const busket_btnDel = document.querySelector('.basket__item-close');
  busket_btn.addEventListener('click', (e) => {
    busket_el.classList.toggle('basket--active');
    e.stopPropagation();
  })
  document.addEventListener('click', (e) => {
    if (!busket_el.contains(e.target) && !busket_btn.contains(e.target) && !e.target.closest('.basket__item-close')) {
      busket_el.classList.remove('basket--active');
    }
  });

  openCloseAccordion();
  renderDayProducts();

});



