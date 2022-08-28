import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import { ifEmptySearchAlert, ifNoImagesFoundAlert,ifEndOfSearchAlert,ifImagesFoundAlert,ifDublicateSearch } from './js/alerts';


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')

let page = 0 ; 
let textInput = '';
let simpleLightBox;


function onSubmit(e) {
  e.preventDefault();
  page = 1
  window.scrollTo({ top: 0 });

  if (textInput && textInput === e.currentTarget.elements[0].value) {
    ifDublicateSearch()
    return;
  }
  textInput = e.currentTarget.elements[0].value.trim()
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
    form.reset();
}

function onLoadMoreClick() {
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
}

loadMoreBtn.addEventListener('click', onLoadMoreClick)
form.addEventListener('submit', onSubmit)
