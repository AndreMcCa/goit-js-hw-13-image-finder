import ApiServise from './js/apiService.js';
import masonry from './js/masonry.js';
import lightbox from './js/basicLightbox.js';
import particles from './js/particles.js';
import renderPhotoCard from './templates/photoCard.hbs';

import './css/styles.css';
import './scss/basicLightbox.scss';

const refs = {
    searchFormRef: document.querySelector('#search-form'),
    showMoreBtnRef: document.querySelector('#show-more-button'),
    galleryRef: document.querySelector('#gallery'),
    sentinelRef: document.querySelector("#sentinel"),
    beginningRef: document.querySelector('#to-beginning'), 
}

const apiService = new ApiServise();

refs.searchFormRef.addEventListener('submit', onSubmitForm);
refs.galleryRef.addEventListener('click', onModalOpen);

function onSubmitForm(e) {
    e.preventDefault();

    apiService.searchQuery = e.currentTarget.elements.query.value;
    apiService.resetPage();
    apiService.fetchArticles().then(appendARticlesMarkup);

    clearArticlesContainer();
    registrationObServer();
}

function appendARticlesMarkup(data) {

    const murkup = renderPhotoCard(data);
    refs.galleryRef.insertAdjacentHTML('beforeend', murkup);

    masonry();
    
    refs.beginningRef.classList.add('visible');
}

function clearArticlesContainer() {
    refs.galleryRef.innerHTML = '';
    disconnectObServer();

    refs.beginningRef.classList.remove('visible');
}

function onModalOpen(e) {

    if (e.target.nodeName !== 'IMG') {
        return
    }
    
    const elem = e.target;
    const largeImg = elem.getAttribute('data-large');

    lightbox(largeImg);
}

// class??

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {            
            apiService.fetchArticles().then(appendARticlesMarkup);
        }     
    });
}

const options = { rootMargin: '400px' };
const observer = new IntersectionObserver(onEntry, options)    


function registrationObServer() {
    observer.observe(refs.sentinelRef);  
}

function disconnectObServer() {
    observer.disconnect(refs.sentinelRef);
}
