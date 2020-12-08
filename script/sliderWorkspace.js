const projectsContainer = document.querySelector('.b-workspace_container');
const slideItem = document.querySelectorAll('.b-workspace_card-item');
const dotItem = document.querySelectorAll('.dot_item');
let sliderPlaying = false;
let sliderInterval;
let activeCardIndex;
slideItem.forEach((item, key) => {
    if (item.classList.contains('active')) {
        activeCardIndex = key;
    };
});

const sliderProjectsChange = (i) => {
    activeCardIndex = (i + slideItem.length) % slideItem.length;
    slideItem.forEach(item => {
        item.className = 'b-workspace_card-item'
        item.style.animationName = ""
    });
    dotItem.forEach(item => item.classList.remove('active'));
    slideItem[activeCardIndex].classList.add('active');
    dotItem[activeCardIndex].classList.add('active');
};
const playSlider = () => {
    if (!sliderPlaying) {
        sliderInterval = setInterval(nextSlide, 3000);
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
    slideItem[activeCardIndex].style.animationName = "nextSlide"
};
const prevSlide = () => {
    sliderProjectsChange(activeCardIndex - 1);
    slideItem[activeCardIndex].style.animationName = "prevSlide"
};

projectsContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.className === 'dot_item') {
        sliderProjectsChange(e.target.dataset.value - 1);
        pauseSlider(5000);
    } else if (target.closest('#btn-prev-card')) {
        prevSlide();
        pauseSlider(5000);
    } else if (target.closest('#btn-next-card')) {
        nextSlide();
        pauseSlider(5000);
    };
});
// projectsContainer.addEventListener('mouseenter', pauseSlider);
// projectsContainer.addEventListener('mouseleave', playSlider);
playSlider();