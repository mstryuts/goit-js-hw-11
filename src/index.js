import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import { ifEmptySearchAlert, ifNoImagesFoundAlert } from './js/alerts';



const form = document.getElementById('search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')
let page = 1
let textInput = ''

console.log(form)


function onSubmit(e){
    e.preventDefault();
    textInput = input.value.trim();
    gallery.innerHTML = '';

    if (textInput === '') {
        ifEmptySearchAlert();
        return;
    }

    fetchImages(textInput, page).then(({ data }) => {
        console.log(data)
        if (data.totalHits === 0) {
            ifNoImagesFoundAlert();
        } else {
            renderGallery(data.hits)
            loadMoreBtn.classList.remove("visualy-hidden");

            
        }

    })
    
}




form.addEventListener('submit', onSubmit)


