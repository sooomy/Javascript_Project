const carousel = document.getElementById('carousel');
const btnLeft = document.querySelector('.scroll-btn.left');
const btnRight = document.querySelector('.scroll-btn.right');

btnLeft.addEventListener('click', () => {
  carousel.scrollBy({ left: -carousel.clientWidth / 1.2, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
  carousel.scrollBy({ left: carousel.clientWidth / 1.2, behavior: 'smooth' });
});

// Swipe Support
let isDown = false;
let startX, scrollLeft;

carousel.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
  carousel.classList.add('active');
});
carousel.addEventListener('mouseleave', () => isDown = false);
carousel.addEventListener('mouseup', () => isDown = false);
carousel.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // scroll speed
  carousel.scrollLeft = scrollLeft - walk;
});
