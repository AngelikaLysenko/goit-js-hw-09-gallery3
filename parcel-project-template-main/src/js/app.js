import images from "./galleryItems";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightBoxOverlay = document.querySelector(".lightbox__overlay");
const lightBoxImg = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

let imgIndex = 0;

const addImagesMarkup = (images) => {
  return images
    .map(({ preview, original, description }, idx) => {
      return `
<li class = "gallery__item">
<a 
class = "gallery__link" 
href="${original}"
>
 <img 
class ="gallery__image" 
data-index="${idx}" 
src="${preview}" 
data-source="${original}"
alt="${description}"
/>
</a>
 </li>`;
    })
    .join("");
};


function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  imgIndex = Number(event.target.dataset.index);

  const sourceEl = event.target.dataset.source;
  const altEl = event.target.alt;

  window.addEventListener("keydown",handleSwipe)
  window.addEventListener("keydown", onEscKeyPress);
  lightbox.classList.add("is-open");
  replaceAttribute(sourceEl, altEl);
};

function closeModal() {
window.removeEventListener("keydown", handleSwipe);
window.removeEventListener("keydown", onEscKeyPress);
  lightbox.classList.remove("is-open");
  replaceAttribute("", "");
};

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
};

function onEscKeyPress(event) {
  const isEscKey = event.code === "Escape";
  if (isEscKey) {
    closeModal();
  }
};

function replaceAttribute(src, alt) {
  lightBoxImg.src = src;
  lightBoxImg.alt = alt;
};

const increment = () => {
    if (imgIndex === images.length - 1){
        imgIndex = 0;
        return;
    }
    imgIndex++;
}

const decrement = () => {
    if (imgIndex === 0){
       imgIndex = images.length - 1;
       return ;
    }
    imgIndex--;
}

const handleSwipe = (e) => {
e.code === "ArrowLeft" && decrement();
e.code === "ArrowRight" && increment();
const curImg = images[imgIndex];
replaceAttribute(curImg.original, curImg.description);
}

const imageMarkup = addImagesMarkup(images);
gallery.insertAdjacentHTML("beforeend", imageMarkup);

gallery.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
lightBoxOverlay.addEventListener("click", onOverlayClick);
