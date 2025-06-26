const bgContainer = document.getElementById('bgContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const images = [
  'images/img1.jpg',
  'images/img2.jpg',
  'images/img3.jpg',
  'images/img4.jpg',
  'images/img5.jpg'
];
let index = 0;

function showImage(i) {
  const url = `url("${images[i]}")`;
  bgContainer.style.backgroundImage = url;
}

function prev() {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
}

function next() {
  index = (index + 1) % images.length;
  showImage(index);
}

// Auto slideshow
let autoplay = setInterval(next, 5000);

bgContainer.addEventListener('mouseenter', () => clearInterval(autoplay));
bgContainer.addEventListener('mouseleave', () => {
  autoplay = setInterval(next, 5000);
});

prevBtn.addEventListener('click', () => {
  prev();
  restartAutoplay();
});
nextBtn.addEventListener('click', () => {
  next();
  restartAutoplay();
});

function restartAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(next, 5000);
}

// Swipe support
let startX = null;
bgContainer.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
bgContainer.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) next();
  else if (endX - startX > 50) prev();
});

showImage(index);
