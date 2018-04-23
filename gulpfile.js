var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    mustache = require('gulp-mustache-inverted'),
    download = require('gulp-download'),
    moment = require('moment'),
    fs = require('fs');

var src = './src',
    build = './build';

gulp.task('html', function() {
    gulp.src(build + '/**/*.html');
});

gulp.task('css', function() {
    gulp.src(build + '/**/*.css');
});

gulp.task('sass', function() {
    gulp.src(src + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(build + '/css/'));
});

gulp.task('mustache', function() {
    let resumeData = JSON.parse(fs.readFileSync(src + '/resume-data.json', "utf8"));
    resumeData.date = moment().format('MMMM D, YYYY');
    gulp.src(src + '/**/*.mustache')
        .pipe(mustache(resumeData, {extension: '.html'}))
        .pipe(gulp.dest(build + '/'));
});

gulp.task('watch', function() {
    gulp.watch(src + '/**/*.mustache', ['mustache']);
    gulp.watch(src + '/**/*.json', ['mustache']);
    gulp.watch(build + '/**/*.css', ['css']);
    gulp.watch(src + '/**/*.scss', ['sass']);
});

gulp.task('webserver', function() {
    gulp.src(build  + '/')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 8081
        }));
});

gulp.task('default', ['watch', 'html', 'css', 'sass', 'mustache', 'webserver']);
