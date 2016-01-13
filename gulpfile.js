var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function() {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('transpile', function() {
    return browserify({
            entries: ['app/src/index.js'],
            debug: true
        })
        .on('error', function(err) {
            console.error(err);
            this.emit("end");
        })
        .transform(babelify)
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('app/build'))
        .pipe(reload({
            stream: true
        }));

});

gulp.task('default', ['transpile', 'sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['app/src/**/*.js'], ['transpile']);
    gulp.watch(['assets/sass/**/*.scss'], ['sass']);
});
