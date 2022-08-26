import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import { ifEmptySearchAlert, ifNoImagesFoundAlert,ifEndOfSearchAlert } from './js/alerts';


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const form = document.getElementById('search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')

let page = 1;
let textInput = '';
let simpleLightBox;


function onSubmit(e){
    e.preventDefault();
    window.scrollTo({ top: 0 });
    textInput = input.value.trim();
    gallery.innerHTML = '';

    if (textInput === '') {
        ifEmptySearchAlert();
        return;
    }
    fetchImages(textInput, page).then(({ data }) => {
        if (data.totalHits === 0) {
            ifNoImagesFoundAlert();
            loadMoreBtn.classList.add("is-hidden");
        }

        if (data.total > 40) {
          loadMoreBtn.classList.remove("is-hidden");
        }
gallery.insertAdjacentHTML('beforeend',renderGallery(data.hits))
        // renderGallery(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();

    })

    e.currentTarget.reset();
}

function onLoadMoreClick() {
    simpleLightBox.destroy()
    page += 1;
    fetchImages(textInput, page).then(({ data }) => {
        
        // renderGallery(data.hits)
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

