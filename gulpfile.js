global.hostname = "localhost";

var gulp = require('gulp'),
    django = require('gulp-django-utils'),
    concat = require('gulp-concat');
    lr = require('tiny-lr');
    server = lr();
// Имена приложений, которые надо обойти.
var apps = ['app'];

// Инициализируем проект в текущей директории.
var project = new django.Project(apps);

// Обходим указанные приложения и загружаем оттуда `gulpfile`.
project.discoverApps();

// Создаем таск, у которого в зависимостях окажутся одноименные
// таски из приложений.

project.task('js', function () {
    // Возьми все `.js` файлы из `django-project/static/main/js`,
    // объедини в один и положи в `django-project/static/build`.
    project.src('static/main/js/*.js')
        .pipe(concat('main.js'))
        .pipe(project.dest('static/build'));
});

project.task('watch', function () {
    project.watch('static/main/js/*.js', ['js']);
    // project.watch('static/build/*.css', notifyLiveReload);
    // project.watch('static/build/*.js', notifyLiveReload);
});

project.task('default',  ['watch'], function () {

});