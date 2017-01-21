var django = require('gulp-django-utils');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
// var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

var app_name = 'app';

module.exports = function (project) {

    // Инициализируем приложение в проекте.
    var app = new django.Application('app', project);

    // Создаём таск в пространстве имён приложения.
    app.task('styles', function () {
        app.src('gulping/sass/*.sass')
            .pipe(sass({
                includePaths: require('node-bourbon').includePaths
            }).on('error', sass.logError))
            .pipe(rename({suffix: '.min', prefix: ''}))
            .pipe(autoprefixer({
                browsers: ['last 15 versions'],
                cascade: false
            }))
            //.pipe(minifycss())
            .pipe(app.dest('static/' + app_name + '/css/'))
            .pipe(livereload());

    });

    app.task('js', function () {
        // Возьми все `.js` файлы из `django-project/app/build/app/js`,
        // объедини в один и положи в `django-project/app/static/js`.
        app.src('gulping/js/*.js')
            .pipe(concat(app_name + '.js'))
            .pipe(app.dest('static/' + app_name+'/js/'))
            .pipe(livereload());
    });

    app.task('watch', ['styles', 'js'], function () {
        livereload.listen();
        app.watch('build/' + app_name + '/js/*.js', ['js']).on('change', livereload.changed);
        app.watch('/sass/*.sass', ['styles']).on('change', livereload.changed);
        app.watch('templates/*.html', []).on('change', livereload.changed);
    });
};
