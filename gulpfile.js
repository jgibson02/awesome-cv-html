var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    mustache = require('gulp-mustache-inverted'),
    download = require('gulp-download'),
    moment = require('moment');

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

gulp.task('resume-data', function() {
    download('http://johngibson.me/resume-data.json')
	    .pipe(gulp.dest(src + "/"));
});

gulp.task('mustache', ['resume-data'], function() {
    let resumeData = require(src + '/resume-data.json');
    resumeData.date = moment().format('MMMM D, YYYY');
    gulp.src(src + '/**/*.mustache')
        .pipe(mustache(resumeData, {extension: '.html'}))
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

gulp.task('default', ['resume-data', 'watch', 'html', 'css', 'json', 'sass', 'mustache', 'webserver']);
