//Creation of a work in gulp

/*
   To execute -> gulp workName
*/

//CSS
const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pumbler = require('gulp-plumber');

//Images
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp');

function css(done) { //Done == CallBack

    src('src/scss/**/*.scss') //Identy the file .SCSS to compile || With **/* listen to all the files that has .scss extension
        .pipe(pumbler())
        .pipe(sass()) //Compile
        .pipe(dest('build/css')) //Storage it in the hard disk
    done();
}

function images(done) {
    const options = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png, jpg}')
        .pipe(cache(imagemin(options)))
        .pipe(dest('build/img'))
}

function webpVersion(done) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png, jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img'))
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.images = images;
exports.webpVersion = webpVersion;
exports.dev = parallel(images, webpVersion, dev);