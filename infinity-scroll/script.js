const imageContainer = document.querySelector("#imageContainer");
const loader = document.querySelector("#loader");

let imageLoaded = 0;
let ready = false;

const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;
let photoArray = [];

function setAttribute(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

function imageLoad() {
  imageLoaded++;
  if (imageLoaded == count) {
    ready = true;
    loader.hidden = true;
    imageLoaded = 0;
  }
}

function displayPhotos() {
  photoArray.forEach(photo => {
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank"
    });

    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });
    img.addEventListener("load", imageLoad);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
