'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const webserver = require('gulp-webserver');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
        return gulp.src('./src/style.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.init())
            .pipe(postcss(
                [
                    autoprefixer()
                ]
            ))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./dist'));
    }
);

gulp.task('copy', function () {
    return gulp
        .src(['./src/index.html'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.series(['sass', 'copy']);
    gulp.watch('./src/*.scss', gulp.series('sass'));
    gulp.watch('./src/*.html', gulp.series('copy'));
});

gulp.task('webserver', function () {
    gulp.src('./dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            port: 8000
        }));
});

gulp.task('default', gulp.series(['sass']));