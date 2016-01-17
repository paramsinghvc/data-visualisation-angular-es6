var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

gulp.task('sass', function() {
    return gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('assets/css'))
});

gulp.task('sass:watch', ['sass'], reload);

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

});

gulp.task('transpile:watch', ['transpile'], reload);

gulp.task('serveprod', function() {
    connect.server({
        root : __dirname,
        port: process.env.PORT || 5000,
        livereload: false
    });
})

gulp.task('default', ['transpile', 'sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['app/src/**/*.js'], ['transpile:watch']);
    gulp.watch(['assets/sass/**/*.scss'], ['sass:watch']);
});
