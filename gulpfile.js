"use strict";

let gulp = require('gulp');
let browserSync = require('browser-sync');
let connectPHP = require('gulp-connect-php');
const {isBigUint64Array} = require("util/types");


let reload = browserSync.reload;

let paths = {

    html: ['index.html', 'Resources/Subsites/*.html'],
    css: ['Resources/Scripts/CSS/style.css'],
    typeScript: ['Resources/Scripts/Typescript/*.ts'],
    javaScripts: ['Resources/Scripts/JavaScript/*.js'],
    phpSkripts: ['Resources/Scripts/PHP/*.php', 'Resources/Scripts/PHP/inc/*.php']
};
// HTML reload Task
gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(reload({stream: true}));
});

//CSS reload Task
gulp.task('css', function () {
    gulp.src(paths.css)
        .pipe(reload({stream: true}));
});

//JavaScript reload Task
gulp.task('javaScripts', function () {

    return gulp.src(paths.javaScripts)

        .pipe(reload({stream: true}));

});

//PHP-script reload Task
gulp.task('phpSkripts', function () {

    return gulp.src(paths.phpSkripts)

        .pipe(reload({stream: true}));

});

// BrowserSync starting Task with php
gulp.task('browserSync', function () {
    let result = connectPHP.server({base:'./',keepalive:true}, function () {
        browserSync({
            proxy: '127.0.0.1:8000',
            port: '8080',
        });
    });
});

// TypeScript compile Task
let tsProject;
gulp.task("typeScript", function () {
    let ts = require("gulp-typescript");
    let sourcemaps = require('gulp-sourcemaps');

    if (!tsProject) {
        tsProject = ts.createProject("tsconfig.json");
    }

    let reporter = ts.reporter.fullReporter();
    let tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject(reporter));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("Resources/Scripts/JavaScript"));
});


// initiate watching
gulp.task('watcher', function () {
    createWatcher(Object.values(paths), ['html', 'css', 'typeScript', 'javaScripts', 'phpSkripts'])
});

function createWatcher(paths, tasks) {
    paths.forEach(function (item, index) {
        gulp.watch(item, gulp.series(tasks[index]))
    })
}

//init all to default
gulp.task('default', gulp.parallel('watcher', 'browserSync'));