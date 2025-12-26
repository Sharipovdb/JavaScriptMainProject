export function openCloseCityListByBtn(elem) {
  elem.classList.toggle('location__city--active');
}

export function chooseCityFromList(elem) {
  const choosenCity = elem.textContent;
  if(choosenCity == 'Оренбург') {
    elem.parentElement.parentElement.previousElementSibling.firstElementChild.id = 'orenburg';
  }
  else if(choosenCity == 'Москва') {
    elem.parentElement.parentElement.previousElementSibling.firstElementChild.id = 'moscow';
  }
  else if(choosenCity == 'Санкт-Петербург') {
    elem.parentElement.parentElement.previousElementSibling.firstElementChild.id = 'saintPetersburg';
  }
  elem.parentElement.parentElement.previousElementSibling.firstElementChild.textContent = choosenCity;
}