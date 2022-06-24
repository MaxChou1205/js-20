const carouselContainer = document.querySelector(".img-carousel");
const imgs = document.querySelectorAll(".img-carousel img");

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let interval = setInterval(run, 2000);
let index = 0;

function run() {
  index++;
  changeImage();
}

function changeImage() {
  if (index < 0) {
    index = imgs.length - 1;
  } else if (index >= imgs.length) {
    index = 0;
  }

  carouselContainer.style.transform = `translateX(${
    -index * imgs[0].clientWidth
  }px)`;
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 2000);
}

prevButton.addEventListener("click", () => {
  index--;
  resetInterval();
  changeImage();
});

nextButton.addEventListener("click", () => {
  index++;
  resetInterval();
  changeImage();
});
