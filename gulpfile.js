 var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    notifier = require('node-notifier'),
    plumber = require('gulp-plumber');

gulp.task('js', function() {
    gulp.src('./src/js/**/*.js')
    .pipe(plumber(function(err) {
            console.log(err);
    }))
    .pipe(uglify())
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./static/js'));
});

gulp.task('less', function() {
    gulp.src('./src/less/**/*.less')
    .pipe(plumber(function(err) {
            console.log(err);
    }))
    .pipe(sourcemaps.init())
    .pipe(less({
        relativeUrls: true
    }))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./static/css'));

    notifier.notify({title: "LESS Compiled", message: "LESS compiled successfully."});

});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./src/**/*.less', ['less']);
});

gulp.task('default', ['less', 'js']);