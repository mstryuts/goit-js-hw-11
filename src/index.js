import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import { ifEmptySearchAlert, ifNoImagesFoundAlert,ifEndOfSearchAlert,ifImagesFoundAlert } from './js/alerts';


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')

let page ; 
let textInput ;
let simpleLightBox;


function onSubmit(e) {
  e.preventDefault();
  page = 1
  console.log(page)
    window.scrollTo({ top: 0 });
    textInput = input.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add("is-hidden");

    if (textInput === '') {
        ifEmptySearchAlert();
        return;
    }
  
  fetchImages(textInput, page).then(({ data }) => {

    if (!data.totalHits) {
      ifNoImagesFoundAlert()
    } else {
      gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits))
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      ifImagesFoundAlert(data);
    }
    if (data.totalHits > 40) {
        loadMoreBtn.classList.remove('is-hidden');
    }
  })
    .catch(error => console.log(error))
    .finally(() => {
      form.reset();
    });
}

function onLoadMoreClick() {
  console.log(page)
    simpleLightBox.destroy()
    page += 1;
    fetchImages(textInput, page).then(({ data }) => {
    
    gallery.insertAdjacentHTML('beforeend',renderGallery(data.hits))
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        
    const totalPages = Math.ceil(data.totalHits / 40);

      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        ifEndOfSearchAlert();
      }
    })
  .catch(error => console.log(error));
}

loadMoreBtn.addEventListener('click', onLoadMoreClick)
form.addEventListener('submit', onSubmit)

