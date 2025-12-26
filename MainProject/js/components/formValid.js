 export const validator = new JustValidate('.questions__form');
validator
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите своё имя',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Имя должно быть не короче 3 символов',
    },
    {
      rule: 'maxLength',
      value: 20,
      errorMessage: 'Имя не может быть длиннее 20 символов',
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Введите свой email',
    },
    {
      rule: 'email',
      errorMessage: 'Некорректный email',
    },
  ])
  .addField('#agree', [
    {
      rule: 'required',
      errorMessage: 'Вы должны согласиться с условиями',
    },
  ])
  .onSuccess(async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка ответа сервера');
      }

      alert('Форма отправлена успешно!');

      form.reset();

    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Ошибка отправки формы. Попробуйте снова.');
    }
  });