
const gallery = document.querySelector('.gallery');

export function renderGallery(data) {
    const markupGallery = data.map(({
        webformatURL, largeImageURL,
        tags, likes, views, comments, downloads
    }) => {
        return `
    <a class="gallery-link" href="${largeImageURL}">
          <div class="photo-card">
            <img class="photo-card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes:</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>`  
    }).join('')

    gallery.insertAdjacentHTML('beforeend', markupGallery);
}