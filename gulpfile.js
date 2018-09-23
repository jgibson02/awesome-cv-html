const gulp = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const mustache = require('gulp-mustache-inverted');
const moment = require('moment');
const fs = require('fs');

const src = './src';
const build = './build';

gulp.task('html', () => {
  gulp.src(`${build}/**/*.html`);
});

gulp.task('css', () => {
  gulp.src(`${build}/**/*.css`);
});

gulp.task('sass', () => {
  gulp.src(`${src}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${build}/css/`));
});

gulp.task('mustache', () => {
  const resumeData = JSON.parse(fs.readFileSync(`${src}/resume-data.json`, 'utf8'));
  resumeData.date = moment().format('MMMM D, YYYY');
  gulp.src(`${src}/**/*.mustache`)
    .pipe(mustache(resumeData, { extension: '.html' }))
    .pipe(gulp.dest(`${build}/`));
});

gulp.task('watch', () => {
  gulp.watch(`${src}/**/*.mustache`, ['mustache']);
  gulp.watch(`${src}/**/*.json`, ['mustache']);
  gulp.watch(`${build}/**/*.css`, ['css']);
  gulp.watch(`${src}/**/*.scss`, ['sass']);
});

gulp.task('webserver', () => {
  gulp.src(`${build}/`)
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8081,
    }));
});

gulp.task('default', ['watch', 'html', 'css', 'sass', 'mustache', 'webserver']);
