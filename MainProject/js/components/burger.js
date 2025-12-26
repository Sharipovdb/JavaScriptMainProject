export function openBurger() {
  const burger = document.querySelector('.main-menu')
  burger.classList.add('main-menu--active')
}

export function closeBurger() {
  const burger = document.querySelector('.main-menu')
  burger.classList.remove('main-menu--active')
}