//Creation of a work in gulp

/*
   To execute -> gulp workName
*/

const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const pumbler = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Images
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//JavaScript
const terser = require('gulp-terser-js');

function css(done) { //Done == CallBack

    src('src/scss/**/*.scss') //Identy the file .SCSS to compile || With **/* listen to all the files that has .scss extension
        .pipe(sourcemaps.init())
        .pipe(pumbler())
        .pipe(sass()) //Compile
        .pipe(postcss([autoprefixer(), cssnano()])) //To compile the css that generates gulp
        .pipe(sourcemaps.write('.')) //To map the css generates gulp
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
    src('src/img/**/*.{jpg, png}')
        .pipe(webp(options))
        .pipe(dest('build/img'))
    done();
}

function avifVersion() {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{jpg, png}')
        .pipe(avif(options))
        .pipe(dest('build/img'))
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.dev = parallel(images, webpVersion, avifVersion, javascript, dev);