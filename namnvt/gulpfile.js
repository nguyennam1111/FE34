
  var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');

gulp.task('sass', function(cb){
    gulp.src('scss/_header.scss')
      .pipe(sass()) // Using gulp-sass
      .pipe(gulp.dest('css'));
      cb();
      });
  