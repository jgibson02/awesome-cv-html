const gulp = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const mustache = require('gulp-mustache-inverted');
const moment = require('moment');
const fs = require('fs');

const src = './src';
const build = './build';

gulp.task('html', (done) => {
  gulp.src(`${build}/**/*.html`);
  done();
});

gulp.task('css', (done) => {
  gulp.src(`${build}/**/*.css`);
  done();
});

gulp.task('sass', (done) => {
  gulp.src(`${src}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${build}/css/`));
  done();
});

gulp.task('mustache', (done) => {
  const resumeData = JSON.parse(fs.readFileSync(`${src}/resume-data.json`, 'utf8'));
  resumeData.date = moment().format('MMMM D, YYYY');
  gulp.src(`${src}/**/*.mustache`)
    .pipe(mustache(resumeData, { extension: '.html' }))
    .pipe(gulp.dest(`${build}/`));
  done();
});

gulp.task('watch', function (done) {
  gulp.watch(`${src}/**/*.mustache`, gulp.series('mustache'));
  gulp.watch(`${src}/**/*.json`, gulp.series('mustache'));
  gulp.watch(`${build}/**/*.css`, gulp.series('css'));
  gulp.watch(`${src}/**/*.scss`, gulp.series('sass'));
  done();
});

gulp.task('webserver', (done) => {
  gulp.src(`${build}/`)
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8081,
    }));
  done();
});

gulp.task('default', gulp.parallel(['watch', 'html', 'css', 'sass', 'mustache', 'webserver']), function () { });
