// References:
// https://markgoodyear.com/2014/01/getting-started-with-gulp/
// https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    ts = require('gulp-typescript'),
    less = require('gulp-less'),
    inject = require('gulp-inject'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    gulpifelse = require('gulp-if-else'),
    gulpRunSequence = require('gulp-run-sequence'),
    order = require('gulp-order'),
    watch = require('gulp-watch');

var dirDev = 'build';
var dirRelease = 'dist';

function getOutputPath(sufixo) {
    var path = gulpifelse(argv.prod, function() {
                    return dirRelease;
                }, function() {
                    return dirDev;
                });
    
    if (sufixo) {
        path += '/' + sufixo;
    }
    
    return path;
}

gulp.task('default', ['build', 'connect']);

gulp.task('build', function() {
    gulpRunSequence('clean', ['build-ts', 'node-modules', 'build-less', 'vendor-css', 'images', 'html'], 'build-index', 'watch');
});

gulp.task('clean', function() {
    return del(getOutputPath());
});

// Compiles typescript files and put them into dist directory
gulp.task('build-ts', function() {
    return gulp.src('app/**/*.ts')
        .pipe(ts())
        // .pipe(gulpif(argv.prod, rename({suffix: '.min'})))
        // .pipe(gulpif(argv.prod, uglify()))
        .pipe(gulp.dest(getOutputPath('app')))
        .pipe(connect.reload());
});


gulp.task('node-modules', function() {
    return gulp.src([
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-local-storage/dist/angular-local-storage.js',
            'node_modules/angular-material/angular-material.js'])
        .pipe(gulp.dest(getOutputPath('scripts')))
        .pipe(connect.reload());
});

// Minifies css files
gulp.task('build-less', function() {
    return gulp.src('styles/**/*.less')
        .pipe(less())
        .pipe(gulpif(argv.prod, rename({suffix: '.min'})))
        .pipe(gulpif(argv.prod, minifycss()))
        .pipe(gulp.dest(getOutputPath('styles')))
        .pipe(connect.reload());
});

gulp.task('vendor-css', function() {
    return gulp.src('styles/lib/**/*.css')
        .pipe(gulpif(argv.prod, concat('vendor.css')))
        .pipe(gulpif(argv.prod, rename({suffix: '.min'})))
        .pipe(gulpif(argv.prod, minifycss()))
        .pipe(gulp.dest(getOutputPath('styles')))
        .pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(getOutputPath('images')))
        .pipe(gulp.dest(getOutputPath('images')))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest(getOutputPath('app')))
        .pipe(connect.reload());
});

gulp.task('build-index', function () {
    var index = gulp.src('index.html');
    
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src([getOutputPath('**/*.js'), getOutputPath('**/*.css')])
                    .pipe(order([
                        '*/angular.js',
                        '*/angular-animate.js',
                        '*/angular-aria.js',
                        '*/angular-messages.js',
                        '*/angular-resource.js',
                        '*/angular-mocks.js',
                        '*/angular-route.js',
                        '*/angular-local-storage.js',
                        '*/angular-material.js',
                        '*.js'
                    ], {read: false}));

    return index
        .pipe(inject(sources, {
            ignorePath: getOutputPath(),
            addRootSlash: false
        }))
        .pipe(gulp.dest(getOutputPath()))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['app/*.html'], ['html']);
    gulp.watch(['index.html'], ['build-index']);
    gulp.watch('app/**/*.ts', ['build-ts']);   
    gulp.watch('styles/**/*.less', ['build-less']);
    gulp.watch('images/**/*', ['images']);
});

gulp.task('connect', function() {
    connect.server({
        //port: 8080,
        livereload: true,
        root: [getOutputPath()],
        open: { browser: 'chrome' }
    });
});