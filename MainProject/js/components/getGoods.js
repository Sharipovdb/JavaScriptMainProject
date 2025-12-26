import { getGoodsFromServer } from "./getGoodsFromServer.js";
import { addToBasketBtn } from "./basket.js";

export function createGoodCard(img, name, oldPrice, newPrice, id, availability) {
  const li = document.createElement('li');
  li.classList.add('catalog__item');

  li.innerHTML = `
              <div class="product-card">
                <div class="product-card__visual">
                  <img class="product-card__img" src="${img.slice(3)}" height="436" width="290"
                       alt="Изображение товара">
                  <div class="product-card__more">
                    <a href="#" class="product-card__link btn btn--icon" data-id = "${id}">
                      <span class="btn__text">В корзину</span>
                      <svg width="24" height="24" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-basket"></use>
                      </svg>
                    </a>
                    <a href="#" class="product-card__link btn btn--secondary">
                      <span class="btn__text">Подробнее</span>
                    </a>
                  </div>
                </div>
                <div class="product-card__info">
                  <h2 class="product-card__title">${name}</h2>
                  <span class="product-card__old">
                  <span class="product-card__old-number">${oldPrice}</span>
                  <span class="product-card__old-add">₽</span>
                </span>
                  <span class="product-card__price">
                  <span class="product-card__price-number">${newPrice}</span>
                  <span class="product-card__price-add">₽</span>
                </span>
                  <div class="product-card__tooltip tooltip">
                    <button class="tooltip__btn" aria-label="Показать подсказку">
                      <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-i"></use>
                      </svg>
                    </button>
                    <div class="tooltip__content">
                      <span class="tooltip__text">Наличие товара по городам:</span>
                      <ul class="tooltip__list">
                        <li class="tooltip__item">
                          <span class="tooltip__text">Москва: <span class="tooltip__count">${availability.moscow}</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Оренбург: <span class="tooltip__count">${availability.orenburg}</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${availability.saintPetersburg}</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
  `

  tippy(li.querySelectorAll('.tooltip__btn'), {
  content(elem) {
    return elem.nextElementSibling.innerHTML;
  },
  allowHTML: true,
});

  

  return li
}

const goodsContainer = document.querySelector('.catalog__list');

goodsContainer.addEventListener('click', (event) => {
  const button = event.target.closest('.product-card__link.btn--icon');
  if (!button) return;

  event.preventDefault();
  const productId = button.dataset.id;
  addToBasketBtn(productId);
});

export async function renderGoodCards(data = null) {

  goodsContainer.innerHTML = '';
  if (!data || data.length === 0) {
    data = await getGoodsFromServer();
  }

  function resetPagination() {
    const paginationList = document.querySelectorAll('.catalog__pagination-link');
    paginationList.forEach(element => {
      element.style.border = 'none';
    });
  }

  const paginationList = document.querySelector('.catalog__pagination');
  if (data.length > 6) {
    paginationList.classList.remove('visually-hidden');
    paginationList.innerHTML = '';

    const items = Math.ceil(data.length / 6);
    for (let i = 1; i <= items; i++) {
      const listItem = document.createElement('li');
      listItem.classList.add('catalog__pagination-item');
      const btnPage = document.createElement('button');
      btnPage.classList.add('catalog__pagination-link');
      btnPage.dataset.page = i;
      btnPage.textContent = i;
      if(i==1) {
        btnPage.style.border = '3px solid red';
      }
      btnPage.addEventListener('click', () => {
        resetPagination();
        btnPage.style.border = '3px solid red';
        goodsContainer.innerHTML = '';
        for (let i = 6 * (btnPage.dataset.page - 1); i < Math.min(6 * btnPage.dataset.page, data.length); i++) {
          goodsContainer.append(createGoodCard(data[i].image, data[i].name, data[i].price.old, data[i].price.new, data[i].id, data[i].availability))
        }
      })
      listItem.append(btnPage);
      paginationList.append(listItem)
    }
  }
  else {
    paginationList.classList.add('visually-hidden')
  }

  for (let i = 0; i < Math.min(data.length, 6); i++) {
    goodsContainer.append(createGoodCard(data[i].image, data[i].name, data[i].price.old, data[i].price.new, data[i].id, data[i].availability))
  }
  
}

