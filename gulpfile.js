'use strict';

/* jshint node: true */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var path = require('path');
var express = require('express');

var EXPRESS_PORT = 3000;
var LIVERELOAD_PORT = 35729;

var pathTo = {
  expressRoot: './client',
  scriptEntry: './client/app.js',
  stylesEntry: './client/styles/app.scss',
  build: './client/build',
  watch: [
    './client/**/*.scss',
    './client/*.js',
    './client/common/**/*.js',
    './client/components/**/*.js',
    './client/talks/**/*.js',
    './client/events/**/*.js'
  ],
  watchBuild: [
    './client/build/*.js',
    './client/build/*.css',
    './client/**/*.html'
  ]
};

gulp.task('clean', function() {
  gulp.src(pathTo.build, { read: false }).pipe(clean({ force: true }));
});

gulp.task('styles', function () {
  gulp.src(pathTo.stylesEntry)
    .pipe(sass())
    .pipe(gulp.dest(pathTo.build));
});

gulp.task('develop', ['clean', 'styles'], function() {
  gulp.src(pathTo.scriptEntry)
    .pipe(browserify({ insertGlobals: false }))
    .pipe(gulp.dest(pathTo.build));
});

gulp.task('default', ['develop'], function() {
  startExpress();
  startLivereload();
  gulp.watch(pathTo.watch, ['develop']);
  gulp.watch(pathTo.watchBuild, notifyLivereload);
});

/** Development Utility Methods **/

function startExpress() {
  var app = express();

  app.use(require('connect-livereload')());
  app.use(express.static(pathTo.expressRoot));
  app.listen(EXPRESS_PORT);
}

// Reference to the tinylr object for file change notifications
var lr;
function startLivereload() {
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

// Notifies livereload of changes detected by watch
function notifyLivereload(event) {
  // `gulp.watch()` events provide an absolute path
  // so we'll make it relative to the server root
  var fileName = path.relative(pathTo.expressRoot, event.path);
  lr.changed({ body: { files: [fileName] } });
}

