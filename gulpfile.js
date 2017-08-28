var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    mustache = require('gulp-mustache-inverted');

var src = './src',
    build = './build';

gulp.task('html', function() {
    gulp.src(build + '/**/*.html');
});

gulp.task('css', function() {
    gulp.src(build + '/**/*.css');
});

gulp.task('json', function() {
    gulp.src(src + '/**/*.json');
});

gulp.task('sass', function() {
    gulp.src(src + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(build + '/css/'));
});

gulp.task('mustache', function() {
    gulp.src(src + '/**/*.mustache')
        .pipe(mustache(src + '/data.json', {extension: '.html'}))
        .pipe(gulp.dest(build + '/'));
});

gulp.task('watch', function() {
    gulp.watch(build + '/**/*.html', ['html']);
    gulp.watch(build + '/**/*.css', ['css']);
    gulp.watch(src + '/**/*.json', ['json', 'mustache']);
    gulp.watch(src + '/**/*.scss', ['sass']);
    gulp.watch(src + '/**/*.mustache', ['mustache']);
});

gulp.task('webserver', function() {
    gulp.src(build  + '/')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 8081
        }));
});

gulp.task('default', ['watch', 'html', 'css', 'json', 'sass', 'mustache', 'webserver']);
