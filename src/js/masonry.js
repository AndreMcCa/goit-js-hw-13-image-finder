import Masonry from 'masonry-layout';
import imagesLoader from 'imagesloaded';



export default function mason() {
    const grid = document.querySelector('.grid');

    const msnry = new Masonry(grid, {
        itemSelector: '.grid-item',
        // columnWidth: 200,
        gutter: 10,
    })


    imagesLoader(grid).on('progress', function () {
        msnry.layout();
    })
}