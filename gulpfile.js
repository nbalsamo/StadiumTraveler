var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')(),
    inject = require('gulp-inject'),
    rimraf = require('rimraf'),
    buildTarget = 'build';

var paths = {
    index: [
        'index.html'
    ],
    startup: [
        'startup.js'
    ],
    shared: [
        './shared/alert.directive.js',
        './shared/calendar.directive.js',
        './shared/calendar.template.html',
        './shared/scheduleList.directive.js',
        './shared/scheduleList.template.html',
        './shared/filter.js'
    ],
    views: [
        './views/home.js',
        './views/home.html',
        './views/form.js',
        './views/form.html',
        './views/surrounding.js',
        './views/surrounding.html',
        './views/map.js',
        './views/map.html',
        './views/scheduleList.js',
        './views/scheduleList.html',
        './views/header.js',
        './views/header.html',
    ],
    services: [
        './Services/ScheduleService.js',
        './Services/teamService.js',
        './Services/AlertService.js',
    ],
    thirdpartyjs: [
        './bower_components/angular/angular.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        './bower_components/moment/moment.js',
        './bower_components/angular-moment/angular-moment.js',
        './bower_components/underscore/underscore.js',
    ],
    maps: [],
    thirdpartycss: [
        './assets/css/style.css',
        './bower_components/bootstrap/dist/css/bootstrap.css'
    ],
    fonts: [
        './assets/css/fonts/glyphicons-halflings-regular.eot',
        './assets/css/fonts/glyphicons-halflings-regular.svg',
        './assets/css/fonts/glyphicons-halflings-regular.ttf',
        './assets/css/fonts/glyphicons-halflings-regular.woff',
        './assets/css/fonts/glyphicons-halflings-regular.woff2',
    ],
    images: [
        './assets/images/home_background.jpg',
    ]
};

// Start Watching: Run "gulp"
gulp.task('default', ['watch']);

//clean out the build path
gulp.task('clean', function(cb) {
    rimraf(buildTarget, cb);
});

gulp.task('copy', ['copy-index', 'copy-startup', 'copy-views', 'copy-services', 'copy-thirdpartyjs', 'copy-shared', 'copy-thirdpartycss', 'copy-fonts', 'copy-images'], function() {
    return; //place holder to run all of the copies
});

gulp.task('copy-index', function() {
    return gulp.src(paths.index)
        .pipe(gulp.dest(buildTarget));
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

gulp.task('copy-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(buildTarget + '/assets/images'));
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
    var sources = gulp.src([
        './build/assets/css/app.css',
        './build/assets/css/home.css',
        './build/assets/css/style.css',
        './build/assets/css/bootstrap.css',
        './build/assets/css/calendar.directive.css',
        './build/assets/css/scheduleItem.directive.css',
        './build/scripts/angular.js',
        './build/scripts/angular-ui-router.js',
        './build/scripts/ui-bootstrap-tpls.js',
        './build/scripts/moment.js',
        './build/scripts/angular-moment.js',
        './build/scripts/underscore.js',
        './build/startup.js',
        './build/shared/calendar.directive.js',
        './build/shared/alert.directive.js',
        './build/shared/scheduleList.directive.js',
        './build/shared/filters.js',
        './build/services/ScheduleService.js',
        './build/services/teamService.js',
        './build/services/AlertService.js',
        './build/views/home.js',
        './build/views/form.js',
        './build/views/surrounding.js',
        './build/views/scheduleList.js',
        './build/views/header.js',
    ]);
    return target.pipe(inject(sources, {
            relative: true
        }, {
            read: false
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('webServer', ['inject'], function() {
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

gulp.task('build', ['webServer'], function() {
    gulp.watch(['./services/**/*.js', './shared/**/*.js', './views/**/*.js', './views/**/*.html'], ['copy']);
    gulp.watch(['./assets/**/*.less'], ['build-css']);
});
gulp.task('buildProd', ['inject']);
