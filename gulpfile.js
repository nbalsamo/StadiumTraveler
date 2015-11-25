var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')(),
    inject = require('gulp-inject'),
    rimraf = require('rimraf'),
    buildTarget = 'build';

var paths = {
    startup: [
        'startup.js'
    ],
    shared: [
        './shared/usMap.js',
        './shared/datePicker.js'
    ],
    views: [
        './views/home.js',
        './views/home.html',
        './views/form.js',
        './views/form.html',
        './views/surrounding.js',
        './views/surrounding.html',
        './views/map.js',
        './views/map.html'
    ],
    services: [
        './Services/ScheduleService.js',
        './Services/SearchService.js',
    ],
    thirdpartyjs: [
        './scripts/jquery.js',
        './scripts/angular.js',
        './scripts/angular-ui-router.js',
        './scripts/ui-bootstrap-tpls-0.12.1.min.js',
        './scripts/jquery.mousewheel.min.js',
        './scripts/raphael-min.js',
        './scripts/jquery.mapael.js',
    ],
    maps: [
        './scripts/maps/usa_states.js'
    ],
    thirdpartycss: [
        './assets/css/style.css',
        './assets/css/bootstrap.min.css'
    ],
    fonts: [
        './assets/css/fonts/glyphicons-halflings-regular.eot',
        './assets/css/fonts/glyphicons-halflings-regular.svg',
        './assets/css/fonts/glyphicons-halflings-regular.ttf',
        './assets/css/fonts/glyphicons-halflings-regular.woff',
        './assets/css/fonts/glyphicons-halflings-regular.woff2',
    ]
};

// Start Watching: Run "gulp"
gulp.task('default', ['watch']);

//clean out the build path
gulp.task('clean', function(cb) {
    rimraf(buildTarget, cb);
});

gulp.task('copy', ['copy-startup', 'copy-views', 'copy-services', 'copy-thirdpartyjs', 'copy-shared', 'copy-thirdpartycss', 'copy-fonts'], function() {
    return; //place holder to run all of the copies
});

gulp.task('copy-startup', function() {
    return gulp.src(paths.startup)
        .pipe(gulp.dest(buildTarget));
});

gulp.task('copy-views', function() {
    return gulp.src(paths.views)
        .pipe(gulp.dest(buildTarget + '/views/'));
});

gulp.task('copy-services', function() {
    return gulp.src(paths.services)
        .pipe(gulp.dest(buildTarget + '/services/'));
});

gulp.task('copy-thirdpartyjs', function() {
    return gulp.src(paths.thirdpartyjs)
        .pipe(gulp.dest(buildTarget + '/scripts/'));
});

gulp.task('copy-maps', function() {
    return gulp.src(paths.maps)
        .pipe(gulp.dest(buildTarget + '/scripts/maps'));
});

gulp.task('copy-shared', function() {
    return gulp.src(paths.shared)
        .pipe(gulp.dest(buildTarget + '/shared'));
});

gulp.task('copy-thirdpartycss', function() {
    return gulp.src(paths.thirdpartycss)
        .pipe(gulp.dest(buildTarget + '/assets/css/'));
});

gulp.task('copy-fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(buildTarget + '/assets/fonts'));
});

gulp.task('build-css', function() {
    return gulp.src('assets/less/*.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
            ],
            cascade: false
        }))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build/assets/css')).on('error', gutil.log);
});

gulp.task('inject', ['build-css', 'copy'], function() {
    var target = gulp.src('build/index.html');
    //this should get concat to one file at some pt
    //this does not copy the html file into the build folder for some reason. It only overwrites the existing one. It's fucked up and im tired
    var sources = gulp.src([
        './build/assets/css/app.css',
        './build/assets/css/style.css',
        './build/assets/css/bootstrap.min.css',
        './build/scripts/jquery.js',
        './build/scripts/angular.js',
        './build/scripts/angular-ui-router.js',
        './build/scripts/ui-bootstrap-tpls-0.12.1.min.js',
        './build/scripts/jquery.mousewheel.min.js',
        './build/scripts/raphael-min.js',
        './build/scripts/jquery.mapael.js',
        './build/startup.js',
        './build/shared/usMap.js',
        './build/shared/datePicker.js',
        './build/services/ScheduleService.js',
        './build/services/SearchService.js',
        './build/views/home.js',
        './build/views/form.js',
        './build/views/surrounding.js',
        './build/views/map.js'

    ]);
    return target.pipe(inject(sources, {
            relative: true
        }, {
            read: false
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('webServer', function() {
    gulp.src(buildTarget)
        .pipe(plugins.webserver({
            port: 9000,
            host: 'localhost',
            fallback: 'index.html',
            livereload: false,
            //open: 'http://localhost:8080/#/',
            path: '/'
        }));
});

gulp.task('test', function() {
    console.log('this is a test');
});
// Default task
//gulp.task('watch', function() {
//   gulp.watch('assets/js/libs/**/*.js', ['squish-jquery']);
//    gulp.watch('assets/js/*.js', ['build-js']);
//    gulp.watch('assets/less/**/*.less', ['build-css']);
//});

gulp.task('build', ['webServer', 'inject']);
gulp.task('buildProd', ['inject']);
