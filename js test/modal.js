document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.querySelector('.header__burger');
    const modal = document.getElementById('modal');
    const modalLinks = modal.querySelectorAll('a'); // Всі якірні посилання в модальному вікні

    // Фіксуємо або розблоковуємо скролінг
    const toggleBodyScroll = (shouldDisable) => {
        if (shouldDisable) {
            document.body.style.overflow = 'hidden'; // Вимикаємо скрол
        } else {
            document.body.style.overflow = ''; // Відновлюємо скрол
        }
    };

    // Відкриття/закриття модального вікна
    burgerButton.addEventListener('click', () => {
        modal.classList.toggle('show');
        toggleBodyScroll(modal.classList.contains('show'));
    });

    // Закриття модального вікна при кліку на якірні посилання
    modalLinks.forEach(link => {
        link.addEventListener('click', () => {
            modal.classList.remove('show');
            toggleBodyScroll(false);
        });
    });
});
