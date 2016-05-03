// load plugin 
//
// gulp
var gulp         = require('gulp');

//file lint
var htmlhint     = require('gulp-htmlhint');
var csslint      = require('gulp-csslint');
var jshint       = require('gulp-jshint');

//for scss/sass/css
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

//for jade
var jade         = require('gulp-jade');

//for coffee
var coffee       = require('gulp-coffee');

//for javascript
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');

//other useful plugins
var cache        = require('gulp-cached');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var watch        = require('gulp-watch');

//webserver
var webserver    = require('gulp-webserver');
var livereload   = require('gulp-livereload');

// api documents using api blueprint
var aglio = require('gulp-aglio');

// api-mock
var apiMock = require('api-mock');

var shell = require('gulp-shell');

var yaml = require('js-yaml');
var fs = require('fs');

var browserSync = require('browser-sync');

// Task describe 
var errorMsg = "Error <%= error.message %>"

path = yaml.safeLoad(fs.readFileSync('config.yaml','utf8'))

// Task of sass/css
gulp.task('sass', function() {
  gulp.src(path.sass.src)
    .pipe(cache(path.sass.src))
    .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.sass.dst))
});

// Task of coffee/js
gulp.task('js', function(){
  //compile coffee to js
  gulp.src(path.coffee.global.src)
    .pipe(cache(path.coffee.global.src))
    .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
    .pipe(coffee())
    .pipe(gulp.dest(path.coffee.global.dst))
    .pipe(livereload());
  
  gulp.src(path.coffee.local.src)
    .pipe(cache(path.coffee.local.src))
    .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
    .pipe(coffee())
    .pipe(gulp.dest(path.coffee.local.dst));

  //minify js
  gulp.src(path.js.global.src)
    .pipe(concat('global.js'))  
    .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
     .pipe(uglify())
     .pipe(gulp.dest(path.js.global.dst));

  gulp.src(path.js.local.src)
    .pipe(concat('local.js'))  
    .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
     .pipe(uglify())
     .pipe(gulp.dest(path.js.local.dst));

  //compile jade to html
  gulp.src(path.jade.src)
    .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
    .pipe(jade({
      pretty:true
      }))
    .pipe(gulp.dest(path.jade.dst));
});


//To launch webserver::port::24666
gulp.task('webserver', function(){
  gulp.src(path.web.url)
  .pipe(webserver({
    livereload: true,
    port: path.web.port 
    }));
});

//Validate html, css, js
gulp.task('validate', function(){
   gulp.src(path.html.src)
    .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
   .pipe(htmlhint())
   .pipe(htmlhint.reporter())
   .pipe(htmlhint.failReporter());

   gulp.src(path.js.src)
    .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
  .pipe(jshint())
  .pipe(jshint.reporter('default'));

  gulp.src(path.css.src)
    .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
  .pipe(csslint())
  .pipe(csslint.reporter())
});

gulp.task('api:compile', function(){
  gulp.src(path.api.src)
  .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
  .pipe(aglio({template : 'default'}))
  .pipe(gulp.dest(path.api.dst));
});

gulp.task('api:runserver', function(){
  gulp.src(path.api.src)
  .pipe(plumber({
      errorHandler : notify.onError(errorMsg)
    }))
  .pipe(webserver({liveread: true, port: path.api.doc_port}));
});


gulp.task('api:livecoding', function(){
  var src = path.api.src
  gulp.src(src) 
  .pipe(watch(src))
  .pipe(plumber({errorHandler: notify.onError(errorMsg)}))
  .pipe(aglio({template: 'default'}))
  .pipe(gulp.dest(path.api.dst))
});

gulp.task('api:mock', shell.task([
  'api-mock ' + path.api.src + ' --port ' + path.api.mock_port
]));

gulp.task('app:run', shell.task([
  path.app.cmd
]));


////////////////////////////////////////
// watch setting
gulp.task('watch', function(){
  gulp.watch(path.js.src,function(e){
  watch(path.js.src,function(e){
    gulp.start('js');
    })
  });
  gulp.watch([path.sass.src],function(e){
    watch([path.sass.src],function(e){
      gulp.start('sass');
    });
  });
  gulp.watch([path.coffee.global.src,path.coffee.local.src,path.jade.src],function(e){
  watch([path.coffee.global.src, path.coffee.local.src,path.jade.src],function(e){
      gulp.start('js');
    });
  });

  gulp.watch([path.api.src],function(e){
  watch([path.api.src],function(e){
    gulp.start('api:compile');
    gulp.start('api:runserver');
    gulp.start('api:livecoding');
    });
  });

});


//Run
gulp.task('default', ['sass','js','webserver', 'watch','api:compile','api:runserver','api:livecoding', 'api:mock', 'app:run'])

gulp.task('mock', ['api:mock'])

gulp.task('app',['app:run'])
