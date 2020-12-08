function createSlider(containerSelector, interval = 3000, mousePause = false) {
    const sliderContainer = document.querySelector(containerSelector);
    const sliderWrapper = sliderContainer.querySelector('.slider-wrapper');
    const sliderDots = sliderContainer.querySelector('.slider-dots');
    const slideItems = sliderWrapper.querySelectorAll('.slider-item');
    const dotItems = sliderDots.querySelectorAll('.dot_item');
    let sliderPlaying = false;
    let sliderInterval;
    let activeCardIndex;
    slideItems.forEach((item, key) => {
        if (item.classList.contains('active')) {
            activeCardIndex = key;
        };
    });

    const sliderProjectsChange = (i) => {
        activeCardIndex = (i + slideItems.length) % slideItems.length;
        slideItems.forEach(item => {
            item.classList.remove('active');
            item.style.animationName = "";
        });
        dotItems.forEach(item => item.classList.remove('active'));
        slideItems[activeCardIndex].classList.add('active');
        dotItems[activeCardIndex].classList.add('active');
    };
    const playSlider = () => {
        if (!sliderPlaying) {
            sliderInterval = setInterval(nextSlide, interval);
            sliderPlaying = true;
        };
    };
    const pauseSlider = (t = 0) => {
        clearInterval(sliderInterval);
        sliderPlaying = false;
        if (t > 0) setTimeout(playSlider, t);
    };

    const nextSlide = () => {
        sliderProjectsChange(activeCardIndex + 1);
        slideItems[activeCardIndex].style.animationName = "nextSlide"
    };
    const prevSlide = () => {
        sliderProjectsChange(activeCardIndex - 1);
        slideItems[activeCardIndex].style.animationName = "prevSlide"
    };

    sliderContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.className === 'dot_item') {
            sliderProjectsChange(e.target.dataset.value - 1);
            pauseSlider(5000);
        } else if (target.closest('.slider_btn-prev')) {
            prevSlide();
            pauseSlider(5000);
        } else if (target.closest('.slider_btn-next')) {
            nextSlide();
            pauseSlider(5000);
        };
    });
    if (mousePause) {
        sliderContainer.addEventListener('mouseenter', pauseSlider);
        sliderContainer.addEventListener('mouseleave', playSlider);
    };
    playSlider();
}

export default createSlider;