// require files
var fileinclude = require('gulp-file-include'),
    jshint = require('gulp-jshint'),
    prettify = require('gulp-jsbeautifier'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    uglifycss = require('gulp-uglifycss'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create();


/**
*   --------------------
*          Paths
*   --------------------
*/

// Paths 
var paths = {
    'html': './src/',
    'assets': './src/assets/',
    'img': './src/assets/img/',
    'js': './src/assets/js/',
    'less': './src/assets/less/',
    'fonts': './src/assets/fonts/',
    'vendor': './src/assets/vendor/',
    // output dir
    'dist': './dist/'
};


/**
*   --------------------
*          Tasks
*   --------------------
*/

// clone fonts folder
gulp.task('fonts', function() {
    gulp.src(paths.fonts+'*')
        .pipe(gulp.dest(paths.dist + 'assets/fonts/'));
});

// clone vendor folder
gulp.task('vendor', function() {
    gulp.src(paths.vendor+'*')
        .pipe(gulp.dest(paths.dist + 'assets/vendor/'));
});

// use file include to concat html files
gulp.task('fileinclude', function() {
    gulp.src([paths.html + '*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        // pretty html
        .pipe(prettify({
            indentSize: 2
        }))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
});




// compile less files and concat 
gulp.task('less', function() {
    return gulp.src(paths.less + '*.less')
        .pipe(less())
        .pipe(concat('style.css'))
        //prettyfy
        .pipe(prettify({
            indentSize: 2
        }))
        .pipe(gulp.dest(paths.dist + 'assets/css/'))
        // now compress css
        .pipe(uglifycss())
        // use min on name
        .pipe(rename({
            suffix: '.min'
        }))
        // move to
        .pipe(gulp.dest(paths.dist + 'assets/css/'))
        .pipe(browserSync.stream());
});


// javascript files 
gulp.task('javascript', function() {
    return gulp.src(paths.js + '*.js')
        // check with jshit
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        // move to
        .pipe(gulp.dest(paths.dist + 'assets/js/'))
        // compress
        .pipe(uglify())
        // rename with
        .pipe(rename({
            suffix: '.min'
        }))
        // move to
        .pipe(gulp.dest(paths.dist + 'assets/js/'))
        .pipe(browserSync.stream());
});


// optimize images
gulp.task('images', function() {
    return gulp.src(paths.img + '*')
        // optimize
        .pipe(imagemin({
            progressive: true
        }))
        // move to
        .pipe(gulp.dest(paths.dist + 'assets/img/'))
        .pipe(browserSync.stream());
});


// Static server
gulp.task('server', ['fileinclude', 'less', 'javascript', 'images', 'fonts', 'vendor'], function() {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    });
    // watch changes on this tasks
    gulp.watch(paths.less + '*.less', ['less']);
    gulp.watch(paths.js + '*.js', ['javascript']);
    gulp.watch(paths.html + '*.html', ['fileinclude']);
    gulp.watch(paths.img + '*', ['images']);
    gulp.watch(paths.vendor + '*', ['vendor']);
    gulp.watch(paths.html+'*.html').on('change', browserSync.reload);
    gulp.watch(paths.html+'partials/*.html').on('change', browserSync.reload);
});



/**
*   --------------------
*      Group tasks
*   --------------------
*/

// default task  
gulp.task('default', ['server']);
// build only render files
gulp.task('build', ['fileinclude', 'less', 'javascript', 'images', 'fonts', 'vendor']);
