'use strict';

/* jshint node: true */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var harp = require('harp');

var pathTo = {
  entry: './client/app.js',
  build: './client/build',
  styles: './client/*.scss',
  watch: [
    './client/*.scss',
    './client/*.js',
    './client/common/**/*.js',
    './client/components/**.js',
    './client/talks/**/*.js'
  ],
  watchBuild: [
    './client/build/app.js',
    './client/build/*.css',
    './client/**/*.html'
  ]
};

gulp.task('clean', function() {
  gulp.src(pathTo.build, { read: false }).pipe(clean({ force: true }));
});

gulp.task('styles', function () {
  return gulp.src(pathTo.styles)
    .pipe(sass())
    .pipe(gulp.dest(pathTo.build));
});

gulp.task('develop', ['clean', 'styles'], function() {
  gulp.src(pathTo.entry)
    .pipe(browserify({ insertGlobals: false }))
    .pipe(gulp.dest(pathTo.build));
});

gulp.task('server', function() {
  harp.server(__dirname + './client', { port: 5000 });
});

gulp.task('default', ['develop'], function() {
  gulp.watch(pathTo.watch, ['develop']);

  var server = livereload();
  gulp.watch(pathTo.watchBuild).on('change', function(file) {
    server.changed(file.path);
  });
});
