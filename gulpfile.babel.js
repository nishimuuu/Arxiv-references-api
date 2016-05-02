
// load plugin
// gulp
const gulp         = require('gulp');

// other useful plugins
const cache        = require('gulp-cached');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const watch        = require('gulp-watch');

// webserver
const webserver    = require('gulp-webserver');
const livereload   = require('gulp-livereload');

const yaml = require('js-yaml');
const fs = require('fs');

// Task describe
const errorMsg = 'Error <%= error.message %>';
const path = yaml.safeLoad(fs.readFileSync('gulp.yml','utf8'));
const webpack = require('gulp-webpack');
const webpackConfig = require(path.webpack.src)

// Task of sass/css
gulp.task('webpack', () => {
  gulp.src(path.webpack.js.src)
    .pipe(webpack(webpackConfig))
    .pipe(livereload());
});

gulp.task('webserver', () => {
  gulp.src(path.web.url)
    .pipe(webserver({
      port      : path.web.port,
      livereload: true,
    }));
});

// watch setting
gulp.task('watch', () => {
  gulp.watch([path.webpack.js.src], () => {
    watch([path.webpack.js.src], () => {
      gulp.start('webpack');
    });
  });
});

// Run
gulp.task(
    'default',
    ['webserver', 'watch', 'webpack']
    )
