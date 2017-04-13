/* Load plugins */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    uncss = require('gulp-uncss'),
    connect = require('gulp-connect'),
    nano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    open = require('gulp-open'),
    rename = require('gulp-rename');
    sourcemaps = require('gulp-sourcemaps');

//-----------------------
// tasks for local servers with gulp-connect and gulp-open ----------------------------------
//-----------------------
gulp.task('connectBuild', function() {
    connect.server({
        root: 'build',
        port: 8000,
        livereload: true
    });
});
gulp.task('connectDist', function() {
    connect.server({
        root: 'dist',
        port: 8001
    });
});

gulp.task('open-build', function() {
    gulp.src(__filename)
        .pipe(open({
            uri: 'http://localhost:8000/'
        }))
});

gulp.task('open-dist', ['uncss'], function() {
    gulp.src(__filename)
        .pipe(open({
            uri: 'http://localhost:8001/'
        }))
});

//-----------------------
// tasks for building process ----------------------------------
//-----------------------

gulp.task('css', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload())
        .pipe(notify('CSS task complete!'))
});

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload())
        .pipe(notify('JS task complete!'))
});

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload())
        .pipe(notify('site reloaded!'))
});

gulp.task('images', function() {
    return gulp.src('./src/img/**')
        .pipe(gulp.dest('./build/img'))
        .pipe(connect.reload())
});

//-----------------------
// tasks for final deployment ----------------------------------
//-----------------------

gulp.task('html-dist', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
});

gulp.task('js-dist', function(cb) { // gulp-uglify and "pump" as the example on npm
    pump([
            gulp.src('./build/js/main.js'),
            uglify(),
            gulp.dest('./dist/js'),
            notify('JS task complete!')
        ],
        cb
    );
});

gulp.task('images-dist', function() {
    return gulp.src('./build/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('uncss', function() {
    return gulp.src('./build/css/*.css')
        .pipe(notify('uncss is working...'))
        .pipe(uncss({
            html: ['http://localhost:8001/index.html']
        }))
        .pipe(nano())
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify('READY FOR ONLINE DISTRIBUITION'))
});

/* Build task */
gulp.task('build', ['connectBuild', 'open-build', 'watch'], function() {
    gulp.start('css', 'js', 'html', 'images');
});

/* Deploy task */
gulp.task('deploy', ['connectDist'], function() {
    gulp.start('uncss', 'js-dist', 'html-dist', 'images-dist', 'open-dist');
});

/* Watch task */
gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/img/**', ['images']);
});

//-----------------------
// Default task (same as calling build) ----------------------------------
//-----------------------
gulp.task('default', ['build']);
