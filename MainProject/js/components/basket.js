import { getGoodsFromServer } from "./getGoodsFromServer.js";

const counter = document.querySelector('.header__user-count');
const list = document.querySelector('.basket__list');

function createBasketElement(name, price, img) {
  const li = document.createElement('li');
  li.classList.add('basket__item');
  li.innerHTML = `
              <div class="basket__img">
                  <img src="${img.slice(3)}" alt="Фотография товара" height="60" width="60">
                </div>
                <span class="basket__name">${name}</span>
                <span class="basket__price">${price} руб</span>
                <button class="basket__item-close" type="button">
                  <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                  </svg>
                </button>
  `
  const delBtn = li.querySelector('.basket__item-close');
  delBtn.addEventListener('click', () => {
    delFromBasketBtn(delBtn);
  })
  return li;
}

function countCheck() {
  if (Number(counter.textContent) != 0) {
    try {
      document.querySelector('.basket__empty-block').remove()
    } catch (error) {
      return
    }

  }
  else {
    const emptyBlock = document.createElement('div');
    emptyBlock.classList.add('basket__empty-block');
    emptyBlock.textContent = 'Корзина пока пуста';
    document.querySelector('.header__basket').append(emptyBlock);
  }
}

function delFromBasketBtn(elem) {
  elem.parentElement.remove();
  counter.textContent = Number(counter.textContent) - 1;
  countCheck();
}

export async function addToBasketBtn(id) {
  const data = await getGoodsFromServer();
  let name = null;
  let price = null;
  let img = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      name = data[i].name;
      price = data[i].price.new;
      img = data[i].image;
      counter.textContent = Number(counter.textContent) + 1;
    }
  }
  list.append(createBasketElement(name, price, img, id));
  countCheck();
}