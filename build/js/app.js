document.addEventListener('DOMContentLoaded', function() {
    startApp();
});

function startApp() {
    createGallery();
}

function createGallery() {
    const gallery = document.querySelector('.images-gallery');
    for (let i = 1; i <= 12; i++) {
        const image = document.createElement('picture');
        image.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img width="200" height="300" loading="lazy" src="build/img/thumb/${i}.jpg" 
        alt="Vocalist image">
        `;
        gallery.appendChild(image);
    }
}