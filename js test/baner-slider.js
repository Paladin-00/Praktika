    // Слайдер для банерів
    const swiperBanners = new Swiper('.swiper-banners', {
        loop: true,
        // slidesPerView: 3,
        // spaceBetween: 10,
        pagination: { 
            el: '.swiper-pagination-banners',
        },
        navigation: {
            nextEl: '.swiper-button-next-banners',
            prevEl: '.swiper-button-prev-banners',
        },
    });