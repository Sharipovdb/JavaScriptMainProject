export function openCloseAccordion() {
  const accordeonList = document.querySelectorAll('.accordion__btn');
  accordeonList.forEach((btn) => {
    btn.addEventListener('click', function () {
      accordeonList.forEach((item) => {
        if (item !== this) {
          item.classList.remove('accordion__btn--active');
        }
      });
      this.classList.toggle('accordion__btn--active');
    });
  });
}

