document.addEventListener('DOMContentLoaded', function() {
    startApp();
});

function startApp() {
    fixNavegation();
    createGallery();
    scrollNav();
}

function fixNavegation() {
    const bar = document.querySelector('.header');
    const aboutFestival = document.querySelector('.about-festival');

    window.addEventListener('scroll', function() {
        if (aboutFestival.getBoundingClientRect().top < 0) {
            bar.classList.add('fix');
        } else {
            bar.classList.remove('fix');
        }
    });
}

function scrollNav() {
    const links = document.querySelectorAll('.main-navigation a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const scrollSection = e.target.atributtes.href.value;
            const section = document.querySelector(scrollSection);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
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
        image.onclick = function() {
            showImage(i);
        }
        gallery.appendChild(image);
    }
}

function showImage(id) {
    const image = document.createElement('picture');
    image.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img width="200" height="300" loading="lazy" src="build/img/grande/${id}.jpg" 
    alt="Vocalist image">
    `;
    //Creation of the overlay with the image
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        overlay.remove();
    }

    //Button to close the image
    const closeImage = document.createElement('P');
    closeImage.textContent = 'X';
    closeImage.classList.add('close-button');
    closeImage.onclick = function() {
        overlay.remove();
    }
    overlay.appendChild(closeImage);


    //Add to html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fix-body');
}