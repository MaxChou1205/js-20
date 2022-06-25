const container = document.querySelector(".container");
const slidesContainer = document.querySelector(".slides");

let slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 1;
let slideInterval = null;

const firstClone = slides[0].cloneNode(true);
// const secondClone = slides[1].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slidesContainer.appendChild(firstClone);
// slidesContainer.appendChild(secondClone);
slidesContainer.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

const getSlides = () => (slides = document.querySelectorAll(".slide"));

slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
slidesContainer.addEventListener("transitionend", () => {
  getSlides();
  if (slides[index].id === firstClone.id) {
    slidesContainer.style.transition = "none";
    index = 1;
    slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  if (slides[index].id === lastClone.id) {
    slidesContainer.style.transition = "none";
    index = slides.length - 2;
    slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const startSlide = () => {
  slideInterval = setInterval(() => toNext(), 3000);
};

const toPrev = () => {
  if (index < 1) return;
  clearInterval(slideInterval);
  index--;
  slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
  slidesContainer.style.transition = `0.5s`;
  slideInterval = setInterval(() => toNext(), 3000);
};

const toNext = () => {
  getSlides();
  if (index >= slides.length - 1) return;
  clearInterval(slideInterval);
  index++;
  slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
  slidesContainer.style.transition = `0.5s`;
  slideInterval = setInterval(() => toNext(), 3000);
};

prevBtn.addEventListener("click", () => toPrev());
nextBtn.addEventListener("click", () => toNext());

slidesContainer.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

slidesContainer.addEventListener("mouseleave", startSlide);

startSlide();
