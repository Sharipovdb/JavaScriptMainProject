import { getGoodsFromServer } from "./getGoodsFromServer.js";
import { addToBasketBtn } from "./basket.js";
import { createGoodCard } from "./getGoods.js";

export async function renderDayProducts() {
  const goodsContainer = document.querySelector('.day-products__list',);

  const data = await getGoodsFromServer();

  for (let i = 0; i < data.length; i++) {
    if (data[i].goodsOfDay) {
      let el = createGoodCard(data[i].image, data[i].name, data[i].price.old, data[i].price.new, data[i].id, data[i].availability);
      el.classList.add('day-products__item', 'swiper-slide')
      goodsContainer.append(el);
    }
  }

  goodsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('.product-card__link.btn--icon');
    if (!button) return;

    event.preventDefault();
    const productId = button.dataset.id;
    addToBasketBtn(productId);
  });
}


const swiper = new Swiper('.swiper', {
  loop: false,
  slidesPerView: 4,
  spaceBetween: 40,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.day-products__navigation-btn--next',
    prevEl: '.day-products__navigation-btn--prev',
  }
});
