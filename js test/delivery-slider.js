// Слайдер для доставки
const swiperDelivery = new Swiper('.swiper-delivery', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination-delivery',
    },
    navigation: {
        nextEl: '.swiper-button-next-delivery',
        prevEl: '.swiper-button-prev-delivery',
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