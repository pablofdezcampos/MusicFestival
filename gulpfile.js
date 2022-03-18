//Creation of a work in gulp

/*
   To execute -> gulp workName
*/

const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pumbler = require('gulp-plumber');

function css(done) { //Done == CallBack

    src('src/scss/**/*.scss') //Identy the file .SCSS to compile || With **/* listen to all the files that has .scss extension
        .pipe(pumbler())
        .pipe(sass()) //Compile
        .pipe(dest('build/css')) //Storage it in the hard disk
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;