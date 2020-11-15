const basicLightbox = require('basiclightbox');

export default function lightbox(link) {
        const instance = basicLightbox.create(`
		<img src="${link}">
	`).show()
}


