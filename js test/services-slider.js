// Слайдер для послуг
const swiperServices = new Swiper('.swiper-services', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination-services',
    },
    navigation: {
        nextEl: '.swiper-button-next-services',
        prevEl: '.swiper-button-prev-services',
    },
    breakpoints: {
        768: {
            centeredSlides: false,
            slidesPerView: 2, // показує 2 слайди
            spaceBetween: 30, // можна змінити відступи між слайдами
        },
        1200: {
            centeredSlides: true,
            slidesPerView: 3, // показує 2 слайди
            spaceBetween: 30, // можна змінити відступи між слайдами
        },
    },
});