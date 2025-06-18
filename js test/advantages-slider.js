document.addEventListener('DOMContentLoaded', () => {
    let swiperInstance = null; // Змінна для зберігання екземпляра Swiper

    const initSwiper = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 480) {
            if (!swiperInstance) {
                swiperInstance = new Swiper('.advantages__swiper', {
                    slidesPerView: 1,
                    loop: true, // Зациклене прокручування
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    
                });
            }
        } else if (swiperInstance) {
            swiperInstance.destroy(true, true); // Знищуємо Swiper, якщо він існує
            swiperInstance = null; // Скидаємо змінну
        }

        adaptGridLayout(); // Викликаємо функцію адаптації сітки
    };

    const adaptGridLayout = () => {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        const screenWidth = window.innerWidth;

        if (swiperWrapper) {
            if (screenWidth > 768) {
                swiperWrapper.style.display = 'grid';
                swiperWrapper.style.gridTemplateColumns = 'repeat(4, 1fr)'; // Сітка 4x2
                swiperWrapper.style.gap = '20px';
            } else if (screenWidth > 480 && screenWidth <= 768) {
                swiperWrapper.style.display = 'grid';
                swiperWrapper.style.gridTemplateColumns = 'repeat(2, 1fr)'; // Сітка 2x4
                swiperWrapper.style.gap = '20px';
            } else {
                swiperWrapper.style.display = 'flex';
                swiperWrapper.style.flexDirection = 'row';
                swiperWrapper.style.gap = '0'; // Без проміжків
            }
        }
    };

    // Ініціалізація при завантаженні сторінки та зміні розміру
    window.addEventListener('load', initSwiper);
    window.addEventListener('resize', initSwiper);
});









(function () {
    // Ініціалізація emailjs
    emailjs.init("M4zqZjLnWVOhs_Phy");

    // Додаємо слухач події для форми
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Забороняємо стандартну поведінку форми

        // Знаходимо всі поля форми
        const nameInput = document.querySelector('input[name="name"]');
        const phoneInput = document.querySelector('input[name="phone"]');
        const emailInput = document.querySelector('input[name="email"]');
        const messageInput = document.querySelector('textarea[name="message"]');

        // Флаг для перевірки
        let isValid = true;

        // Перевірка поля "Ім'я"
        if (nameInput.value.trim().length < 2) {
            isValid = false;
            nameInput.classList.add('error');
            alert('Ім\'я повинно містити хоча б 2 символи.');
        } else {
            nameInput.classList.remove('error');
        }

        // Перевірка поля "Телефон"
        const phonePattern = /^\+?\d{10,15}$/;
        if (!phonePattern.test(phoneInput.value.trim())) {
            isValid = false;
            phoneInput.classList.add('error');
            alert('Введіть коректний номер телефону.');
        } else {
            phoneInput.classList.remove('error');
        }

        // Перевірка поля "Email"
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.classList.add('error');
            alert('Введіть коректний email.');
        } else {
            emailInput.classList.remove('error');
        }

        // Перевірка поля "Ваше запитання"
        if (messageInput.value.trim().length === 0) {
            isValid = false;
            messageInput.classList.add('error');
            alert('Поле "Ваше запитання" не може бути порожнім.');
        } else {
            messageInput.classList.remove('error');
        }

        // Якщо всі поля валідні, відправляємо форму через emailjs
        if (isValid) {
            emailjs.sendForm('service_tfpkg4c', 'template_kda3fat', this)
                .then(function () {
                    alert('Повідомлення успішно відправлено!');
                    document.getElementById('contact-form').reset(); // Скидаємо форму
                }, function (error) {
                    alert('Виникла помилка: ' + JSON.stringify(error));
                });
        }
    });

    // Додатковий стиль для полів з помилками
    const style = document.createElement('style');
    style.innerHTML = `
        .error {
            border: 2px solid red;
        }
    `;
    document.head.appendChild(style);
})();