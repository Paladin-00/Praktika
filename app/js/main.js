document.addEventListener('DOMContentLoaded', () => {
    // МОДАЛКА
    const burgerButton = document.querySelector('.header__burger');
    const modal = document.getElementById('modal');
    const modalLinks = modal.querySelectorAll('a');

    const toggleBodyScroll = (shouldDisable) => {
        document.body.style.overflow = shouldDisable ? 'hidden' : ''; 
    };

    burgerButton.addEventListener('click', () => {
        modal.classList.toggle('show');
        toggleBodyScroll(modal.classList.contains('show'));
    });

    modalLinks.forEach(link => {
        link.addEventListener('click', () => {
            modal.classList.remove('show');
            toggleBodyScroll(false);
        });
    });

    // ЗАПИТАННЯ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                }
            });
            item.classList.toggle('expanded');
        });
    });

    // Ініціалізація слайдерів
    const initSwiper = (selector, paginationSelector, navigationNext, navigationPrev, breakpoints) => {
        return new Swiper(selector, {
            loop: true,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: paginationSelector,
            },
            navigation: {
                nextEl: navigationNext,
                prevEl: navigationPrev,
            },
            breakpoints: breakpoints,
        });
    };

    const swiperServices = initSwiper('.swiper-services', '.swiper-pagination-services', '.swiper-button-next-services', '.swiper-button-prev-services', {
        768: {
            centeredSlides: false,
            slidesPerView: 2,
        },
        1200: {
            centeredSlides: true,
            slidesPerView: 3,
        },
    });

    const swiperDelivery = initSwiper('.swiper-delivery', '.swiper-pagination-delivery', '.swiper-button-next-delivery', '.swiper-button-prev-delivery', {
        768: {
            centeredSlides: false,
            slidesPerView: 2,
        },
        1200: {
            centeredSlides: true,
            slidesPerView: 3,
        },
    });

    const swiperBanners = initSwiper('.swiper-banners', '.swiper-pagination-banners', '.swiper-button-next-banners', '.swiper-button-prev-banners', {});

    // АДАПТИВНИЙ СЛАЙДЕР
    let swiperInstance = null;

    const adaptGridLayout = () => {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        const screenWidth = window.innerWidth;

        if (swiperWrapper) {
            if (screenWidth > 768) {
                swiperWrapper.style.display = 'grid';
                swiperWrapper.style.gridTemplateColumns = 'repeat(4, 1fr)';
                swiperWrapper.style.gap = '20px';
            } else if (screenWidth > 480) {
                swiperWrapper.style.display = 'grid';
                swiperWrapper.style.gridTemplateColumns = 'repeat(2, 1fr)';
                swiperWrapper.style.gap = '20px';
            } else {
                swiperWrapper.style.display = 'flex';
                swiperWrapper.style.flexDirection = 'row';
                swiperWrapper.style.gap = '0';
            }
        }
    };

    const initResponsiveSwiper = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 480) {
            if (!swiperInstance) {
                swiperInstance = new Swiper('.advantages__swiper', {
                    slidesPerView: 1,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                });
            }
        } else if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        adaptGridLayout();
    };

    // Ініціалізація при завантаженні сторінки та зміні розміру
    window.addEventListener('load', initResponsiveSwiper);
    window.addEventListener('resize', initResponsiveSwiper);
});
