import Notiflix from 'notiflix';

function ifEmptySearchAlert() {
  Notiflix.Notify.failure('The search string is empty. Please insert your search query.');
}
function ifNoImagesFoundAlert() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}


export {ifEmptySearchAlert, ifNoImagesFoundAlert }